import { useEffect, useMemo } from "react";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";

const MAX_AVATAR_BYTES = 5 * 1024 * 1024;
const SUPPORTED_AVATAR_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

interface FileUploadFieldProps {
  value?: File;
  currentImageUrl?: string;
  initials?: string;
  disabled?: boolean;
  onChange: (file: File | undefined) => void;
  onError: (message: string) => void;
}

const FileUploadField = ({
  value,
  currentImageUrl,
  initials,
  disabled = false,
  onChange,
  onError,
}: FileUploadFieldProps) => {
  const previewUrl = useMemo(
    () => (value ? URL.createObjectURL(value) : undefined),
    [value]
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFile = (file?: File) => {
    if (!file) return;

    if (!SUPPORTED_AVATAR_TYPES.has(file.type)) {
      onError("Choose a JPEG, PNG, WebP, or GIF image.");
      return;
    }

    if (file.size > MAX_AVATAR_BYTES) {
      onError("Profile images must be 5 MB or smaller.");
      return;
    }

    onError("");
    onChange(file);
  };

  return (
    <Stack className="profile-avatar-control" direction="row" spacing={2.5}>
      <Avatar
        className="profile-avatar-preview"
        alt="Profile image preview"
        src={previewUrl ?? currentImageUrl}
      >
        {initials}
      </Avatar>
      <Stack className="profile-avatar-copy" spacing={0.75}>
        <Typography component="h3">Profile image</Typography>
        <Typography>
          Add a photo so other writers can recognize you. JPEG, PNG, WebP, or GIF up to 5 MB.
        </Typography>
        <div className="profile-avatar-actions">
          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadIcon />}
            disabled={disabled}
          >
            {currentImageUrl || value ? "Change photo" : "Choose photo"}
            <input
              hidden
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={(event) => {
                handleFile(event.target.files?.[0]);
                event.target.value = "";
              }}
            />
          </Button>
          {value && <Typography component="span">{value.name}</Typography>}
        </div>
      </Stack>
    </Stack>
  );
};

export default FileUploadField;
