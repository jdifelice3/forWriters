import { Button, Card, CardContent, Typography, Stack } from "@mui/material";
import { useBillingDomain } from "../hooks/billing/useBillingDomain";
import { useBillingUI } from "../hooks/billing/useBillingUI";

export default function Billing() {
  const { startCheckout, openPortal } = useBillingDomain();
  const { tier, loading } = useBillingUI();

  if (loading) return <div>Loading…</div>;

  return (
    <Stack spacing={3}>
      <Typography variant="h4">Billing</Typography>

      <Card>
        <CardContent>
          <Typography variant="h6">Pro Group</Typography>
          <Typography>$9 / month</Typography>

          {tier === "PRO_GROUP" ? (
            <Button onClick={openPortal}>Manage billing</Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => startCheckout("PRO_GROUP", "MONTH")}
            >
              Upgrade
            </Button>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
}
