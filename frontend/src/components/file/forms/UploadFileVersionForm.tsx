import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import UploadIcon from "@mui/icons-material/Upload";
import { FileDomainCommands } from "@/types/FileTypes";

interface UploadFileVersionFormProps {
    domain: FileDomainCommands;
    appFileMetaId: string;
    loading?: boolean;
    disabled?: boolean;
    submitLabel?: boolean;
    selectFileLabel?: boolean;
}

const UploadFileVersionForm: React.FC<UploadFileVersionFormProps> = ({
    domain,
    appFileMetaId,
    loading = false,
    disabled = false,
    submitLabel = "Upload",
    selectFileLabel: selectFileLable = "CHOOSE FILE"
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [comment, setComment] = useState("");

    // File upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("comment", comment);
        
        domain.uploadVersion(appFileMetaId, formData);
    };

  return (
    <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={2}>
            <Grid size={12}>
                <Button
                    variant="outlined"
                    component="label"
                    startIcon={<UploadIcon />}
            >
                    {file ? file.name : selectFileLable}
                    <input type="file" hidden onChange={handleFileChange} />
                </Button>
                        </Grid>
            <Grid size={12}>
                <TextField
                    label="Comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    fullWidth
                    required
                />
            </Grid>
            <Grid size={3}>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                    startIcon={<UploadIcon />}
                >
                    {loading ? <CircularProgress size={24} /> : submitLabel}
                </Button>
            </Grid>
        </Grid>
    </Box>
  );
};
export default UploadFileVersionForm;