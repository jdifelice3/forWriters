import { useUserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  Group, Reading
} from "../types/domain-types";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { ReadingFormInput } from "../schemas/reading.schema";

import { useGroupDetails, useGroupGetCount } from "../hooks/useGroup";

import { useReadings } from "../hooks/reading/useReadings";
import { useReadingDomain } from "../hooks/reading/useReadingDomain";
import { useReadingsData } from "../hooks/reading/useReadingsData";
import { useReadingsUI } from "../hooks/reading/useReadingsUI";
import { useNotificationDomain } from "../hooks/notification/useNotificationDomain";

import { useFileUI } from "../hooks/file/useFileUI";

import ReadingCalendar from "../components/reading/ReadingCalendar";
import FileManagerList from "../components/file/lists/FileManagerList";
import { FileListProperties } from "../types/FileTypes";
import { CreateReadingInput } from "../types/ReadingTypes";

const Readings = () => {
    const { groupId } = useParams();
  const navigate = useNavigate();
  const { user, isLoading: isUserLoading } = useUserContext();
  const uiFile = useFileUI();
  const { data: group, isLoading: isGroupLoading } = useGroupDetails<Group>(groupId);
  const { readings, isLoading: isReadingLoading, refresh } = useReadings();
  const { createNotification } = useNotificationDomain(group?.id, user)

  const ui = useReadingsUI();
  const domain = useReadingDomain(group?.id ?? undefined, user, readings, refresh);
  
  if ( isUserLoading || isGroupLoading || !group) {
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

  const membership = group?.groupUser.find(
    (m) => m.userId === user.id
  );
  const isAdmin = membership?.role === "ADMIN";

  const fileListProperties: FileListProperties = {
    noFilesMessage: "",
    showPreviewButton: false,
    buttonDownloadText: "DOWNLOAD",
    showDeleteButton: false,
    showEditButton: false,
    showVersionHistory: false,
    showDescription: true
  };

    const onCreateReading = async (form: ReadingFormInput) => {
        const input: ReadingFormInput = {
            ...form,
        };
        await domain.createReading(input);
    };

    const onFeedback = async(readingId: string) => {
        const reading: Reading | undefined = readings.find(r => r.id === readingId);
        if(!reading) return;

        const href = `/filefeedback/${readingId}`;
        if(reading?.readingParticipant.length > 0){
            for(let i = 0; i < reading?.readingParticipant.length; i++){
                const name = 
                    reading.readingParticipant[i].user.userProfile?.firstName
                    ? `${reading.readingParticipant[i].user.userProfile?.firstName} ${reading.readingParticipant[i].user.userProfile?.lastName}`
                    : reading.readingParticipant[i].user.email;

                const message = `${name} is reviewing your reading`;
                createNotification(
                    message, 
                    "READING_FEEDBACK", 
                    reading.readingParticipant[i].user.id, 
                    href
                )
            }
        }
        navigate(href);
    }

  return (
    <Card elevation={0} className="mainComponentPanel">
      <CardContent>
        <Typography variant="h4" mb={2}>
          <MenuBookIcon
            sx={{ fontSize: "44px", verticalAlign: "bottom" }}
          />{" "}
          Readings
        </Typography>

        <Card>
          <CardContent>
            <Stack className="readingSubPanel">
              {/* Reading calendar */}
                <Typography variant="h6" mb={2} fontWeight="bold">
                  {group.groupType === "WRITING" ? "Group Reading Calendar" : "Review My Manuscripts"}
                </Typography>

                <ReadingCalendar
                  readings={readings}
                  isAdmin={isAdmin}
                  domain={domain}
                  ui={ui}
                  onFeedback={onFeedback}
                  onCreateReading={onCreateReading}
                />
            </Stack>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default Readings;
