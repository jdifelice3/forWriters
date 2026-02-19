export type PaidTier = "PROFESSIONAL" | "STUDIO";
export type BillingCadence = "MONTH" | "YEAR";

export const TRIAL_DAYS_PRO_GROUP = 7;

export const tierFromPriceId = (priceId: string): "PROFESSIONAL" | "STUDIO" | null => {
  const pairs: Array<[string | undefined, "PROFESSIONAL" | "STUDIO"]> = [
    [process.env.STRIPE_PRICE_PRO_MONTHLY, "PROFESSIONAL"],
    [process.env.STRIPE_PRICE_PRO_ANNUAL, "PROFESSIONAL"],
    [process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY, "STUDIO"],
    [process.env.STRIPE_PRICE_PROFESSIONAL_ANNUAL, "STUDIO"],
  ];

  for (const [id, tier] of pairs) {
    if (id && id === priceId) return tier;
  }
  return null;
};

export const priceIdFor = (tier: PaidTier, cadence: BillingCadence): string => {
  const key =
    tier === "PROFESSIONAL"
      ? cadence === "MONTH"
        ? "STRIPE_PRICE_PRO_MONTHLY"
        : "STRIPE_PRICE_PRO_ANNUAL"
      : cadence === "MONTH"
        ? "STRIPE_PRICE_PROFESSIONAL_MONTHLY"
        : "STRIPE_PRICE_PROFESSIONAL_ANNUAL";

  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing env var ${key}`);
  }
  return value;
};
