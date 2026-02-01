import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Reading, UserSearch } from "../../types/domain-types";
import {
  ReadingFormSchema,
  ReadingFormInput
} from "../../schemas/reading.schema";

export function useReadingForm(reading?: Reading) {
  const form = useForm<ReadingFormInput>({
  resolver: zodResolver(ReadingFormSchema),
  defaultValues: {
    name: "",
    description: "",
    participants: [],
    readingDate: undefined,
    submissionDeadline: undefined,
    readingStartTime: undefined,
    readingEndTime: undefined,
  },
});

  const participants = useFieldArray({
    control: form.control,
    name: "participants"
  });

  const loadReading = (reading: Reading) => {

  const mapped = reading.readingParticipant.map(p => (
    {
        userId: p.userId,
        fullName: p.user?.userProfile?.firstName + " " + p.user?.userProfile?.lastName,
        role: p.role ?? "AUTHOR",
    }
  ));

  form.reset({
    name: reading.name,
    description: reading.description,
    participants: mapped,
    readingDate: reading.readingDate
      ? new Date(reading.readingDate).toISOString().slice(0, 10)
      : undefined,
    submissionDeadline: reading.submissionDeadline
      ? new Date(reading.submissionDeadline).toISOString().slice(0, 10)
      : undefined,
    readingStartTime: reading.readingStartTime ?? undefined,
    readingEndTime: reading.readingEndTime ?? undefined,
  });

  participants.replace(mapped);
};


  const addParticipant = (user: UserSearch) => {
    if (participants.fields.some(p => p.userId === user.userId)) {
      return { error: "Duplicate participant" };
    }

    participants.append({
      userId: user.userId,
      fullName: user.fullName,
      role: "AUTHOR"
    });

    return {};
  };

  return {
    ...form,
    participants,
    loadReading,
    addParticipant
  };
}
