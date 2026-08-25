import { Box, Button, Chip, CircularProgress, Typography } from "@mui/material";
import { useBillingDomain } from "../hooks/billing/useBillingDomain";
import { useBillingUI } from "../hooks/billing/useBillingUI";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";
import "../assets/css/workspace-pages.css";

export default function Billing() {
  const { startCheckout, openPortal } = useBillingDomain();
  const { tier, loading } = useBillingUI();

  if (loading) return <Box className="workspace-loading"><CircularProgress size={24} /><Typography>Loading billing…</Typography></Box>;

  return (
    <Box className="workspace-page billing-workspace">
      <Box className="workspace-page-header">
        <Box>
          <Typography className="workspace-eyebrow">Account</Typography>
          <Typography component="h1">Billing</Typography>
          <Typography className="workspace-page-lede">Manage the plan that supports your writing groups.</Typography>
        </Box>
      </Box>
      <Box className="workspace-surface billing-plan-card">
        <Box className="billing-plan-heading">
          <Box>
            <Typography component="h2">Pro Group</Typography>
            <Typography className="billing-price"><strong>$9</strong> / month</Typography>
          </Box>
          <Chip icon={<CreditCardRoundedIcon />} label={tier === "PROFESSIONAL" ? "Current plan" : "Available plan"} />
        </Box>
        <Typography className="billing-plan-copy">
          A complete workspace for manuscript submissions, managed readings, reviewer assignments, and feedback.
        </Typography>
        <Box className="billing-plan-action">
          {tier === "PROFESSIONAL" ? (
            <Button variant="outlined" onClick={openPortal}>Manage billing</Button>
          ) : (
            <Button
              variant="contained"
              onClick={() => startCheckout("PROFESSIONAL", "MONTH")}
            >
              Upgrade
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
}
