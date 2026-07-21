import { PDFDocument, rgb } from "pdf-lib";

interface PdfOptions {
  content: string;
  fileName: string;
}

export async function savePdf({ content, fileName }: PdfOptions): Promise<Uint8Array> {
  try {
    const pdfDoc = await PDFDocument.create();

    // Split content into pages (simple approach)
    const lines = content.split("\n");
    const chunks = chunkArray(lines, 50); // 50 lines per page

    for (const chunk of chunks) {
      const page = pdfDoc.addPage([612, 792]); // Standard letter size
      const { height } = page.getSize();

      let yPosition = height - 50;
      const fontSize = 11;

      for (const line of chunk) {
        if (yPosition < 50) break;

        page.drawText(line, {
          x: 50,
          y: yPosition,
          size: fontSize,
          color: rgb(0, 0, 0),
        });

        yPosition -= fontSize + 4;
      }
    }

    const pdfBytes = await pdfDoc.save();
    return pdfBytes; // Uint8Array from pdf-lib
  } catch (error) {
    console.error("Failed to generate PDF:", error);
    throw error;
  }
}

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}