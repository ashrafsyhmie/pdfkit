import { createFileRoute } from "@tanstack/react-router";
import { ToolLayout } from "@/components/ToolLayout";
import { Construction } from "lucide-react";

export const Route = createFileRoute("/convert")({
  head: () => ({
    meta: [
      { title: "Convert PDF — PDFKit" },
      { name: "description", content: "Convert PDFs to other formats. Coming soon." },
    ],
  }),
  component: ConvertPage,
});

function ConvertPage() {
  return (
    <ToolLayout
      title="Convert PDF"
      description="High-quality PDF conversion is coming soon."
    >
      <div className="rounded-2xl border border-dashed border-border bg-card p-12 text-center shadow-[var(--shadow-soft)]">
        <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-accent text-accent-foreground">
          <Construction className="h-7 w-7" />
        </div>
        <h2 className="text-xl font-semibold text-foreground">Coming soon</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          PDF → Word, Excel, JPG and more will be available shortly. The architecture is ready to
          connect to a conversion API.
        </p>
      </div>
    </ToolLayout>
  );
}
