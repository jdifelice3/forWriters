import { useNavigate } from "react-router-dom";
import { Group, Reading } from "../types/domain-types";
import {
  Box,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { ReadingCalendar } from "../components/reading/ReadingCalendar";
import { useUserContext } from "../context/UserContext";
import { useGroupDetails } from "../hooks/useGroup";
import { ReadingCommands, FormInput } from "../types/ReadingTypes";

const styles = {
    marginLeft: '75px' // or a responsive value
};

const ReadingSignup = () => {
    const navigate = useNavigate();

    let isAdmin = false;
    const { user } = useUserContext();
    const { data : group, isLoading, mutate} = useGroupDetails<Group>();
    
    const foundUser = group?.groupUser.find(u => u.userId === user.id && u.role === "ADMIN" );
    if(foundUser) isAdmin = true;
    
    if (!group) {
        return (
        <Box display="flex" justifyContent="center" p={6} >
            <CircularProgress />
        </Box>
        );
    }

    const handleAddReading = async (values: FormInput ) => {
        
    };
    
    const handleSignup = async (event: React.MouseEvent<HTMLButtonElement>, readingId: string) => {
        alert("Signup button clicked");
        navigate("/readings");
    };

    const handleWithdraw = async(event: React.MouseEvent<HTMLButtonElement>, readingId: string) => {

    }

    const handleEdit = (reading: Reading) => {

    };
      
    const handleDelete = async (reading: Reading) => {
    
    };
    
    const handleReview = async(event: React.MouseEvent<HTMLButtonElement>, readingId: string) => {

    }

    const handleFeedback = async(event: React.MouseEvent<HTMLButtonElement>, readingId: string) => {

    }

    const readingCommands: ReadingCommands = {
        edit: handleEdit,
        save: handleAddReading,
        delete: handleDelete,
        signup: handleSignup,
        withdraw: handleWithdraw,
        review: handleReview,
        feedback: handleFeedback
    }

  return (
    <Box style={styles} sx={{ maxWidth: 1000, mx: "auto", p: 4}}>
      <Typography variant="h4" mb={3} textAlign="center">
        {group.name}
      </Typography>
      <Typography variant="h5" mb={3} textAlign="center">
        {isAdmin ? ("Create Readings") : ("Sign Up For a Reading")} 
      </Typography>

      <ReadingCalendar readings={group.reading} isAdmin={isAdmin} commands={readingCommands}/>

    </Box>
  );
}

export default ReadingSignup;