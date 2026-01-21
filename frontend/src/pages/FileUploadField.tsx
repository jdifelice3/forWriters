import { Button } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

const FileUploadField = ({ onChange }: { onChange: (file: File | null) => void }) => {
  return (
    <Button
      component="label"
      variant="outlined"
      startIcon={<UploadIcon />}
      sx={{width: "225px"}}
      disabled
    >
      Upload Profile Pic
      <input
        hidden
        type="file"
        accept="image/*"
        onChange={(e) => onChange(e.target.files?.[0] || null)}
      />
    </Button>
  );
}

export default FileUploadField;
