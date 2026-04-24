import { PDFDocument, degrees, StandardFonts, rgb } from 'pdf-lib';
import { saveAs } from 'file-saver';
import { useState, useEffect } from 'react';

async function toArrayBuffer(file) {
  return await file.arrayBuffer();
}
async function mergePdfs(files, outName = "merged.pdf") {
  const merged = await PDFDocument.create();
  for (const file of files) {
    const bytes = await toArrayBuffer(file);
    const src = await PDFDocument.load(bytes);
    const pages = await merged.copyPages(src, src.getPageIndices());
    pages.forEach((p) => merged.addPage(p));
  }
  const out = await merged.save();
  saveAs(new Blob([out], { type: "application/pdf" }), outName);
}
async function splitPdf(file, start, end, outName = "split.pdf") {
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
  saveAs(new Blob([data], { type: "application/pdf" }), outName);
}
async function compressPdf(file, outName = "compressed.pdf") {
  const bytes = await toArrayBuffer(file);
  const src = await PDFDocument.load(bytes);
  const out = await src.save({ useObjectStreams: true });
  saveAs(new Blob([out], { type: "application/pdf" }), outName);
  return out.byteLength;
}
async function rotatePdf(file, rotation, outName = "rotated.pdf") {
  const bytes = await toArrayBuffer(file);
  const src = await PDFDocument.load(bytes);
  src.getPages().forEach((p) => {
    const current = p.getRotation().angle;
    p.setRotation(degrees((current + rotation) % 360));
  });
  const data = await src.save();
  saveAs(new Blob([data], { type: "application/pdf" }), outName);
}
async function addPageNumbers(file, outName = "numbered.pdf") {
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
      color: rgb(0.3, 0.3, 0.3)
    });
  });
  const data = await src.save();
  saveAs(new Blob([data], { type: "application/pdf" }), outName);
}
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}
const KEY = "pdfkit:recent";
const MAX = 8;
function useRecentFiles() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
    }
  }, []);
  const add = (entry) => {
    const next = [{ ...entry, at: Date.now() }, ...items].slice(0, MAX);
    setItems(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
    }
  };
  const clear = () => {
    setItems([]);
    try {
      localStorage.removeItem(KEY);
    } catch {
    }
  };
  return { items, add, clear };
}

export { addPageNumbers as a, compressPdf as c, formatBytes as f, mergePdfs as m, rotatePdf as r, splitPdf as s, useRecentFiles as u };
//# sourceMappingURL=useRecentFiles-BpCgjAOD.mjs.map
