import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import {
  Group,
} from "../types/domain-types";
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  CardContent,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import MenuBookIcon from "@mui/icons-material/MenuBook";

import { useGroupDetails } from "../hooks/useGroup";
import { useReadings } from "../hooks/reading/useReadings";
import { useReadingDomain } from "../hooks/reading/useReadingDomain";
import { useReadingsData } from "../hooks/reading/useReadingsData";
import { useReadingsUI } from "../hooks/reading/useReadingsUI";

import ReadingCalendar from "../components/reading/ReadingCalendar";
import FileManagerList from "../components/file/lists/FileManagerList";
import { FileDomainCommands, FileListProperties } from "../types/FileTypes";

const Readings = () => {
  const navigate = useNavigate();
  const { user } = useUserContext();

  const { data: group, isLoading: isGroupLoading } =
    useGroupDetails<Group>();

  const {
    readings,
    isLoading: isReadingLoading,
  } = useReadings();

  const ui = useReadingsUI();

  const domain = useReadingDomain(group?.id ?? null, user?.id ?? null);
  
  const { myReadings, myFiles } = useReadingsData(readings, user);

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

  const membership = group.groupUser.find(
    (m) => m.userId === user.id
  );
  const isAdmin = membership?.role === "ADMIN";

  const fileListProperties: FileListProperties = {
    showPreviewButton: false,
    buttonDownloadText: "DOWNLOAD",
    showDeleteButton: false,
    showEditButton: false,
    showVersionHistory: false,
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
            <Grid container spacing={3}>
              {/* My submitted manuscripts */}
              <Grid size={4} className="readingSubPanel" sx={{ width: 500 }}>
                <Typography variant="h6" mb={2} fontWeight="bold">
                  My Submitted Manuscripts
                </Typography>

                <FileManagerList
                  files={myFiles}
                  variant="READINGS"
                  fileListProperties={fileListProperties}
                />
              </Grid>

              {/* Reading calendar */}
              <Grid size={4} className="readingSubPanel">
                <Typography variant="h6" mb={2} fontWeight="bold">
                  Group Reading Calendar
                </Typography>

                <ReadingCalendar
                  readings={readings}
                  isAdmin={isAdmin}
                  domain={domain}
                  ui={ui}
                  onFeedback={(readingId) =>
                    navigate(`/readingfeedback/${readingId}`)
                  }
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};

export default Readings;
