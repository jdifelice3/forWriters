import { useState } from "react";
import { Group } from "../../../backend/src/domain-types";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Paper,
} from "@mui/material";
import GroupSearchBox from "../components/GroupSearchBox";

export default function GroupSearch() {
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!selectedGroup) return;

    setError(null);
    setConfirmation(null);
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/groups/${selectedGroup.id}/join`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to request to join");

      setConfirmation(
        `Your request to join "${selectedGroup.name}" has been sent. An admin must approve it.`
      );
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 4 }}>
      <Typography variant="h4" mb={2}>
        Find a Writing Group
      </Typography>

      <GroupSearchBox onSelectGroup={setSelectedGroup} />

      {selectedGroup && (
        <Box mt={3}>
          <Typography>
            Selected group: <strong>{selectedGroup.name}</strong>
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading || !selectedGroup}
            onClick={handleJoin}
          >
            {loading ? <CircularProgress size={22} /> : "Request to Join"}
          </Button>
        </Box>
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      {confirmation && (
        <Alert severity="success" sx={{ mt: 3 }}>
          {confirmation}
        </Alert>
      )}
    </Paper>
  );
}
