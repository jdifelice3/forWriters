import React, { useState } from "react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { ReadingFormInput } from "../../schemas/reading.schema";
import { Reading } from "../../types/domain-types";
import { ReadingDomainCommands } from "../../types/ReadingTypes";
import { useUserContext } from "../../context/UserContext";
import { useGroupContext } from "../../context/GroupContextProvider";
import { useReadingsUI } from "../../hooks/reading/useReadingsUI";
import { ReadingCalendarItemForm } from "./ReadingCalendarItemForm";
import { ReadingFormDialog } from "./ReadingFormDialog";
import { ReadingFormInline } from "./ReadingFormInline";

interface ReadingCalendarProps {
  readings: Reading[];
  isAdmin: boolean;
  domain: ReadingDomainCommands;
  ui: ReturnType<typeof useReadingsUI>;
  onCreateReading(form: any): Promise<void>;
  //onUpdateReading(readingId: string, form: ReadingFormInput): Promise<void>;
  onFeedback(readingId: string): void;
}

export const ReadingCalendar: React.FC<ReadingCalendarProps> = ({
  readings,
  isAdmin,
  domain,
  ui,
  onCreateReading,
  //onUpdateReading,
  onFeedback
}) => {
  const { user, isLoading, error } = useUserContext();
  const { activeGroup } = useGroupContext();

  const [inlineEditId, setInlineEditId] = useState<string | null>(null);
  const [dialogReading, setDialogReading] = useState<Reading | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (isLoading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!user || !activeGroup) return null;

const openCreateDialog = () => {
  setDialogReading(null);
  setDialogOpen(true);
};
const closeCreateDialog = () => {
  setDialogReading(null);
  setDialogOpen(false);
};

const openEditDialog = (reading: Reading) => {
  setDialogReading(reading);
  setDialogOpen(true);
};

  return (
    <Box>
      {isAdmin && (
        <Button
          startIcon={<AddIcon />}
          variant="outlined"
          sx={{ mb: 2 }}
          onClick={() => openCreateDialog()}
        >
          Create Reading
        </Button>
      )}

      {readings.map(reading => {
        const locked = reading.readingSubmission.length > 0;

        return (
          <Box key={reading.id} sx={{ mb: 3 }}>
            {inlineEditId === reading.id ? (
              <ReadingFormInline
                reading={reading}
                groupId={activeGroup.id}
                locked={locked}
                onCancel={() => setInlineEditId(null)}
                onSave={async form => { 
                  await domain.updateReading(reading.id, form);
                  //await onUpdateReading(reading.id, form);
                  setInlineEditId(null);
                }}
              />
            ) : (
              <>
                <ReadingCalendarItemForm
                  key={reading.id}
                  reading={reading}
                  isAdmin={isAdmin}
                  onFeedback={onFeedback}
                  domain={domain}
                  ui={ui}
                />

                {isAdmin && (
                  <Box display="flex" gap={1} mt={1}>
                    {!locked && (
                      <Button
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => setInlineEditId(reading.id)}
                      >
                        Inline Edit
                      </Button>
                    )}

                    <Button
                      size="small"
                      onClick={() => openEditDialog(reading)}
                    >
                      Edit (Dialog)
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Box>
        );
      })}

        <ReadingFormDialog
            open={dialogOpen}
            reading={dialogReading ?? undefined}
            locked={Boolean(dialogReading?.readingSubmission?.length)}
            groupId={activeGroup.id}
            showScheduleFields={activeGroup.groupType === "WRITING"}
            onClose={() => {
                setDialogReading(null);
                setDialogOpen(false);
            }}
            onSubmit={async(form) => {
                if (dialogReading) {
                    await domain.updateReading(dialogReading.id, form);
                } else {
                    await domain.createReading(form);
                }

                setDialogOpen(false);
                setDialogReading(null);
            }}
        />

        </Box>
  );
};

export default ReadingCalendar;
