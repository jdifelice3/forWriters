import { Router } from "express";
import express from "express";
import Session from "supertokens-node/recipe/session";
import { SessionRequest } from "supertokens-node/framework/express";
import prisma from "../../database/prisma";
import { stripe } from "./stripe";
import { BillingCadence, PaidTier, TRIAL_DAYS_PRO_GROUP, priceIdFor, tierFromPriceId } from "./billing.constants";
import { User } from "@prisma/client";

/**
 * Suggested mounting:
 *   app.use("/api/billing", billingRouter);
 *
 * IMPORTANT for webhooks:
 *   This router includes a raw-body webhook route. Mount it BEFORE any global
 *   express.json() middleware OR ensure your app does NOT apply express.json()
 *   to the webhook path.
 */
type CheckoutSuccess = { url: string };
type CheckoutError = { error: string };

type CheckoutResponse = CheckoutSuccess | CheckoutError;

const router = Router();

type CheckoutBody = {
  tier: PaidTier;
  cadence: BillingCadence;
};

async function getAppUserBySession(req: any, res: any) {
  const session = await Session.getSession(req, res);
  const authId = session.getUserId();
  const user = await prisma.user.findUnique({
    where: { superTokensId: authId },
    include: { subscription: true },
  });
  if (!user) {
    throw Object.assign(new Error("User not found"), { statusCode: 401 });
  }
  return user;
}

async function ensureStripeCustomer(user: { id: string; email: string; subscription?: any }) {
  if (user.subscription?.stripeCustomerId) {
    return user.subscription.stripeCustomerId as string;
  }

  const customer = await stripe.customers.create({
    email: user.email,
    metadata: { appUserId: user.id },
  });

  await prisma.subscription.upsert({
    where: { userId: user.id },
    update: { stripeCustomerId: customer.id },
    create: { userId: user.id, stripeCustomerId: customer.id, tier: "FREE", status: "inactive" },
  });

  return customer.id;
}

// POST /api/billing/checkout
router.post<
    {},                 // res body
    CheckoutResponse,    // response JSON
    CheckoutBody        // request body
    >
("/checkout", async (req: SessionRequest, res) => {
  const { tier, cadence } = req.body as CheckoutBody;
  if (!tier || !cadence) {
    return res.status(400).json({ error: "Missing tier or cadence" });
  }
 
    const appSession = await Session.getSession(req, res);
    const authId = appSession.getUserId();
    const appUser: User | null = await prisma.user.findUnique({where: { superTokensId: authId,},}); 

  const user = await getAppUserBySession(req, res);
  const customerId = await ensureStripeCustomer(user);

  const priceId = priceIdFor(tier, cadence);

  const trialEligible = tier === "PROFESSIONAL" && !user.proTrialUsedAt;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer: customerId,
    client_reference_id: user.id,
    line_items: [{ price: priceId, quantity: 1 }],
    subscription_data: trialEligible
      ? {
          trial_period_days: TRIAL_DAYS_PRO_GROUP,
          metadata: { trialApplied: "true" },
        }
      : undefined,
    // You can adjust these URLs to your React routes
    success_url: `${process.env.API_DOMAIN}/billing/success`,
    cancel_url: `${process.env.API_DOMAIN}/billing`,
    allow_promotion_codes: true,
  });

  return res.json({ url: session.url ?? "" });
});

// POST /api/billing/portal
router.post("/portal", async (req: SessionRequest, res) => {
    const appSession = await Session.getSession(req, res);
    const authId = appSession.getUserId();
    const appUser: User | null = await prisma.user.findUnique({where: { superTokensId: authId,},}); 

  const user = await getAppUserBySession(req, res);
  const customerId = await ensureStripeCustomer(user);

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.API_DOMAIN}/billing`,
  });

  res.json({ url: portalSession.url });
});

// POST /api/billing/webhook (Stripe)
router.post(
  "/webhook",
  // raw body required for Stripe signature verification
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    if (!sig) {
      return res.status(400).send("Missing Stripe signature");
    }
    const appSession = await Session.getSession(req, res);
    const authId = appSession.getUserId();
    const appUser: User | null = await prisma.user.findUnique({where: { superTokensId: authId,},}); 

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET as string
      );
    } catch (err: any) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const session = event.data.object as any;
          const appUserId = session.client_reference_id as string | undefined;
          const customerId = session.customer as string | undefined;
          const subscriptionId = session.subscription as string | undefined;

          if (!appUserId || !customerId || !subscriptionId) break;

          const subStripe = await stripe.subscriptions.retrieve(subscriptionId, {
            expand: ["items.data.price"],
          });
          if (!("current_period_end" in subStripe)) {
            await prisma.subscription.update({
                    where: {
                        userId: appUser?.id, 
                        stripeSubscriptionId: subscriptionId 
                    },
                    data: {
                    status: "canceled",
                    currentPeriodEnd: null,
                    tier: "FREE",
                    },
                });
            return;
           }

        const periodEndSeconds = Number(subStripe.current_period_end);

          const priceId = (subStripe.items.data[0]?.price as any)?.id as string | undefined;
          const tier = priceId ? tierFromPriceId(priceId) : null;

          await prisma.subscription.upsert({
            where: { userId: appUserId },
            update: {
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
              tier: (tier ?? "FREE") as any,
              status: subStripe.status,
              currentPeriodEnd: subStripe.current_period_end ? new Date(periodEndSeconds * 1000) : null,
            },
            create: {
              userId: appUserId,
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
              tier: (tier ?? "FREE") as any,
              status: subStripe.status,
              currentPeriodEnd: subStripe.current_period_end ? new Date(periodEndSeconds * 1000) : null,
            },
          });

          // One-time trial lock
          const trialApplied = subStripe.metadata?.trialApplied === "true";
          if (tier === "PROFESSIONAL" && trialApplied) {
            await prisma.user.update({
              where: { id: appUserId },
              data: { proTrialUsedAt: new Date() },
            });
          }

          break;
        }

        case "customer.subscription.updated":
        case "customer.subscription.deleted": {
          const sub = event.data.object as any;
          const customerId = sub.customer as string;

          // Determine tier from the first item price id
          const priceId = sub.items?.data?.[0]?.price?.id as string | undefined;
          const tier = priceId ? tierFromPriceId(priceId) : null;

          const isDeleted = event.type === "customer.subscription.deleted";

          await prisma.subscription.updateMany({
            where: { stripeCustomerId: customerId },
            data: {
              stripeSubscriptionId: isDeleted ? null : (sub.id as string),
              tier: (isDeleted ? "FREE" : (tier ?? "FREE")) as any,
              status: sub.status,
              currentPeriodEnd: sub.current_period_end ? new Date(sub.current_period_end * 1000) : null,
            },
          });

          break;
        }

        default:
          break;
      }

      return res.json({ received: true });
    } catch (err: any) {
      // Log & return 200 to avoid Stripe retries if desired.
      console.error("Stripe webhook handler error", err);
      return res.status(500).json({ error: "Webhook handler failed" });
    }
  }
);

export default router;
