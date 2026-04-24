import { PDFDocument, degrees, StandardFonts, rgb } from "pdf-lib";
import { saveAs } from "file-saver";

/** Read a File into an ArrayBuffer */
async function toArrayBuffer(file: File): Promise<ArrayBuffer> {
  return await file.arrayBuffer();
}

/** Merge multiple PDF files into a single document and save it. */
export async function mergePdfs(files: File[], outName = "merged.pdf"): Promise<void> {
  const merged = await PDFDocument.create();
  for (const file of files) {
    const bytes = await toArrayBuffer(file);
    const src = await PDFDocument.load(bytes);
    const pages = await merged.copyPages(src, src.getPageIndices());
    pages.forEach((p) => merged.addPage(p));
  }
  const out = await merged.save();
  saveAs(new Blob([out as BlobPart], { type: "application/pdf" }), outName);
}

/**
 * Split a PDF: extract pages [start, end] (1-indexed inclusive).
 * Returns nothing — triggers a download.
 */
export async function splitPdf(
  file: File,
  start: number,
  end: number,
  outName = "split.pdf"
): Promise<void> {
  const bytes = await toArrayBuffer(file);
  const src = await PDFDocument.load(bytes);
  const total = src.getPageCount();
  const from = Math.max(1, Math.min(start, total));
  const to = Math.max(from, Math.min(end, total));
  const out = await PDFDocument.create();
  const indices = Array.from({ length: to - from + 1 }, (_, i) => from - 1 + i);
  const pages = await out.copyPages(src, indices);
  pages.forEach((p) => out.addPage(p));
  const data = await out.save();
  saveAs(new Blob([data as BlobPart], { type: "application/pdf" }), outName);
}

/** "Compress" a PDF by re-saving with object streams. Real compression requires a backend. */
export async function compressPdf(file: File, outName = "compressed.pdf"): Promise<number> {
  const bytes = await toArrayBuffer(file);
  const src = await PDFDocument.load(bytes);
  const out = await src.save({ useObjectStreams: true });
  saveAs(new Blob([out as BlobPart], { type: "application/pdf" }), outName);
  return out.byteLength;
}

/** Rotate every page in a PDF by the given degrees (90, 180, 270). */
export async function rotatePdf(
  file: File,
  rotation: 90 | 180 | 270,
  outName = "rotated.pdf"
): Promise<void> {
  const bytes = await toArrayBuffer(file);
  const src = await PDFDocument.load(bytes);
  src.getPages().forEach((p) => {
    const current = p.getRotation().angle;
    p.setRotation(degrees((current + rotation) % 360));
  });
  const data = await src.save();
  saveAs(new Blob([data as BlobPart], { type: "application/pdf" }), outName);
}

/** Add page numbers to bottom-center of every page. */
export async function addPageNumbers(file: File, outName = "numbered.pdf"): Promise<void> {
  const bytes = await toArrayBuffer(file);
  const src = await PDFDocument.load(bytes);
  const font = await src.embedFont(StandardFonts.Helvetica);
  const pages = src.getPages();
  pages.forEach((page, idx) => {
    const { width } = page.getSize();
    const text = `${idx + 1} / ${pages.length}`;
    const size = 10;
    const textWidth = font.widthOfTextAtSize(text, size);
    page.drawText(text, {
      x: width / 2 - textWidth / 2,
      y: 20,
      size,
      font,
      color: rgb(0.3, 0.3, 0.3),
    });
  });
  const data = await src.save();
  saveAs(new Blob([data as BlobPart], { type: "application/pdf" }), outName);
}

/** Format bytes for display */
export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}
