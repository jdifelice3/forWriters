import { useCallback } from "react";
import { useReadings } from "../../hooks/reading/useReadings";
import { ReadingsAPI } from "../../api/readingsApi";
import { CreateReadingInput } from "../../types/ReadingTypes";
import { Reading, ReadingParticipant, ReadingSubmission } from "../../types/domain-types";

export function useReadingDomain(
  groupId: string | null,
  userId: string | null,
  refresh: () => Promise<any>
) {
  const { readings } = useReadings();
  const disabled = !groupId || !userId;

    const createReading = useCallback(async (input: CreateReadingInput) => {
        if (disabled) return;
        await ReadingsAPI.create(groupId!, input, userId!, input.schedule);
        await refresh();
    }, [groupId, userId, disabled]);

    const signUpForReading = useCallback(async (readingId: string) => {
        if (disabled) return;
        await ReadingsAPI.signup(groupId!, readingId, userId!);
        await refresh();
    }, [groupId, userId, disabled]);

    const withdrawFromReading = useCallback(async (readingId: string) => {
        if (disabled) return;
        await ReadingsAPI.withdraw(groupId, readingId, userId!);
        await refresh();
    }, [userId, disabled]);

    const deleteReading = useCallback(async (readingId: string) => {
        if (disabled) return;
        await ReadingsAPI.remove(groupId!, readingId);
        await refresh();
    }, [groupId, disabled]);

    const submitFileVersion = useCallback(async (readingId: string, appFileId: string) => {
        if (disabled) return;
        await ReadingsAPI.addVersion(groupId!, readingId, appFileId);
        await refresh();
    }, [groupId, disabled]);

    const updateSubmittedVersion = useCallback(async (readingId: string, appFileId: string) => {
        if (disabled) return;
        await ReadingsAPI.updateVersion(groupId!, readingId, appFileId);
        await refresh();
    }, [groupId, disabled]);

/** PERMISSIONS **/
    const canSignup = (readingId: string, userId: string) => {
        const foundReading: Reading | undefined = readings.find(r => r.id === readingId);
        const rp: ReadingParticipant | undefined =  foundReading?.readingParticipant.find(rp => rp.userId === userId);
        return rp === undefined;
    }

    const canWithdraw = (readingId: string, userId: string) => {
        return !canSignup(readingId, userId);
    }

    const canSubmit = (readingId: string, userId: string) => {
        const foundReading: Reading | undefined = readings.find(r => r.id === readingId);
        const rp: ReadingParticipant | undefined =  foundReading?.readingParticipant.find(rp => rp.userId === userId);
        const rs: ReadingSubmission | undefined = foundReading?.readingSubmission.find(item => item.participantId === rp?.id)
        return rs === undefined;
    }

    const canReview = (readingId: string, userId: string) => {
        const foundReading: Reading | undefined = readings.find(r => r.id === readingId);
        const foundSubmission = foundReading?.readingSubmission.find(s => s.participantId === userId);
        return !foundSubmission;
    }

    return {
        createReading,
        signUpForReading,
        withdrawFromReading,
        deleteReading,
        submitFileVersion,
        updateSubmittedVersion,
        canSignup,
        canReview,
        canSubmit,
        canWithdraw
    };
}
