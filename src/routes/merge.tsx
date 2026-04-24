import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ToolLayout } from "@/components/ToolLayout";
import { UploadZone } from "@/components/UploadZone";
import { Button } from "@/components/ui/button";
import { mergePdfs } from "@/services/pdfService";
import { useRecentFiles } from "@/hooks/useRecentFiles";
import { Loader2, Combine } from "lucide-react";

export const Route = createFileRoute("/merge")({
  head: () => ({
    meta: [
      { title: "Merge PDF — PDFKit" },
      { name: "description", content: "Combine multiple PDF files into one in your browser." },
    ],
  }),
  component: MergePage,
});

function MergePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const { add } = useRecentFiles();

  const onMerge = async () => {
    if (files.length < 2) {
      toast.error("Select at least 2 PDFs to merge.");
      return;
    }
    setBusy(true);
    try {
      await mergePdfs(files);
      const total = files.reduce((s, f) => s + f.size, 0);
      add({ name: "merged.pdf", tool: "Merge", size: total });
      toast.success("Merged PDF downloaded.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to merge PDFs.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <ToolLayout title="Merge PDFs" description="Combine multiple PDFs into a single document.">
      <UploadZone files={files} onChange={setFiles} hint="Add 2 or more PDFs" />
      <div className="mt-6 flex justify-center">
        <Button size="lg" onClick={onMerge} disabled={busy || files.length < 2}>
          {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Combine className="mr-2 h-4 w-4" />}
          Merge & download
        </Button>
      </div>
    </ToolLayout>
  );
}
