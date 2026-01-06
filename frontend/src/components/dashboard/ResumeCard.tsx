import { Card, CardContent, Typography, Stack, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { DashboardResumeItem } from "../../types/DashboardTypes";

export default function ResumeCard({ items }: { items: DashboardResumeItem[] }) {
  const navigate = useNavigate();

  return (
    <Card className="dashboardSubPanel">
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
          📅Continue
        </Typography>

        {items.length === 0 ? (
          <Typography color="text.secondary" sx={{ml:3}}>
            No recent work yet. Upload a manuscript or join a reading to get started.
          </Typography>
        ) : (
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", ml:3 }}>
            {items.slice(0, 3).map((it) => (
              <Button key={it.id} variant="outlined" onClick={() => navigate(it.href)} sx={{ mb: 1 }}>
                {it.title}
              </Button>
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}