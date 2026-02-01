import { useCallback } from "react";
import { ReadingsAPI } from "../../api/readingsApi";
import { AppFile, GroupType, Reading, ReadingParticipant, ReadingSubmission, User } from "../../types/domain-types"
import { ReadingFormInput } from "../../schemas/reading.schema";

export function useReadingDomain(
  groupId: string | undefined,
  user: User | undefined,
  readings: Reading[],
  refresh: () => Promise<any>
) {
  const disabled = !groupId || !user;
  const userId = user?.id;
  
    const createReading = useCallback(async (input: ReadingFormInput) => {
        if (disabled) return;
        await ReadingsAPI.create(groupId!, input, userId!);
        refresh();
    }, [groupId, userId, disabled, refresh]);

    const signUpForReading = useCallback(async (readingId: string) => {
        if (disabled) return;
        await ReadingsAPI.signup(groupId!, readingId, userId!);
        await refresh();
    }, [groupId, userId, disabled, refresh]);

    const withdrawFromReading = useCallback(async (readingId: string) => {
        if (disabled) return;
        await ReadingsAPI.withdraw(groupId, readingId, userId!);
        await refresh();
    }, [groupId, userId, disabled, refresh]);

    const deleteReading = useCallback(async (readingId: string) => {
        if (disabled) return;
        await ReadingsAPI.remove(groupId!, readingId);
        await refresh();
    }, [groupId, disabled, refresh]);

    const updateReading = useCallback(async (readingId: string, input: ReadingFormInput) => {
        if (disabled) return;
        await ReadingsAPI.update(groupId!, readingId, input);
        refresh();
    }, [groupId, disabled, refresh]);

    const submitFileVersion = useCallback(async (readingId: string, appFileId: string) => {
        if (disabled) return;
        await ReadingsAPI.addVersion(groupId!, readingId, appFileId);
        await refresh();
    }, [groupId, disabled, refresh]);

    const updateSubmittedVersion = useCallback(async (readingId: string, appFileId: string) => {
        if (disabled) return;
        await ReadingsAPI.updateVersion(groupId!, readingId, appFileId);
        await refresh();
    }, [groupId, disabled, refresh]);

    const getManuscriptHtml = useCallback(async(readingId: string, submissionId: string) => {
        if (disabled) return;
    
        const { html } = await ReadingsAPI.getManuscriptHTML(groupId!, readingId, submissionId);

        await refresh();
        return html;
    }, [groupId, disabled, refresh]);


/** PERMISSIONS **/
    const canSignup = useCallback(
    (readingId: string, userId: string, maxParticipants = 2) => {
        if (disabled) return false;

        const foundReading = readings.find(r => r.id === readingId);
        if (!foundReading) return false;

        if (foundReading.readingParticipant.length >= maxParticipants) {
        return false;
        }

        return !foundReading.readingParticipant.some(rp => rp.userId === userId);
    },
    [readings, disabled]
    );


    const canWithdraw = useCallback(
        (readingId: string, userId: string) => {
        if (disabled) return;
        const reading: Reading | undefined = readings.find(r => r.id === readingId);
        if(!reading) return undefined;
        if(!reading.submissionDeadline) return undefined;
        //check if before deadline
        const beforeDeadline = new Date() < new Date(reading.submissionDeadline) 
        const result = reading.readingParticipant.filter(
            rp => rp.userId === userId);
        const userIsParticipant = result.length > 0;
        const canWithdraw = userIsParticipant && beforeDeadline;
        return canWithdraw; 
    },
    [readings, disabled]
    );

    const canSubmit = useCallback(
        (readingId: string, userId: string) => {
        if (disabled) return;
        const foundReading: Reading | undefined = readings.find(r => r.id === readingId);
        const rp: ReadingParticipant | undefined =  foundReading?.readingParticipant.find(rp => rp.userId === userId);
        const rs: ReadingSubmission | undefined = foundReading?.readingSubmission.find(item => item.participantId === rp?.id)
        return rs === undefined;
    },
    [readings, disabled]
    );

    const canReviewReading = useCallback(
        (readingId: string, userId: string) => {
        if (disabled) return;
        const reading: Reading | undefined = readings.find(r => r.id === readingId);
        if(!reading) return undefined;
        if(!reading.submissionDeadline) return undefined;

        return new Date() >= new Date(reading.submissionDeadline);
    },
    [readings, disabled]
    );

    const canReviewFile = (appFile: AppFile , userId: string) => {
        //users cannot review their own file
        return appFile.userId !== userId;
    }

    const canChangeSubmission = (readingId: string, groupType: GroupType) => {
        const reading: Reading | undefined = readings.find(r => r.id === readingId);
        if(!reading) return undefined;
        switch (groupType) {
            case "WRITING":
                if(!reading.submissionDeadline) return undefined;

                return new Date() <= new Date(reading.submissionDeadline);
                break;
            case "PERSONAL":
                return true;
                break;
            default:
                return undefined;
        }
    }

    return {
        createReading,
        updateReading,
        signUpForReading,
        withdrawFromReading,
        deleteReading,
        submitFileVersion,
        updateSubmittedVersion,
        getManuscriptHtml,
        canSignup,
        canReviewReading,
        canReviewFile,
        canSubmit,
        canWithdraw,
        canChangeSubmission
    };
}
