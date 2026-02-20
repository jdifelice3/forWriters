import PDFDocument from "pdfkit";
import { GenerateFeedbackPdfInput } from "../../types/Pdf";
import { extractCategorizedThemes } from "../../services/pdf/themeAnalysis";

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
    const indent = 20;

    // ----------------------------
    // HEADER
    // ----------------------------
    doc.font("Helvetica-Bold").fontSize(18).text(input.title);
    doc.moveDown(0.5);

    doc.font("Helvetica").fontSize(11).text(`Version ${input.version}`);
    doc.moveDown(0.25);

    doc.text(`Generated ${formatDate(input.generatedDate)}`);
    doc.moveDown(2);

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
    doc.moveDown(2);

    doc.moveTo(50, doc.y)
       .lineTo(doc.page.width - 50, doc.y)
       .stroke();
    doc.moveDown(1);

// ----------------------------
// THEMES
// ----------------------------
const themes = extractCategorizedThemes(
  input.comments.map(c => c.commentText), 5
);
if (themes.length > 0) {
  doc.font("Helvetica-Bold")
     .fontSize(12)
     .text("Recurring Feedback Themes");
  doc.moveDown(0.75);

  const grouped = {
    character: [] as typeof themes,
    craft: [] as typeof themes,
    thematic: [] as typeof themes
  };

  themes.forEach(t => grouped[t.category].push(t));

  const renderCategory = (title: string, items: typeof themes) => {
    if (items.length === 0) return;

    doc.font("Helvetica-Bold")
       .fontSize(11)
       .text(title);
    doc.moveDown(0.5);

    doc.font("Helvetica")
       .fontSize(10);

    items.forEach(t => {
      doc.text(`• ${t.phrase} — mentioned ${t.count} time${t.count === 1 ? "" : "s"}`);
      doc.moveDown(0.25);
    });

    doc.moveDown(0.75);
  };

  renderCategory("Character & Psychology", grouped.character);
  renderCategory("Craft & Structure", grouped.craft);
  renderCategory("Thematic & Conceptual", grouped.thematic);

  doc.moveDown(1);

  doc.moveTo(50, doc.y)
     .lineTo(doc.page.width - 50, doc.y)
     .stroke();
  doc.moveDown(1);
}

// ----------------------------
// COMMENTS SECTION (Grouped by Paragraph)
// ----------------------------

doc.font("Helvetica-Bold")
   .fontSize(12)
   .text("Comments (Ordered by Manuscript Flow)");
doc.moveDown(1);

// Group by paragraph
const groupedByParagraph = new Map<number, typeof input.comments>();

input.comments.forEach((c) => {
  if (!groupedByParagraph.has(c.paragraphNumber)) {
    groupedByParagraph.set(c.paragraphNumber, []);
  }
  groupedByParagraph.get(c.paragraphNumber)!.push(c);
});

// Sort numerically
const sortedParagraphs = Array.from(groupedByParagraph.keys())
  .sort((a, b) => a - b);

sortedParagraphs.forEach((paragraphNumber) => {
  const comments = groupedByParagraph.get(paragraphNumber)!;

  ensureSpace(doc, 120);

  // Paragraph Header
  doc.font("Helvetica-Bold")
     .fontSize(12)
     .text(
       `Paragraph ${paragraphNumber}`,
       defaultLeft,
       doc.y,
       { underline: true, width: defaultWidth }
     );

  doc.moveDown(0.75);

  // Render each comment with its own target(s)
  comments.forEach((comment) => {

    // Targets for THIS comment
    comment.targets.forEach((target) => {
      doc.font("Helvetica-Oblique")
         .fontSize(11)
         .text(`“${target.excerpt}”`, defaultLeft, doc.y, {
           indent: indent, width: defaultWidth
         });

      doc.moveDown(0.75);
    });

    // Comment text
    doc.font("Helvetica")
       .fontSize(11)
       .text(
         comment.commentText,
         defaultLeft + indent,
         doc.y,
         { width: defaultWidth - indent * 2 }
       );

    doc.moveDown(0.5);

    // Reviewer + Status
    doc.font("Helvetica")
       .fontSize(9)
       .fillColor("gray")
       .text(
         `${comment.reviewerName} · ${
           comment.isResolved ? "Resolved" : "Unresolved"
         }`,
         defaultLeft + indent,
         doc.y,
         { width: defaultWidth - indent * 2 }
       );

    doc.fillColor("black");
    doc.moveDown(1.5);
  });

  doc.moveDown(1.5);
});



// ----------------------------
// APPENDIX (Grouped by Reviewer → Paragraph)
// ----------------------------
if (input.includeReviewerAppendix) {
  doc.addPage();

  doc.font("Helvetica-Bold")
     .fontSize(12)
     .text("Appendix: Comments by Reviewer");
  doc.moveDown(1);

  const groupedByReviewer = new Map<string, typeof input.comments>();

  input.comments.forEach((c) => {
    if (!groupedByReviewer.has(c.reviewerName)) {
      groupedByReviewer.set(c.reviewerName, []);
    }
    groupedByReviewer.get(c.reviewerName)!.push(c);
  });

  const reviewers = Array.from(groupedByReviewer.keys()).sort();

  reviewers.forEach((reviewer) => {
    const reviewerComments = groupedByReviewer.get(reviewer)!;

    if (doc.y > doc.page.height - 120) {
      doc.addPage();
    }

    doc.font("Helvetica-Bold")
       .fontSize(11)
       .text(`${reviewer} (${reviewerComments.length} comments)`, defaultLeft, doc.y, {width: defaultWidth});
    doc.moveDown(1);

    // Group by paragraph for this reviewer
    const groupedByParagraphForReviewer =
      new Map<number, typeof reviewerComments>();

    reviewerComments.forEach((c) => {
      if (!groupedByParagraphForReviewer.has(c.paragraphNumber)) {
        groupedByParagraphForReviewer.set(c.paragraphNumber, []);
      }
      groupedByParagraphForReviewer
        .get(c.paragraphNumber)!
        .push(c);
    });

    const sortedParagraphsForReviewer =
      Array.from(groupedByParagraphForReviewer.keys())
        .sort((a, b) => a - b);

    sortedParagraphsForReviewer.forEach((paragraphNumber) => {
      doc.font("Helvetica-Bold")
         .fontSize(10)
         .text(`Paragraph ${paragraphNumber}`, defaultLeft, doc.y, {width: defaultWidth});
      doc.moveDown(0.5);

      groupedByParagraphForReviewer
        .get(paragraphNumber)!
        .forEach((c) => {
          doc.font("Helvetica")
             .fontSize(10)
             .text(
               `• ${c.commentText}`,
               defaultLeft + indent,
               doc.y,
               { width: defaultWidth - indent * 2 }
             );
          doc.moveDown(0.5);
        });

      doc.moveDown(1);
    });

    doc.moveDown(1.5);
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
