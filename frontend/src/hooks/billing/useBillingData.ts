// src/hooks/billing/useBillingData.ts
import { useEffect, useState } from "react";
import { BillingAPI } from "../../api/billingApi";

type BillingMe = {
  tier: "FREE" | "PRO_GROUP" | "PROFESSIONAL";
  status: string;
  currentPeriodEnd: string | null;
};

export function useBillingData() {
  const [data, setData] = useState<BillingMe | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    BillingAPI.me()
      .then(setData)
      .finally(() => setLoading(false));
  }, []);

  return {
    billing: data,
    loading,
  };
}
