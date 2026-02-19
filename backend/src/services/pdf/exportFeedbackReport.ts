import PDFDocument from "pdfkit";
import { GenerateFeedbackPdfInput } from "../../types/Pdf";

const formatDate = (date: Date) =>
  date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const ensureSpace = (doc: PDFKit.PDFDocument, needed: number) => {
    if (doc.y + needed > doc.page.height - 60) {
        doc.addPage();
    }
  };


export const generateFeedbackPdf = async (
  input: GenerateFeedbackPdfInput
): Promise<Buffer> => {
    
  return new Promise((resolve) => {
    
    const doc = new PDFDocument({
      margin: 50,
      bufferPages: true,
    });

    const buffers: Buffer[] = [];
    doc.on("data", buffers.push.bind(buffers));
    doc.on("end", () => {
      resolve(Buffer.concat(buffers));
    });

    const defaultLeft = doc.page.margins.left;
    const defaultWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
    //const leftMargin = 70;
    //const rightMargin = 70;
    //const usableWidth = doc.page.width - leftMargin - rightMargin;
    const indent = 20;

    // ----------------------------
    // HEADER
    // ----------------------------
    doc.font("Helvetica-Bold").fontSize(18).text(input.title);
    doc.moveDown(0.5);

    doc.font("Helvetica").fontSize(11).text(`Version ${input.version}`);
    doc.moveDown(0.25);

    doc.text(`Generated ${formatDate(input.generatedDate)}`);
    doc.moveDown(1);

    doc.moveTo(50, doc.y)
       .lineTo(doc.page.width - 50, doc.y)
       .stroke();
    doc.moveDown(1);

    // ----------------------------
    // SUMMARY
    // ----------------------------
    doc.font("Helvetica-Bold").fontSize(12).text("Feedback Summary");
    doc.moveDown(0.75);

    doc.font("Helvetica").fontSize(11);

    doc.text(`Total Comments: ${input.summary.totalComments}`);
    doc.moveDown(0.5);

    doc.text(`Unresolved: ${input.summary.unresolvedCount}`);
    doc.moveDown(0.5);

    doc.text(`Resolved: ${input.summary.resolvedCount}`);
    doc.moveDown(0.5);

    doc.text(`Reviewers: ${input.summary.reviewerCount}`);
    doc.moveDown(1);

    doc.moveTo(50, doc.y)
       .lineTo(doc.page.width - 50, doc.y)
       .stroke();
    doc.moveDown(1);

    // ----------------------------
    // COMMENTS SECTION
    // ----------------------------

    doc.font("Helvetica-Bold")
       .fontSize(12)
       .text("Comments (Ordered by Manuscript Flow)");
    doc.moveDown(1);

    input.comments.forEach((comment, index) => {
      // Ensure space before comment block

      ensureSpace(doc, 120);

      // Paragraph label
      doc.font("Helvetica-Bold")
         .fontSize(12)
         .text(`Paragraph ${comment.paragraphNumber}`, defaultLeft,doc.y, { underline: true, width: defaultWidth });

         doc.moveDown(0.5);
      
      // Targets
      comment.targets.forEach((target) => {
        doc.font("Helvetica-Oblique")
           .fontSize(11)
           .text(`“${target.excerpt}”`, {
             indent: indent,
           });
        doc.moveDown(1.0);
      });

      // Comment body
    //   doc.font("Helvetica")
    //      .fontSize(11)
    //      .text(comment.commentText, 
    //         {
    //             width: doc.page.width - 100,
    //         });
      doc.font("Helvetica")
         .fontSize(11)
         .text(comment.commentText, defaultLeft + indent, doc.y, {
            width: defaultWidth - indent * 2,
      });
     doc.moveDown(1.0);
     
     // Reviewer + Status
      doc.font("Helvetica")
        .fontSize(9)
        .fillColor("gray")
        .text(`${comment.reviewerName} · ${comment.isResolved ? "Resolved" : "Unresolved"}`, defaultLeft + indent, doc.y, {
            width: defaultWidth - indent * 2,
      });

      doc.fillColor("black");
      doc.fontSize(10);
 
      doc.moveDown(3);

      // Divider
        // if (index !== input.comments.length - 1) {
        // doc.moveTo(50, doc.y)
        //     .lineTo(doc.page.width - 50, doc.y)
        //     .stroke();
        // doc.moveDown(1);
        // }
    });

    // ----------------------------
    // APPENDIX
    // ----------------------------
    if (input.includeReviewerAppendix) {
      doc.addPage();

      doc.font("Helvetica-Bold")
         .fontSize(12)
         .text("Appendix: Comments by Reviewer");
      doc.moveDown(1);

      const grouped = new Map<string, typeof input.comments>();

      input.comments.forEach((c) => {
        if (!grouped.has(c.reviewerName)) {
          grouped.set(c.reviewerName, []);
        }
        grouped.get(c.reviewerName)!.push(c);
      });

      grouped.forEach((comments, reviewer) => {
        if (doc.y > doc.page.height - 120) {
          doc.addPage();
        }

        doc.font("Helvetica-Bold")
           .fontSize(11)
           .text(reviewer);
        doc.moveDown(0.5);

        doc.font("Helvetica").fontSize(10);

        comments.forEach((c) => {
          const preview =
            c.targets.length > 0
              ? c.targets[0].excerpt.split(" ").slice(0, 12).join(" ") +
                (c.targets[0].excerpt.split(" ").length > 12 ? "…" : "")
              : "";

          doc.text(
            `• Paragraph ${c.paragraphNumber} — ${preview}`
          );
          doc.moveDown(0.4);
        });

        doc.moveDown(1);
      });
    }

    // ----------------------------
    // PAGE NUMBERS
    // ----------------------------
    const pageRange = doc.bufferedPageRange();
    const pageCount = pageRange.count;

    for (let i = 0; i < pageCount; i++) {
    doc.switchToPage(i);

    doc.font("Helvetica");
    doc.fontSize(8);

    const footerText = `Page ${i + 1} of ${pageCount} · forWriters`;

    const textWidth = doc.widthOfString(footerText);
    const x = (doc.page.width - textWidth) / 2;
    const y = doc.page.height - 40;

    doc.text(footerText, x, y, {
        lineBreak: false,
    });
    }


    doc.end();
  });
};
