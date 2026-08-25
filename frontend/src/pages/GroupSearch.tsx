import { useState } from "react";
import { Group } from "../types/domain-types";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Chip
} from "@mui/material";
import GroupSearchBox from "../components/group/GroupSearchBox";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import GroupAddRoundedIcon from "@mui/icons-material/GroupAddRounded";
import GroupDescription from "../components/group/GroupDescription";
import "../assets/css/workspace-pages.css";

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
        `${import.meta.env.VITE_API_HOST}/api/groups/join/${selectedGroup.id}`,
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
    <Box className="workspace-page directory-workspace">
      <Box className="workspace-page-header">
        <Box>
          <Typography className="workspace-eyebrow">Community directory</Typography>
          <Typography component="h1">Join a group</Typography>
          <Typography className="workspace-page-lede">
            Find a writing community, learn how it works, and ask its administrators
            for membership.
          </Typography>
        </Box>
      </Box>

      <Box className="workspace-surface directory-search-panel">
        <Box className="workspace-section-heading">
          <Box>
            <Typography component="h2">Find a writing group</Typography>
            <Typography>Start typing a group name to search the directory.</Typography>
          </Box>
          <SearchRoundedIcon />
        </Box>
        <GroupSearchBox onSelectGroup={setSelectedGroup} />
        
      {selectedGroup && (
        <Box className="directory-result-card">
          <Box className="directory-result-heading">
            <Box>
              <Typography component="h3">{selectedGroup.name}</Typography>
              <Chip size="small" label="Writing group" />
            </Box>
            <GroupAddRoundedIcon />
          </Box>
          <Box className="directory-result-description">
            <Typography className="workspace-eyebrow">About this group</Typography>
            <GroupDescription groupId={selectedGroup.id}/>
          </Box>
          <Button variant="contained" disabled={loading} onClick={handleJoin}>
            {loading ? <CircularProgress size={22} color="inherit" /> : "Request to join"}
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
      </Box>
    </Box>
  );
}
