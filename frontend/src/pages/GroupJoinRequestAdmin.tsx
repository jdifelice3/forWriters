// src/pages/GroupJoinRequestsAdminPage.tsx
import { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import GroupJoinRequestList from "../components/GroupJoinRequestList";

interface JoinRequest {
  id: string;
  userName: string;
  userId: string;
  groupId: string;
  groupName: string;
}

export default function GroupJoinRequestAdmin() {
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadRequests = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/groups/admin/requests`,
        { credentials: "include" }
      );
      const data = await res.json();
      setRequests(data || []);
    } catch {
      setError("Failed to load join requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <Paper 
        sx={{ 
            maxWidth: 900, 
            mx: "auto", 
            p: 4,
            marginLeft: "100px",
        }}
    >
      <Typography variant="h4" mb={3}>
        Manage Join Requests
      </Typography>

      {loading && <CircularProgress />}

      {error && <Alert severity="error">{error}</Alert>}
      {msg && <Alert severity="success">{msg}</Alert>}

      {!loading && (
        <GroupJoinRequestList
          requests={requests}
          onAction={(message) => {
            setMsg(message);
            loadRequests();
          }}
          onError={(e) => setError(e)}
        />
      )}
    </Paper>
  );
}
