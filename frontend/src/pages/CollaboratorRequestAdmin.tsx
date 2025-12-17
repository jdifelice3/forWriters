import { useEffect, useState } from "react";
import { CollaboratorRequest } from "../types/domain-types";
import {
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import CollaboratorRequestList from "../components/member/CollaboratorRequestList";

const CollaboratorRequestAdmin = () => {
  const [requests, setRequests] = useState<CollaboratorRequest[]>([]);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadRequests = async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_HOST}/api/users/admin/requests`,
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
    // <Paper sx={{ maxWidth: 800, mx: "auto", mt: 4, p: 4 }}>
    <Paper
        //style={styles}  
        sx={{ 
            maxWidth: 900, 
            mx: "auto", 
            p: 4,
            marginLeft: "100px",
        }}
    >
      <Typography variant="h4" mb={3}>
        Manage Collaborator Requests
      </Typography>

      {loading && <CircularProgress />}

      {error && <Alert severity="error">{error}</Alert>}
      {msg && <Alert severity="success">{msg}</Alert>}

      {!loading && (
        <CollaboratorRequestList
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
export default CollaboratorRequestAdmin;