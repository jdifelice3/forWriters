import PDFDocument from "pdfkit";

export const generateTestPdf = (res: any) => {
    const doc = new PDFDocument({ margin: 50 });
        
    doc.font("Helvetica");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename="test.pdf"`
    );

    doc.pipe(res);

    doc.fontSize(18).text("forWriters PDF Test");
    doc.moveDown();
    doc.fontSize(12).text("If you're reading this, PDF generation works.");

    doc.end();
};
