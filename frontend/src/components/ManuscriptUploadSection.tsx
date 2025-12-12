import { useFileUpload } from "../hooks/useFileUpload";
import UploadFileForm from "./UploadFileForm";
import { AppFile } from "../types/domain-types";
import {
  Box,
} from "@mui/material";

interface ManuscriptProps {
  onSendData: (data: AppFile) => void;
  disabled?: boolean;
}

const ManuscriptUploadSection: React.FC<ManuscriptProps> = ({
  onSendData,
  disabled,
}) => {
  const url = `${import.meta.env.VITE_API_HOST}/api/files`;

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
    <Box title="Upload a new manuscript">
      <UploadFileForm
        onSubmit={upload}
        loading={loading}
      />
    </Box>
  );
};
export default ManuscriptUploadSection;
