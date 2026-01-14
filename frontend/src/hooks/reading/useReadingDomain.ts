import { useCallback } from "react";
import { useReadings } from "../../hooks/reading/useReadings";
import { ReadingsAPI } from "../../api/readingsApi";
import { CreateReadingInput } from "../../types/ReadingTypes";
import { Reading, FileFeedback, ReadingParticipant, ReadingSubmission, User } from "../../types/domain-types"
import { ReviewHTML } from "../../types/ReviewTypes";

export function useReadingDomain(
  groupId: string | undefined,
  user: User | undefined,
  refresh: () => Promise<any>
) {
  const { readings } = useReadings();
  const disabled = !groupId || !user;
  const userId = user?.id;
  
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

    const getManuscriptHtml = useCallback(async(readingId: string, submissionId: string) => {
        if (disabled) return;
    
        const { html } = await ReadingsAPI.getManuscriptHTML(groupId!, readingId, submissionId);

        await refresh();
        return html;
    }, [groupId, disabled]);


/** PERMISSIONS **/
    const canSignup = (readingId: string, userId: string) => {
        if (disabled) return;
        const foundReading: Reading | undefined = readings.find(r => r.id === readingId);
        const rp: ReadingParticipant | undefined =  foundReading?.readingParticipant.find(rp => rp.userId === userId);
        return rp === undefined;
    }

    const canWithdraw = (readingId: string, userId: string) => {
        if (disabled) return;
        return !canSignup(readingId, userId);
    }

    const canSubmit = (readingId: string, userId: string) => {
        if (disabled) return;
        const foundReading: Reading | undefined = readings.find(r => r.id === readingId);
        const rp: ReadingParticipant | undefined =  foundReading?.readingParticipant.find(rp => rp.userId === userId);
        const rs: ReadingSubmission | undefined = foundReading?.readingSubmission.find(item => item.participantId === rp?.id)
        return rs === undefined;
    }

    const canReview = (readingId: string, userId: string) => {
        if (disabled) return;
        //Check if the user has already submitted feedback
        const foundReading: Reading | undefined = readings.find(r => r.id === readingId);
        const foundParticipant: ReadingParticipant | undefined = foundReading?.readingParticipant.find(p => p.userId === userId);
        const foundSubmission: ReadingSubmission | undefined = foundReading?.readingSubmission.find(s => s.participantId === foundParticipant?.id);
        const foundFeedback: FileFeedback | undefined = foundSubmission?.fileFeedback.find(f => f.reviewerParticipantId === userId);
        const userHasSubmitted = foundFeedback !== undefined;

        //Check if the user is also the author of the submission
        let authorId: string = "";
        if(foundSubmission){
            authorId = foundSubmission?.appFile.userId;
        }
        const userIsAuthor = authorId === userId;
        if (!userHasSubmitted && !userIsAuthor){
            return true;
        } else {
            return false;
        }
    }

    return {
        createReading,
        signUpForReading,
        withdrawFromReading,
        deleteReading,
        submitFileVersion,
        updateSubmittedVersion,
        getManuscriptHtml,
        canSignup,
        canReview,
        canSubmit,
        canWithdraw
    };
}
