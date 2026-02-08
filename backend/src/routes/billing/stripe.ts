import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  // Match the API version your Stripe account is set to.
  // If you later pin a different version in the dashboard, update here too.
  apiVersion: "2026-01-28.clover" //"2023-10-16",
});
