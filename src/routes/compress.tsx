import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ToolLayout } from "@/components/ToolLayout";
import { UploadZone } from "@/components/UploadZone";
import { Button } from "@/components/ui/button";
import { compressPdf, formatBytes } from "@/services/pdfService";
import { useRecentFiles } from "@/hooks/useRecentFiles";
import { Loader2, Minimize2 } from "lucide-react";

export const Route = createFileRoute("/compress")({
  head: () => ({
    meta: [
      { title: "Compress PDF — PDFKit" },
      { name: "description", content: "Reduce PDF file size with in-browser optimization." },
    ],
  }),
  component: CompressPage,
});

function CompressPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ before: number; after: number } | null>(null);
  const { add } = useRecentFiles();

  const onCompress = async () => {
    const file = files[0];
    if (!file) return toast.error("Upload a PDF first.");
    setBusy(true);
    try {
      const after = await compressPdf(file, `compressed-${file.name}`);
      setResult({ before: file.size, after });
      add({ name: `compressed-${file.name}`, tool: "Compress", size: after });
      toast.success("Compressed PDF downloaded.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to compress.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <ToolLayout
      title="Compress PDF"
      description="Reduce PDF size with object-stream optimization. Best results on uncompressed PDFs."
    >
      <UploadZone files={files} onChange={setFiles} multiple={false} hint="One PDF file" />
      <div className="mt-6 flex justify-center">
        <Button size="lg" onClick={onCompress} disabled={busy || files.length === 0}>
          {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Minimize2 className="mr-2 h-4 w-4" />}
          Compress & download
        </Button>
      </div>
      {result && (
        <div className="mt-6 rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--shadow-soft)]">
          <p className="text-sm text-muted-foreground">
            {formatBytes(result.before)} → <span className="font-semibold text-foreground">{formatBytes(result.after)}</span>
            {" "}
            ({Math.max(0, Math.round((1 - result.after / result.before) * 100))}% smaller)
          </p>
        </div>
      )}
    </ToolLayout>
  );
}
