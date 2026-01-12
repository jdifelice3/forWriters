import { useFileDomain } from "../../../hooks/file/useFileDomain";
import UploadFileForm from "../forms/UploadFileForm";
import { AppFileMeta, AppFile } from "../../../types/domain-types";
import {
  Box,
} from "@mui/material";
import { FileDomainCommands } from "@/types/FileTypes";

interface ManuscriptProps {
  domain: FileDomainCommands;
  disabled?: boolean;
}

const UploadFileDataManuscript: React.FC<ManuscriptProps> = ({
  domain,
  disabled,
}) => {
    const { uploadManuscript } = useFileDomain();


  return (
    <Box title="Upload a new manuscript">
      <UploadFileForm
        domain={domain}
      />
    </Box>
  );
};
export default UploadFileDataManuscript;
