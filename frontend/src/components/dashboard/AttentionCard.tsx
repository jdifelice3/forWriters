import { Card, CardContent, Grid, Typography, List, ListItem, ListItemText, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DashboardAttentionItem } from "../../types/DashboardTypes";

export default function AttentionCard({ items }: { items: DashboardAttentionItem[] }) {
  const navigate = useNavigate();
    console.log('Attention Items', items)
  return (
    <Card className="dashboardSubPanel">
      <CardContent className="dashboardSubPanelColors">
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          ⚠️Needs your attention
        </Typography>

        {items.length === 0 ? (
          <Typography sx={{ml:3}} color="text.secondary">You’re caught up.</Typography>
        ) : (
          <Grid container sx={{ml:3}}>
            {items.slice(0, 5).map((it) => (
            <>
                <Box key={it.id} >
              <Grid size={6}>
                    <Typography>
                        {it.title}
                    </Typography>
                </Grid>
                <Grid size={6}>
                    <Button size="small" onClick={() => navigate(it.href)}>
                        {it.ctaLabel}
                    </Button>
                </Grid>
                </Box>
              </>
            ))}
          </Grid>
        )}

        {items.length > 0 && (
          <Box sx={{ mt: 1, ml:3 }}>
            <Button size="small" onClick={() => navigate("/joinadminpage")}>
              View all
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}