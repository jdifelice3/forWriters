// src/api/billingApi.ts
import { apiFetch } from "./client";

export type BillingCadence = "MONTH" | "YEAR";
export type PaidTier = "PROFESSIONAL" | "STUDIO";

export const BillingAPI = {
  checkout(tier: PaidTier, cadence: BillingCadence) {
    return apiFetch<{ url: string }>("/billing/checkout", {
      method: "POST",
      body: JSON.stringify({ tier, cadence }),
      credentials: "include",
    });
  },

  portal() {
    return apiFetch<{ url: string }>("/billing/portal", {
      method: "POST",
      credentials: "include",
    });
  },

  me() {
    return apiFetch<{
      tier: "FREE" | "PROFESSIONAL" | "STUDIO";
      status: string;
      currentPeriodEnd: string | null;
    }>("/billing/me", {
      method: "GET",
      credentials: "include",
    });
  },
};
