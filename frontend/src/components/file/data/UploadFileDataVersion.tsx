import UploadFileVersionForm from "../forms/UploadFileVersionForm";
import { AppFileMeta, AppFile } from "../../../types/domain-types";
import {
  Box,
} from "@mui/material";
import { FileDomainCommands } from "@/types/FileTypes";

interface FileVersionProps {
  domain: FileDomainCommands;
  appFileMetaId: string;
}

const UploadFileDataVersion: React.FC<FileVersionProps> = ({
  domain, appFileMetaId
}) => {
  //const url = `${import.meta.env.VITE_API_HOST}/api/files/${appFileMetaId}/upload/version`;

  return (
    <Box title="Upload a new version">
      <UploadFileVersionForm
        appFileMetaId={appFileMetaId}
        domain={domain}
      />
    </Box>
  );
};
export default UploadFileDataVersion;
