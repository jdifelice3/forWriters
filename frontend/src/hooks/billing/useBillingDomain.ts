// src/hooks/billing/useBillingDomain.ts
import { BillingAPI, PaidTier, BillingCadence } from "../../api/billingApi";

export function useBillingDomain() {
  const startCheckout = async (
    tier: PaidTier,
    cadence: BillingCadence
  ) => {
    const { url } = await BillingAPI.checkout(tier, cadence);
    window.location.href = url;
  };

  const openPortal = async () => {
    const { url } = await BillingAPI.portal();
    window.location.href = url;
  };

  return {
    startCheckout,
    openPortal,
  };
}
