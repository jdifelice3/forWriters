import { Card, CardContent, Typography, List, ListItemButton, ListItemText } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DashboardUpcomingItem } from "../../types/DashboardTypes";

function formatWhen(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(); // you can replace with date-fns later
}

export default function UpcomingCard({ items }: { items: DashboardUpcomingItem[] }) {
  const navigate = useNavigate();

  return (
    <Card className="dashboardSubPanel">
      <CardContent className="dashboardSubPanelColors">
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1}}>
          📅Coming up
        </Typography>

        {items.length === 0 ? (
          <Typography sx={{ml:3}} color="text.secondary">Nothing scheduled yet.</Typography>
        ) : (
          <List dense sx={{ml:3}}>
            {items.slice(0, 3).map((it) => (
              <ListItemButton key={it.id} onClick={() => navigate(it.href)} sx={{ px: 0 }}>
                <ListItemText
                  primary={it.title}
                  secondary={`${formatWhen(it.occursAt)}${it.subtitle ? ` • ${it.subtitle}` : ""}`}
                  primaryTypographyProps={{ fontWeight: 600 }}
                />
              </ListItemButton>
            ))}
          </List>
        )}
      </CardContent>
    </Card>
  );
}