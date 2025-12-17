import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import UploadIcon from "@mui/icons-material/Upload";

interface UploadFeedbackFileFormProps {
    onSubmit: (data: FormData) => void;
    loading?: boolean;
    disabled?: boolean;
    submitLabel?: boolean;
    selectFileLabel?: boolean;
}

const UploadFeedbackFileForm: React.FC<UploadFeedbackFileFormProps> = ({
    onSubmit,
    loading = false,
    disabled = false,
    submitLabel = "Upload",
    selectFileLabel: selectFileLable = "CHOOSE FILE"
}) => {
    const [file, setFile] = useState<File | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [additionalFeedback, setAdditionalFeedback] = useState("");

    // File upload
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected) {
            setFile(selected);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !title) return;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title);
        formData.append("description", description);
        formData.append("additionalFeedback", additionalFeedback.replace(/\r\n/g,"\n"));

        onSubmit(formData);
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
            <Grid size={4}>
                <TextField
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    fullWidth
                    required
                />
            </Grid>
            <Grid size={8}>
                <TextField
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    fullWidth
                />
            </Grid>
            <Grid size={12}>
                <TextField
                    label="Additional Feedback"
                    value={additionalFeedback}
                    // sx={{width: "740px"}}
                    multiline
                    rows={6} // Sets the initial number of visible rows
                    placeholder="Additional feedback (optional)"
                    fullWidth
                    onChange={(e) => setAdditionalFeedback(e.target.value)}
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
export default UploadFeedbackFileForm;