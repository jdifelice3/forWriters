import { useState } from "react";
import { UserSearch } from "../types/UserTypes";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Avatar
} from "@mui/material";
import MemberSearchBox from "../components/member/MemberSearchBox";
import PersonSearchRoundedIcon from "@mui/icons-material/PersonSearchRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import "../assets/css/workspace-pages.css";

const MemberSearchPage = () => {
  const [selectedMember, setSelectedMember] = useState<UserSearch | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (!selectedMember) return;

    setError(null);
    setConfirmation(null);
    setLoading(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_HOST}/api/users/${selectedMember.userId}/connect`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to connect");

      setConfirmation(
        `Your request to connect with "${selectedMember.fullname}" has been sent. If accepted, you will connect.`
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
          <Typography className="workspace-eyebrow">Writer network</Typography>
          <Typography component="h1">Find collaborators</Typography>
          <Typography className="workspace-page-lede">
            Search for another writer and send a request to connect.
          </Typography>
        </Box>
      </Box>

      <Box className="workspace-surface directory-search-panel">
        <Box className="workspace-section-heading">
          <Box>
            <Typography component="h2">Search members</Typography>
            <Typography>Start typing a writer&apos;s name.</Typography>
          </Box>
          <PersonSearchRoundedIcon />
        </Box>
        <MemberSearchBox onSelectMember={setSelectedMember} groupId={undefined}/>
        
      {selectedMember && (
        <Box className="directory-result-card member-directory-result">
          <Box className="directory-member-heading">
            <Avatar>{selectedMember.fullname?.slice(0, 1).toUpperCase()}</Avatar>
            <Box>
              <Typography component="h3">{selectedMember.fullname}</Typography>
              <Typography>Potential collaborator</Typography>
            </Box>
            <PersonAddAltRoundedIcon />
          </Box>
          <Box className="directory-result-description">
            <Typography className="workspace-eyebrow">Bio</Typography>
            <Typography>
              {!selectedMember.bio ? "No bio has been added yet." : selectedMember.bio}
            </Typography>
          </Box>
          <Button variant="contained" disabled={loading} onClick={handleJoin}>
            {loading ? <CircularProgress size={22} color="inherit" /> : "Request to connect"}
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
export default MemberSearchPage;
