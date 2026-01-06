import { Card, CardContent, Typography, List, ListItem, ListItemText, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DashboardAttentionItem } from "../../types/DashboardTypes";

export default function AttentionCard({ items }: { items: DashboardAttentionItem[] }) {
  const navigate = useNavigate();

  return (
    <Card className="dashboardSubPanel">
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          ⚠️Needs your attention
        </Typography>

        {items.length === 0 ? (
          <Typography sx={{ml:3}} color="text.secondary">You’re caught up.</Typography>
        ) : (
          <List dense sx={{ml:3}}>
            {items.slice(0, 5).map((it) => (
              <ListItem
                key={it.id}
                disableGutters
                secondaryAction={
                  <Button size="small" onClick={() => navigate(it.href)}>
                    {it.ctaLabel}
                  </Button>
                }
              >
                <ListItemText
                  primary={it.title}
                  secondary={it.description}
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItem>
            ))}
          </List>
        )}

        {items.length > 0 && (
          <Box sx={{ mt: 1, ml:3 }}>
            <Button size="small" onClick={() => navigate("/notifications")}>
              View all
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}