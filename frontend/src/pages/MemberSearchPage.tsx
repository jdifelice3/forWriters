import { useState } from "react";
import { UserSearch } from "../types/domain-types";
import {
  Box,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Card,
  CardContent
} from "@mui/material";
import MemberSearchBox from "../components/member/MemberSearchBox";
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const styles = {
    marginLeft: '75px' // or a responsive value
};

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
        `${import.meta.env.VITE_API_HOST}/api/users/${selectedMember.id}/connect`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to connect");

      setConfirmation(
        `Your request to connect with "${selectedMember.fullName}" has been sent. If accepted, you will connect.`
      );
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Unknown error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
        style={styles}  
        sx={{ 
        maxWidth: 900, 
        mx: "auto", 
        p: 4,
        marginLeft: "100px",
        }}>
        <Typography variant="h4" mb={3}>
            <CheckBoxIcon 
                sx={{ 
                    fontSize: '40px',
                    verticalAlign: "bottom", 
                }}
                />&nbsp;
            Search Members
        </Typography>
        <Typography variant="h6" sx={{}}>
            Find a Collaborator
        </Typography>

      <MemberSearchBox onSelectMember={setSelectedMember} />
        
      {selectedMember && (
        <Box mt={3}>
          <Typography sx={{mb: 2 }}>
            Selected memeber: <strong>{selectedMember.fullName}</strong>
          </Typography>
          <Card>
            <CardContent>
                <Typography sx={{fontWeight:"bold"}}>
                    Bio
                </Typography>
                {selectedMember.bio}
            </CardContent>
          </Card>
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            disabled={loading || !selectedMember}
            onClick={handleJoin}
          >
            {loading ? <CircularProgress size={22} /> : "Request to Connect"}
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
  );
}
export default MemberSearchPage;