// --- Run Example ---
import { extractCommentsWithTargets } from "./docxExtractor";

const main = async() => {
    
    const result = await extractCommentsWithTargets("C:\\Projects\\forwriters\\backend\\src\\services\\1764259138560-Balk-Feedback.docx");
    return result;
}

main();