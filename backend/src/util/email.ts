// //import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
// import { Resend } from "resend";
// // const ses = new SESClient({
// //   region: process.env.AWS_REGION,
// // });

// export async function sendEmail({
//   to,
//   subject,
//   html,
//   text,
// }: {
//   to: string;
//   subject: string;
//   html: string;
//   text?: string;
// }) {
//     const resend = new Resend(process.env.RESEND_API_KEY);
//     const result = await resend.emails.send({
//         from: "support@forwriters.ink",
//         to: to,
//         subject: "You've been invited to join a writing group at forWriters",
//             html: `
//                 <p>You’ve been invited to join <b>${req.group.name}</b>.</p>
//                 <a href="${inviteUrl}">Accept Invitation</a>
//                 <p>This link expires in 7 days.</p>
//             `,
// //   const command = new SendEmailCommand({
// //     Source: process.env.EMAIL_FROM!,
// //     Destination: {
// //       ToAddresses: [to],
// //     },
// //     Message: {
// //       Subject: {
// //         Data: subject,
// //         Charset: "UTF-8",
// //       },
// //       Body: {
// //         Html: {
// //           Data: html,
// //           Charset: "UTF-8",
// //         },
// //         ...(text
// //           ? {
// //               Text: {
// //                 Data: text,
// //                 Charset: "UTF-8",
// //               },
// //             }
// //           : {}),
// //       },
// //     },
// //   });

//   await ses.send(command);
// }