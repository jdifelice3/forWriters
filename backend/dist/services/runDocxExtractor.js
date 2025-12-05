"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// --- Run Example ---
const docxExtractor_1 = require("./docxExtractor");
const main = async () => {
    console.log('in main');
    const result = await (0, docxExtractor_1.extractCommentsWithTargets)("C:\\Projects\\forwriters\\backend\\src\\services\\1764259138560-Balk-Feedback.docx");
    console.log(JSON.stringify(result, null, 2));
    return result;
};
main();
