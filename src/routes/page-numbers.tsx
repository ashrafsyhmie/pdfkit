import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ToolLayout } from "@/components/ToolLayout";
import { UploadZone } from "@/components/UploadZone";
import { Button } from "@/components/ui/button";
import { addPageNumbers } from "@/services/pdfService";
import { useRecentFiles } from "@/hooks/useRecentFiles";
import { Loader2, Hash } from "lucide-react";

export const Route = createFileRoute("/page-numbers")({
  head: () => ({
    meta: [
      { title: "Add Page Numbers to PDF — PDFKit" },
      { name: "description", content: "Add page numbers to every page of a PDF in your browser." },
    ],
  }),
  component: PageNumbersPage,
});

function PageNumbersPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [busy, setBusy] = useState(false);
  const { add } = useRecentFiles();

  const onRun = async () => {
    const file = files[0];
    if (!file) return toast.error("Upload a PDF first.");
    setBusy(true);
    try {
      await addPageNumbers(file, `numbered-${file.name}`);
      add({ name: `numbered-${file.name}`, tool: "Page numbers", size: file.size });
      toast.success("Numbered PDF downloaded.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to add page numbers.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <ToolLayout
      title="Add Page Numbers"
      description="Adds clean numbers (1 / N) to the bottom of every page."
    >
      <UploadZone files={files} onChange={setFiles} multiple={false} hint="One PDF file" />
      <div className="mt-6 flex justify-center">
        <Button size="lg" onClick={onRun} disabled={busy || files.length === 0}>
          {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Hash className="mr-2 h-4 w-4" />}
          Add numbers & download
        </Button>
      </div>
    </ToolLayout>
  );
}
