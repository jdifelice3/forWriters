import { useFileUpload } from "../../../hooks/useFile";
import UploadFileForm from "../forms/UploadFileForm";
import { AppFileMeta, AppFile } from "../../../types/domain-types";
import {
  Box,
} from "@mui/material";

interface FileVersionProps {
  onSendData: (data: AppFile) => void;
  appFileMetaId: string;
  disabled?: boolean;
}

const UploadFileDataVersion: React.FC<FileVersionProps> = ({
  onSendData,
  appFileMetaId,
  disabled,
}) => {
  const url = `${import.meta.env.VITE_API_HOST}/api/files/${appFileMetaId}/upload/version`;

  const { upload, loading } = useFileUpload({
    url,
    onSuccess: (file: AppFile) => {
        alert("Your file has been uploaded");
        onSendData(file);
    },
    onError: (err: Error) => {
        console.error(err);
        alert(err.message);
    }
  });

  return (
    <Box title="Upload a new version">
      <UploadFileForm
        onSubmit={upload}
        loading={loading}
        appFileMetaId={appFileMetaId}
      />
    </Box>
  );
};
export default UploadFileDataVersion;
