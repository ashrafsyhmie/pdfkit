import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { ToolLayout } from "@/components/ToolLayout";
import { UploadZone } from "@/components/UploadZone";
import { Button } from "@/components/ui/button";
import { rotatePdf } from "@/services/pdfService";
import { useRecentFiles } from "@/hooks/useRecentFiles";
import { Loader2, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/rotate")({
  head: () => ({
    meta: [
      { title: "Rotate PDF — PDFKit" },
      { name: "description", content: "Rotate every page of a PDF 90°, 180° or 270°." },
    ],
  }),
  component: RotatePage,
});

function RotatePage() {
  const [files, setFiles] = useState<File[]>([]);
  const [angle, setAngle] = useState<90 | 180 | 270>(90);
  const [busy, setBusy] = useState(false);
  const { add } = useRecentFiles();

  const onRotate = async () => {
    const file = files[0];
    if (!file) return toast.error("Upload a PDF first.");
    setBusy(true);
    try {
      await rotatePdf(file, angle, `rotated-${file.name}`);
      add({ name: `rotated-${file.name}`, tool: `Rotate ${angle}°`, size: file.size });
      toast.success("Rotated PDF downloaded.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to rotate.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <ToolLayout title="Rotate PDF" description="Rotate every page of your PDF.">
      <UploadZone files={files} onChange={setFiles} multiple={false} hint="One PDF file" />
      <div className="mt-6 flex justify-center gap-3">
        {[90, 180, 270].map((a) => (
          <button
            key={a}
            onClick={() => setAngle(a as 90 | 180 | 270)}
            className={cn(
              "rounded-xl border-2 px-6 py-4 text-sm font-medium transition-all",
              angle === a
                ? "border-primary bg-accent text-accent-foreground shadow-[var(--shadow-soft)]"
                : "border-border bg-card text-muted-foreground hover:border-primary/40"
            )}
          >
            {a}°
          </button>
        ))}
      </div>
      <div className="mt-6 flex justify-center">
        <Button size="lg" onClick={onRotate} disabled={busy || files.length === 0}>
          {busy ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RotateCw className="mr-2 h-4 w-4" />}
          Rotate & download
        </Button>
      </div>
    </ToolLayout>
  );
}
