import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { PDFDocument } from "pdf-lib";
import { toast } from "sonner";
import { ToolLayout } from "@/components/ToolLayout";
import { UploadZone } from "@/components/UploadZone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { splitPdf } from "@/services/pdfService";
import { useRecentFiles } from "@/hooks/useRecentFiles";
import { Loader2, Scissors } from "lucide-react";

export const Route = createFileRoute("/split")({
  head: () => ({
    meta: [
      { title: "Split PDF — PDFKit" },
      { name: "description", content: "Extract a range of pages from a PDF in your browser." },
    ],
  }),
  component: SplitPage,
});

function SplitPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [pages, setPages] = useState<number | null>(null);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(1);
  const [busy, setBusy] = useState(false);
  const { add } = useRecentFiles();

  useEffect(() => {
    const file = files[0];
    if (!file) {
      setPages(null);
      return;
    }
    file.arrayBuffer().then(async (buf) => {
      try {
        const doc = await PDFDocument.load(buf);
        const count = doc.getPageCount();
        setPages(count);
        setStart(1);
        setEnd(count);
      } catch {
        toast.error("Could not read PDF.");
      }
    });
  }, [files]);

  const onSplit = async () => {
    const file = files[0];
    if (!file) return toast.error("Upload a PDF first.");
    setBusy(true);
    try {
      await splitPdf(file, start, end);
      add({ name: `split-${file.name}`, tool: "Split", size: file.size });
      toast.success("Split PDF downloaded.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to split.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <ToolLayout title="Split PDF" description="Extract a range of pages into a new PDF.">
      <UploadZone files={files} onChange={setFiles} multiple={false} hint="One PDF file" />
      {pages !== null && (
        <div className="mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
          <div>
            <Label htmlFor="start">From page</Label>
            <Input
              id="start"
              type="number"
              min={1}
              max={pages}
              value={start}
              onChange={(e) => setStart(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="end">To page</Label>
            <Input
              id="end"
              type="number"
              min={1}
              max={pages}
              value={end}
              onChange={(e) => setEnd(Number(e.target.value))}
            />
          </div>
          <p className="col-span-2 text-xs text-muted-foreground">Total pages: {pages}</p>
        </div>
      )}
      <div className="mt-6 flex justify-center">
        <Button size="lg" onClick={onSplit} disabled={busy || files.length === 0}>
          {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Scissors className="mr-2 h-4 w-4" />}
          Split & download
        </Button>
      </div>
    </ToolLayout>
  );
}
