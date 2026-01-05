import { useFileUpload } from "../../../hooks/file/useFile";
import UploadFileFormFeedback from "../forms/UploadFileFormFeedback";
import { AppFile, AppFileMeta } from "../../../types/domain-types";
import {
  Box,
} from "@mui/material";

interface FeedbackProps {
  onSendData: (data: AppFile) => void;
  readingAuthorId: string;
  disabled?: boolean;
}

const UploadFileDataFeedback: React.FC<FeedbackProps> = ({
  onSendData,
  readingAuthorId,
  disabled,
}) => {
  const url = `${import.meta.env.VITE_API_HOST}/api/files/ra/${readingAuthorId}`;
  
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
    <Box title="Upload the author's Word Doc with your comments">
      <UploadFileFormFeedback
        onSubmit={upload}
        loading={loading}
      />
    </Box>
  );
};
export default UploadFileDataFeedback;
