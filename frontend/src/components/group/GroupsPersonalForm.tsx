import { useState } from "react";
import { Group } from "../../types/domain-types";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import {
    Reading
} from "../../types/domain-types";
import GroupIcon from '@mui/icons-material/Group';
import Grid from "@mui/material/Grid";
import ReadingList from "../reading/ReadingList";

import { ReadingCalendar } from "../reading/ReadingCalendar";
import { useUserContext } from "../../context/UserContext";
import { ReadingCommands } from "../../types/ReadingTypes";

type FormInput = {
    name: string,
    readingDate: Date,
    readingStartTime: string,
    readingEndTime: string,
    submissionDeadline: Date,
    description: string,
    schedule: string
}

const handleEdit =(reading: Reading) => {
}
const handleAddReading = async(values: FormInput) => {
}
const handleDelete = async(reading: Reading) => {
}
const handleSignup = async(event: React.MouseEvent<HTMLButtonElement>, readingId: string) => {
}
const handleWithdraw = async(event: React.MouseEvent<HTMLButtonElement>, readingId: string) => {
}

const handleReview = async(event: React.MouseEvent<HTMLButtonElement>, readingId: string) => {
}

const handleFeedback = async(event: React.MouseEvent<HTMLButtonElement>, readingId: string) => {
}

const commands: ReadingCommands = {
    edit: handleEdit,
    save: handleAddReading,
    delete: handleDelete,
    signup: handleSignup,
    withdraw: handleWithdraw,
    review: handleReview,
    feedback: handleFeedback
}

interface GroupsPersonalFormProps {
    group: Group;
}

const styles = {
    marginLeft: '75px' // or a responsive value
};

const GroupsPersonalForm: React.FC<GroupsPersonalFormProps> = ({group}) => {
    const { user, isLoading } = useUserContext();
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const { groupId } = useParams<{ groupId: string }>();

    const userIndex: number = group.groupUser.findIndex(item => item.userId === user.id);
    const isAdmin = group.groupUser[userIndex].isAdmin;
    
    return (
        <Box style={styles} sx={{ maxWidth: 600, mx: "auto", p: 4}}>
            <Typography variant="h4" mb={3}>
                <GroupIcon 
                    sx={{ 
                        fontSize: '48px',
                        verticalAlign: "bottom", 
                    }}
                    />&nbsp;
                    {group!.name}
            </Typography>

            <Divider sx={{ my: 4 }} />

            <Grid container size={12} spacing={2} sx={{width: 300}}>
                <Grid alignItems="center" justifyContent="center" size={12}>
                    <ReadingCalendar readings={group.reading} isAdmin={isAdmin} commands={commands}/>
                </Grid>
                <Grid alignItems="center" justifyContent="center" size={12  }>
                    {group.reading.length > 0 ? (
                    <ReadingList readings={group.reading} commands={commands} />
                    ) : (
                        <div></div>
                    )}
                </Grid>
            </Grid>
    </Box>
    )
}
export default GroupsPersonalForm;