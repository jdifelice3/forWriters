// --- Run Example ---
import { extractCommentsWithTargets } from "./docxExtractor";
import { extractCommentsWithTargetsFromS3 } from "./streamFromS3";

const main = async() => {
    
    const result = await extractCommentsWithTargetsFromS3("forwriters-app-files","1768156962037-Balk-Feedback.docx","us-east-2")//"C:\\Projects\\forwriters\\backend\\src\\services\\1764259138560-Balk-Feedback.docx");
    return result;
}

main();