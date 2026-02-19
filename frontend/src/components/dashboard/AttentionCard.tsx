import { Card, CardContent, Grid, Stack, Typography, List, ListItem, ListItemText, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGroupContext } from "../../context/GroupContextProvider";
import { DashboardAttentionItem } from "../../types/DashboardTypes";

export default function AttentionCard({ items }: { items: DashboardAttentionItem[] }) {
  const navigate = useNavigate();
  const { activeGroup } = useGroupContext();
    
  return (
    <Card className="dashboardSubPanel">
      <CardContent className="dashboardSubPanelColors">
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          ⚠️Needs your attention
        </Typography>

        {items.length === 0 ? (
          <Typography sx={{ml:3}} color="text.secondary">You’re caught up.</Typography>
        ) : (
            <>
            {items.slice(0, 5).map((it) => (
            
                <Box key={it.id} >
                    <Typography>
                        {it.title}
                    </Typography>
                
                    <Button size="small" onClick={() => navigate(it.href)}>
                        {it.ctaLabel}
                    </Button>
                </Box>
              
            ))}
            </>
        )}

        {items.length > 0 && (activeGroup && activeGroup.role === "ADMIN") && (
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