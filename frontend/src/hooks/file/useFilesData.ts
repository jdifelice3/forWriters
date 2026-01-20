import { useMemo } from "react";
import { AppFileMeta, Reading, User } from "../../types/domain-types";
import { DocumentEnum } from "../../util/Enum";

export const useFilesData = (
    files: AppFileMeta[] | undefined
) => {

    const myManuscripts: AppFileMeta[] = useMemo(() => {
        if(!files) return [];
        return files.filter(f => f.documentType === DocumentEnum.MANUSCRIPT);
    }, [files]);

    const myFeedbackDocuments: AppFileMeta[] = useMemo(() => {
        if(!files) return [];
        
        return files.filter(f => f.documentType === DocumentEnum.FEEDBACK);
    }, [files]);

    return { myManuscripts, myFeedbackDocuments };
}