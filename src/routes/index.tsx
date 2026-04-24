import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Combine,
  Scissors,
  Minimize2,
  RotateCw,
  Hash,
  FileType,
  Sparkles,
  ShieldCheck,
  Zap,
  Trash2,
} from "lucide-react";
import { ToolCard } from "@/components/ToolCard";
import { Button } from "@/components/ui/button";
import { useRecentFiles } from "@/hooks/useRecentFiles";
import { formatBytes } from "@/services/pdfService";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PDFKit — Free Online PDF Tools" },
      {
        name: "description",
        content: "Merge, split, compress, rotate and edit PDFs entirely in your browser.",
      },
    ],
  }),
  component: Home,
});

const tools = [
  {
    to: "/merge" as const,
    title: "Merge PDF",
    description: "Combine multiple PDFs into a single document.",
    icon: Combine,
  },
  {
    to: "/split" as const,
    title: "Split PDF",
    description: "Extract a range of pages into a new PDF.",
    icon: Scissors,
  },
  {
    to: "/compress" as const,
    title: "Compress PDF",
    description: "Reduce file size with smart optimization.",
    icon: Minimize2,
  },
  {
    to: "/rotate" as const,
    title: "Rotate PDF",
    description: "Rotate every page 90°, 180° or 270°.",
    icon: RotateCw,
  },
  {
    to: "/page-numbers" as const,
    title: "Page Numbers",
    description: "Add clean page numbers to every page.",
    icon: Hash,
  },
  {
    to: "/convert" as const,
    title: "Convert PDF",
    description: "Convert PDFs to other formats (coming soon).",
    icon: FileType,
  },
];

function Home() {
  const { items, clear } = useRecentFiles();

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10 opacity-60"
          style={{ backgroundImage: "var(--gradient-soft)" }}
          aria-hidden
        />
        <div className="mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-[var(--shadow-soft)]">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Every tool you need to work with PDFs — in one place
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            The fastest way to{" "}
            <span className="bg-[image:var(--gradient-primary)] bg-clip-text text-transparent">
              edit your PDFs
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
            Merge, split, compress, rotate and number PDF files online. Fully client-side — your
            documents never leave your browser.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg" className="shadow-[var(--shadow-elegant)]">
              <Link to="/merge">Merge PDFs</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/compress">Compress a PDF</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Tools */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">All PDF tools</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Pick a tool to get started — no signup required.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => (
            <ToolCard key={t.to} {...t} />
          ))}
        </div>
      </section>

      {/* Recent */}
      {items.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Recent files</h3>
              <Button size="sm" variant="ghost" onClick={clear}>
                <Trash2 className="mr-2 h-4 w-4" /> Clear
              </Button>
            </div>
            <ul className="divide-y divide-border">
              {items.map((it, i) => (
                <li key={i} className="flex items-center justify-between py-3 text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-foreground">{it.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {it.tool} · {formatBytes(it.size)}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(it.at).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Why */}
      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            {
              icon: ShieldCheck,
              title: "Private by design",
              copy: "All processing runs in your browser. Files are never uploaded.",
            },
            {
              icon: Zap,
              title: "Instant results",
              copy: "Powered by pdf-lib for fast, in-memory transformations.",
            },
            {
              icon: Sparkles,
              title: "Beautifully simple",
              copy: "Clean interface, zero clutter, no account required.",
            },
          ].map(({ icon: Icon, title, copy }) => (
            <div
              key={title}
              className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]"
            >
              <Icon className="h-6 w-6 text-primary" />
              <h4 className="mt-3 font-semibold text-foreground">{title}</h4>
              <p className="mt-1 text-sm text-muted-foreground">{copy}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
