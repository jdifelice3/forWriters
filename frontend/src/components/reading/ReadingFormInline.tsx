import {
  Box,
  Button,
  TextField,
  IconButton,
  Alert,
  Typography
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";

import { Reading } from "../../types/domain-types";
import { ReadingFormInput } from "../../schemas/reading.schema";
import { useReadingForm } from "../../hooks/reading/useReadingForm";
import MemberSearchBox from "../member/MemberSearchBox";

export interface ReadingFormInlineProps {
  reading: Reading;
  groupId: string;
  locked: boolean;
  onSave: (form: ReadingFormInput) => Promise<void>;
  onCancel: () => void;
}

export const ReadingFormInline: React.FC<ReadingFormInlineProps> = ({
  reading,
  groupId,
  locked,
  onSave,
  onCancel
}) => {
  const [error, setError] = useState<string | null>(null);
  const form = useReadingForm(reading);

  useEffect(() => {
    form.loadReading(reading);
  }, [reading]);

  return (
    <Box
      component="form"
      onSubmit={form.handleSubmit(onSave)}
      sx={{ p: 2, border: "1px solid #ddd", borderRadius: 2 }}
    >
      {locked && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Editing locked due to submissions.
        </Alert>
      )}

      <TextField
        label="Reading Name"
        fullWidth
        margin="normal"
        disabled={locked}
        {...form.register("name")}
      />

      <TextField
        label="Description"
        fullWidth
        margin="normal"
        disabled={locked}
        {...form.register("description")}
      />

      <Typography variant="subtitle1" sx={{ mt: 2 }}>
        Authors
      </Typography>

      {form.participants.fields.map((p, i) => (
        <Box key={p.id} display="flex" gap={1} mt={1}>
          <TextField
            fullWidth
            InputProps={{ readOnly: true }}
            {...form.register(`participants.${i}.fullName`)}
          />
          {!locked && (
            <IconButton onClick={() => form.participants.remove(i)}>
              <DeleteIcon />
            </IconButton>
          )}
        </Box>
      ))}

      {!locked && (
        <MemberSearchBox
          groupId={groupId}
          onSelectMember={user => {
            const res = form.addParticipant(user!);
            if (res?.error) setError(res.error);
            else setError(null);
          }}
        />
      )}

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" variant="contained" disabled={locked}>
          Save
        </Button>
      </Box>
    </Box>
  );
};
