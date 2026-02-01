import { useUserContext } from "../context/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  Group,
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
        console.log(JSON.stringify(form))
        const input: ReadingFormInput = {
            ...form,
            //readingDate,//: new Date(form.readingDate!),
            //submissionDeadline//: new Date(form.submissionDeadline!),
        };
        await domain.createReading(input);
    };

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
                  Group Reading Calendar
                </Typography>

                <ReadingCalendar
                  readings={readings}
                  isAdmin={isAdmin}
                  domain={domain}
                  ui={ui}
                  onFeedback={(readingId) =>
                    navigate(`/filefeedback/${readingId}`)
                  }
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
