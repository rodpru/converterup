"use client";

import { PDFDocument } from "pdf-lib";

export type PdfPageFit = "fit-a4" | "native";

export interface PdfBuildOptions {
  quality?: number;
  pageFit?: PdfPageFit;
}

const A4_WIDTH_PT = 595.28;
const A4_HEIGHT_PT = 841.89;
const A4_MARGIN_PT = 24;

async function canvasToJpegBytes(
  canvas: HTMLCanvasElement,
  quality: number,
): Promise<Uint8Array> {
  const blob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob(resolve, "image/jpeg", quality);
  });
  if (!blob) throw new Error("Failed to encode canvas to JPEG");
  return new Uint8Array(await blob.arrayBuffer());
}

export async function canvasesToPdf(
  canvases: HTMLCanvasElement[],
  options: PdfBuildOptions = {},
): Promise<Blob> {
  if (canvases.length === 0) {
    throw new Error("No images provided");
  }

  const quality = options.quality ?? 0.9;
  const pageFit: PdfPageFit = options.pageFit ?? "fit-a4";

  const pdfDoc = await PDFDocument.create();

  for (const canvas of canvases) {
    const jpegBytes = await canvasToJpegBytes(canvas, quality);
    const jpegImage = await pdfDoc.embedJpg(jpegBytes);

    let pageWidth: number;
    let pageHeight: number;
    let drawWidth: number;
    let drawHeight: number;
    let drawX: number;
    let drawY: number;

    if (pageFit === "native") {
      pageWidth = canvas.width;
      pageHeight = canvas.height;
      drawWidth = pageWidth;
      drawHeight = pageHeight;
      drawX = 0;
      drawY = 0;
    } else {
      const isLandscape = canvas.width > canvas.height;
      pageWidth = isLandscape ? A4_HEIGHT_PT : A4_WIDTH_PT;
      pageHeight = isLandscape ? A4_WIDTH_PT : A4_HEIGHT_PT;

      const availW = pageWidth - 2 * A4_MARGIN_PT;
      const availH = pageHeight - 2 * A4_MARGIN_PT;
      const scale = Math.min(availW / canvas.width, availH / canvas.height);
      drawWidth = canvas.width * scale;
      drawHeight = canvas.height * scale;
      drawX = (pageWidth - drawWidth) / 2;
      drawY = (pageHeight - drawHeight) / 2;
    }

    const page = pdfDoc.addPage([pageWidth, pageHeight]);
    page.drawImage(jpegImage, {
      x: drawX,
      y: drawY,
      width: drawWidth,
      height: drawHeight,
    });
  }

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes as BlobPart], { type: "application/pdf" });
}
