export type PaidTier = "PRO_GROUP" | "PROFESSIONAL";
export type BillingCadence = "MONTH" | "YEAR";

export const TRIAL_DAYS_PRO_GROUP = 7;

export const tierFromPriceId = (priceId: string): "PRO_GROUP" | "PROFESSIONAL" | null => {
  const pairs: Array<[string | undefined, "PRO_GROUP" | "PROFESSIONAL"]> = [
    [process.env.STRIPE_PRICE_PRO_MONTHLY, "PRO_GROUP"],
    [process.env.STRIPE_PRICE_PRO_ANNUAL, "PRO_GROUP"],
    [process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY, "PROFESSIONAL"],
    [process.env.STRIPE_PRICE_PROFESSIONAL_ANNUAL, "PROFESSIONAL"],
  ];

  for (const [id, tier] of pairs) {
    if (id && id === priceId) return tier;
  }
  return null;
};

export const priceIdFor = (tier: PaidTier, cadence: BillingCadence): string => {
  const key =
    tier === "PRO_GROUP"
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
