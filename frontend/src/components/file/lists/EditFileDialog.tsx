import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useEffect, useState } from "react";
import { AppFileMeta } from "../../../types/domain-types";

interface EditFileDialogProps {
  file: AppFileMeta | null;
  onClose(): void;
  onSave(input: {
    fileMetaId: string;
    title: string;
    description?: string;}): Promise<void>;
}

const EditFileDialog: React.FC<EditFileDialogProps> = ({
  file,
  onClose,
  onSave,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (file) {
      setTitle(file.title);
      setDescription(file.description ?? "");
    }
  }, [file]);

  if (!file) return null;

  const handleSave = async () => {
    const fileMetaId: string = file.id;
    await onSave({
      fileMetaId,
      title,
      description,
    });
    onClose();
  };

  return (
    <Dialog open fullWidth maxWidth="sm" onClose={onClose}>
      <DialogTitle>
        Edit File Metadata
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <TextField
          label="Title"
          fullWidth
          margin="dense"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          multiline
          rows={3}
          margin="dense"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button startIcon={<SaveIcon />} onClick={handleSave}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditFileDialog;
