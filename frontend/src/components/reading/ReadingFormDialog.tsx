import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Alert,
  IconButton,
  Typography,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { Reading, ReadingParticipant } from "../../types/domain-types";
import { ReadingFormInput } from "../../schemas/reading.schema";
import { useReadingForm } from "../../hooks/reading/useReadingForm";
import MemberSearchBox from "../../components/member/MemberSearchBox";
import { FieldArrayWithId } from "react-hook-form";

export interface ReadingFormDialogProps {
  open: boolean;
  reading?: Reading; // undefined => create mode
  locked: boolean;
  groupId: string;

  /** If true, show readingDate/submissionDeadline/start/end fields */
  showScheduleFields: boolean;

  onClose: () => void;
  onSubmit: (form: ReadingFormInput) => void;
}

function toDateInputValue(d?: Date | string | null): string {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return "";
  return date.toISOString().slice(0, 10); // YYYY-MM-DD
}

export const ReadingFormDialog: React.FC<ReadingFormDialogProps> = ({
  open,
  reading,
  locked,
  groupId,
  showScheduleFields,
  onClose,
  onSubmit,
}) => {
  const [dupeError, setDupeError] = useState<string | null>(null);

  const form = useReadingForm(reading);

  // Preload form values for edit mode (and clear for create)
  useEffect(() => {
    if (reading) {
      // Let the hook map participants etc.
      form.loadReading(reading);
      // Ensure date/time fields are in the correct string formats for MUI inputs
      form.setValue("readingDate", toDateInputValue(reading.readingDate));
      form.setValue("submissionDeadline", toDateInputValue(reading.submissionDeadline));
      form.setValue("readingStartTime", reading.readingStartTime ?? "");
      form.setValue("readingEndTime", reading.readingEndTime ?? "");
      
    } else {
      form.reset({
        name: "",
        description: "",
        participants: [],
        readingDate: "",
        submissionDeadline: "",
        readingStartTime: "",
        readingEndTime: "",
      });
    }

    setDupeError(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reading, open]);

  const submit = async (data: ReadingFormInput) => {
    setDupeError(null);
    await onSubmit(data);
    // caller closes dialog; we still reset to keep state clean if reopened quickly
    form.reset({
      name: "",
      description: "",
      participants: [],
      readingDate: "",
      submissionDeadline: "",
      readingStartTime: "",
      readingEndTime: "",
    });
  };

  const {
    formState: { errors, isSubmitting },
  } = form;

  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle sx={{ pb: 0 }}>
        {reading ? "Edit Reading" : "Create Reading"}
      </DialogTitle>

      <Box component="form" onSubmit={form.handleSubmit(submit)} noValidate>
        <DialogContent>
          {locked && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              This reading already has submissions and cannot be edited.
            </Alert>
          )}

          {/* DETAILS */}
          <Accordion sx={{ mb: 2, backgroundColor: "#e3fdfb" }} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Reading Details</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                label="Reading Name"
                fullWidth
                sx={{ my: 1, backgroundColor: "white" }}
                disabled={locked}
                {...form.register("name")}
                error={!!errors.name}
                helperText={errors.name?.message as string | undefined}
              />

              <TextField
                label="Description"
                fullWidth
                multiline
                minRows={2}
                sx={{ my: 1, backgroundColor: "white" }}
                disabled={locked}
                {...form.register("description")}
                error={!!errors.description}
                helperText={errors.description?.message as string | undefined}
              />

              {showScheduleFields && (
                <>
                  <Divider sx={{ my: 2 }} />

                  <TextField
                    label="Reading Date"
                    type="date"
                    fullWidth
                    sx={{ my: 1, backgroundColor: "white" }}
                    disabled={locked}
                    InputLabelProps={{ shrink: true }}
                    {...form.register("readingDate")}
                    error={!!errors.readingDate}
                    helperText={errors.readingDate?.message as string | undefined}
                  />

                  <TextField
                    label="Submission Deadline"
                    type="date"
                    fullWidth
                    sx={{ my: 1, backgroundColor: "white" }}
                    disabled={locked}
                    InputLabelProps={{ shrink: true }}
                    {...form.register("submissionDeadline")}
                    error={!!errors.submissionDeadline}
                    helperText={errors.submissionDeadline?.message as string | undefined}
                  />

                  <TextField
                    label="Start Time"
                    placeholder="e.g. 7:00 PM"
                    fullWidth
                    sx={{ my: 1, backgroundColor: "white" }}
                    disabled={locked}
                    {...form.register("readingStartTime")}
                    error={!!errors.readingStartTime}
                    helperText={errors.readingStartTime?.message as string | undefined}
                  />

                  <TextField
                    label="End Time"
                    placeholder="e.g. 9:00 PM"
                    fullWidth
                    sx={{ my: 1, backgroundColor: "white" }}
                    disabled={locked}
                    {...form.register("readingEndTime")}
                    error={!!errors.readingEndTime}
                    helperText={errors.readingEndTime?.message as string | undefined}
                  />
                </>
              )}
            </AccordionDetails>
          </Accordion>

{/* PARTICIPANTS / AUTHORS */}
        {showScheduleFields && (
          <Accordion sx={{ backgroundColor: "#e3fdfb" }} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="h6">Authors - Add/Edit</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {form.participants.fields.map((p: FieldArrayWithId, i: number) => (
                <Box
                  key={p.id}
                  display="flex"
                  gap={1}
                  alignItems="center"
                  sx={{ mb: 1 }}
                >
                  <TextField
                    fullWidth
                    sx={{ backgroundColor: "white" }}
                    InputProps={{ readOnly: true }}
                    {...form.register(`participants.${i}.fullName`)}
                  />

                  {/* Hidden userId field keeps form data intact */}
                  <input type="hidden" {...form.register(`participants.${i}.userId`)} />

                  {!locked && (
                    <IconButton onClick={() => form.participants.remove(i)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </Box>
              ))}

              {!locked && (
                <>
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Find authors to add to the reading
                  </Typography>

                  <MemberSearchBox
                    groupId={groupId}
                    onSelectMember={(user) => {
                      if (!user) return;
                      const res = form.addParticipant(user);
                      if (res?.error) setDupeError(res.error);
                      else setDupeError(null);
                    }}
                  />
                </>
              )}

              {dupeError && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {dupeError}
                </Alert>
              )}

              {errors.participants && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {(errors.participants as any)?.message ?? "Please add at least one author."}
                </Alert>
              )}
            </AccordionDetails>
          </Accordion>
        )}
        </DialogContent>

        <DialogActions sx={{ pb: 2, pr: 3 }}>
          <Button onClick={onClose}>Cancel</Button>

          <Button
            type="submit"
            variant="contained"
            disabled={locked || isSubmitting}
          >
            {reading ? "Save Changes" : "Create Reading"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ReadingFormDialog;
