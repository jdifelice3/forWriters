import { useEffect, useState } from "react";
import {
    Box,
  Typography,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import GroupJoinRequestList from '../components/group/GroupJoinRequestList';
import { useGroupContext } from "../context/GroupContextProvider";
import { useNavigate } from "react-router-dom";

interface JoinRequest {
  id: string;
  userName: string;
  userId: string;
  groupId: string;
  groupName: string;
}

export default function GroupJoinRequestAdmin() {
    const { activeGroup } = useGroupContext();
    const navigate = useNavigate();
    const [requests, setRequests] = useState<JoinRequest[]>([]);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

const loadRequests = async (groupId: string) => {
    setError(null);
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_HOST}/api/groups/${groupId}/join-requests`,
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
    if(!activeGroup) return;
    loadRequests(activeGroup.id);
  }, [activeGroup]);
    
    if (!activeGroup) {
        return (
        <Box display="flex" justifyContent="center" p={6}>
            <CircularProgress size={24} />
        </Box>
        );
    } 

    if(activeGroup.role !== "ADMIN"){
        navigate("/dashboard");
    }
  return (
    <Paper 
        sx={{ 
            maxWidth: 900, 
            mx: "auto", 
            p: 4,
            ml: "50px",
            mt: 3   
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
          groupId={activeGroup.id}
          requests={requests}
          onAction={(message) => {
            setMsg(message);
            loadRequests(activeGroup.id);
          }}
          onError={(e) => setError(e)}
        />
      )}
    </Paper>
  );
}
