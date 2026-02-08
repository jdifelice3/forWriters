// src/api/billingApi.ts
import { apiFetch } from "./client";

export type BillingCadence = "MONTH" | "YEAR";
export type PaidTier = "PRO_GROUP" | "PROFESSIONAL";

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
      tier: "FREE" | "PRO_GROUP" | "PROFESSIONAL";
      status: string;
      currentPeriodEnd: string | null;
    }>("/billing/me", {
      method: "GET",
      credentials: "include",
    });
  },
};
