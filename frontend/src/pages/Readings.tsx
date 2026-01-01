import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { 
    AppFileMeta,
    Group,
    Reading
 } from "../types/domain-types";
import {
  Alert,
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent
} from "@mui/material";

import Grid from "@mui/material/Grid";
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ReadingList from "../components/reading/ReadingList";
import { ReadingCommands } from "../types/ReadingTypes";
import { FileCommands, FileListProperties } from "../types/FileTypes";
import { useGroupDetails } from "../hooks/useGroup";
import ReadingCalendar from "../components/reading/ReadingCalendar";
import FileManagerList from "../components/file/lists/FileManagerList";
import { useReadings, useReadingsUI, useReadingsActions, useReadingsData } from "../hooks/useReading";
import { FormInput } from "../types/ReadingTypes";

const Readings = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const { data: group, isLoading: isGroupLoading, mutate } =
    useGroupDetails<Group>();

  const {
    readings,
    isLoading: isReadingLoading,
    isError,
    mutate: refreshReadingData,
  } = useReadings();

  const ui = useReadingsUI();

  // ✅ Hooks must be called unconditionally
  const actions = useReadingsActions(group?.id ?? null, user?.id ?? null, mutate);

  // ✅ Safe even while loading (hook runs every render)
  const { myReadings, myFiles } = useReadingsData(readings, user);

  // ✅ Now you can render-guard
  if (isGroupLoading || !group) {
    return (
      <Box display="flex" justifyContent="center" p={6}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  if (isReadingLoading) {
    return (
      <Box display="flex" justifyContent="center" p={6}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  // ✅ Admin calc must be safe (findIndex can be -1)
    const membership = group.groupUser.find((m) => m.userId === user.id);
    const isAdmin = membership?.role === "ADMIN";


const handleAddReading = async (input: FormInput ) => {
    try {
        ui.beginSubmit();
        actions.create(input, input.schedule);
        ui.endSubmit();
        mutate();
    } catch (err) {
        ui.setError("Failed to create reading");
    } 
};

const handleSignup = async (event: React.MouseEvent<HTMLButtonElement>, readingId: string) => {
    try {
        actions.signup(readingId);
        alert("You are signed up for this reading!");
    } catch (err) {
        if(err instanceof Error) ui.setError(err.message);
    }
};

const handleWithdraw = async(event: React.MouseEvent<HTMLButtonElement>, readingId: string) => {
    try {
        actions.withdraw(readingId);
        alert("You have withdrawn from this reading!");
    } catch (err) {
        if(err instanceof Error) ui.setError(err.message);
    }
}

  const handleEdit = (reading: Reading) => {
        ui.startEdit(reading);
  };
  
  const handleReview = async(event: React.MouseEvent<HTMLButtonElement>, readingId: string) => {
    alert('Review button clicked');
  }

const handleDelete = async (reading: Reading) => {
    if (!confirm("Are you sure you want to delete this reading?")) return;
    try {
        actions.remove(reading.id);
    } catch (err: unknown) {
        if(err instanceof Error){
            ui.setError(`Error caught in handleDelete: ${err.message}`);
            console.error(`Error caught in handleDelete: ${err.message}`);
        } else {
            console.error("Unknown error occurred")
        }
    }
  };

const handleFeedback = (event: React.MouseEvent<HTMLButtonElement>, readingId: string) => {
    navigate(`/readingfeedback/${readingId}`)
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

const fileListProperties: FileListProperties = {
    showPreviewButton: false,
    buttonDownloadText: "DOWNLOAD",
    showDeleteButton: false,
    showEditButton: false,
    showVersionHistory: false
}

const handleFileEdit = async(file: AppFileMeta) => {
};

const handleFileSaveEdit = async (file:AppFileMeta) => {
};

const handleFileDelete = async (file: AppFileMeta) => {
};

const onVersionChange = async(event:React.ChangeEvent<HTMLInputElement>, fileAppMeta: AppFileMeta, version: string) => {
}

const onVersionUpload = async(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, appFileMeta: AppFileMeta) => {
}

const fileCommands: FileCommands = {
    edit: handleFileEdit,
    save: handleFileSaveEdit,
    delete: handleFileDelete,
    onVersionChange: onVersionChange,
    onVersionUpload: onVersionUpload
}

    return (
        <>
        <Card elevation={0} className="mainComponentPanel">
            <CardContent>
                <Typography variant="h4" mb={2}>
                    <MenuBookIcon 
                        sx={{ 
                        fontSize: '44px',
                        verticalAlign: "bottom", 
                        }}
                    />&nbsp;
                    Readings
                </Typography>
                <Card>
                    <CardContent>
                        <Grid size={12} container spacing={3}>
                            <Grid size={4} className="readingSubPanel"  sx={{width: 500}}>
                                <Typography variant="h6" mb={2}
                                    sx={{
                                        fontWeight: "bold",
                                    }}
                                >
                                My Submitted Manuscripts
                                </Typography>
                                    <FileManagerList files={myFiles} fileListProperties={fileListProperties} commands={fileCommands} />
                            </Grid>
                            <Grid size={4}  className="readingSubPanel">
                                <Typography variant="h6" mb={2}
                                    sx={{
                                        fontWeight: "bold"
                                    }}
                                >
                                Group Reading Calendar
                                </Typography>
                                {/* {group?.reading ? ( */}
                                    <ReadingCalendar readings={readings} isAdmin={isAdmin} commands={readingCommands}/>
                                {/* ) : (
                                    <Typography>Readings have not yet been created for this group.</Typography>
                                )}
                                 */}
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
        </>
    )

}
export default Readings;
