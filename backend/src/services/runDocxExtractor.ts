// --- Run Example ---
import { extractCommentsWithTargets } from "./docxExtractor";

const main = async() => {
    console.log('in main');
    const result = await extractCommentsWithTargets("C:\\Projects\\forwriters\\backend\\src\\services\\1764259138560-Balk-Feedback.docx");
    console.log(JSON.stringify(result, null, 2));
    return result;
}

main();