// src/hooks/billing/useBillingUI.ts
import { useBillingData } from "./useBillingData";

export function useBillingUI() {
  const { billing, loading } = useBillingData();

  const isFree = billing?.tier === "FREE";
  const isPro = billing?.tier === "PRO_GROUP";
  const isProfessional = billing?.tier === "PROFESSIONAL";

  return {
    loading,
    tier: billing?.tier,
    status: billing?.status,
    currentPeriodEnd: billing?.currentPeriodEnd
      ? new Date(billing.currentPeriodEnd)
      : null,

    isFree,
    isPro,
    isProfessional,
  };
}
