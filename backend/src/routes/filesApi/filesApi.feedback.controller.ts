// import prisma from "../../database/prisma";
// import { fullFeedbackInclude } from "./filesApi.feedback.includes";

// export async function getOrCreateFileFeedback(req: any, res: any) {
//   const appFileId = req.appFileId ?? req.params.appFileId;
//   const reviewerParticipantId = req.reviewerParticipantId;

//   if (!appFileId || !reviewerParticipantId) {
//     return res.status(400).json({ error: "Missing file or reviewer context" });
//   }

//   // 1️⃣ Try fetch
//   let feedback = await prisma.fileFeedback.findUnique({
//     where: {
//       appFileId_reviewerParticipantId: {
//         appFileId,
//         reviewerParticipantId,
//       },
//     },
//     include: fullFeedbackInclude,
//   });

//   if (feedback) {
//     return res.json(feedback);
//   }

//   // 2️⃣ Create if missing (race-safe)
//   try {
//     feedback = await prisma.fileFeedback.create({
//       data: {
//         appFileId,
//         reviewerParticipantId,
//       },
//       include: fullFeedbackInclude,
//     });

//     return res.status(201).json(feedback);
//   } catch {
//     // fallback for concurrent create
//     feedback = await prisma.fileFeedback.findUnique({
//       where: {
//         appFileId_reviewerParticipantId: {
//           appFileId,
//           reviewerParticipantId,
//         },
//       },
//       include: fullFeedbackInclude,
//     });

//     return res.json(feedback);
//   }
// }
