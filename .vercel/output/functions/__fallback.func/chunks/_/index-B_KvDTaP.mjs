import { jsxs, jsx } from 'react/jsx-runtime';
import { Link } from '@tanstack/react-router';
import { Sparkles, Combine, Scissors, Minimize2, RotateCw, Hash, FileType, Trash2, ShieldCheck, Zap } from 'lucide-react';
import { B as Button } from './router-B5VEdezp.mjs';
import { u as useRecentFiles, f as formatBytes } from './useRecentFiles-BpCgjAOD.mjs';
import 'react';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'sonner';
import 'pdf-lib';
import 'file-saver';

function ToolCard({ to, title, description, icon: Icon, accent }) {
  return /* @__PURE__ */ jsxs(
    Link,
    {
      to,
      className: "group relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-elegant)]",
      children: [
        /* @__PURE__ */ jsx(
          "span",
          {
            className: "grid h-12 w-12 place-items-center rounded-xl text-primary-foreground transition-transform duration-300 group-hover:scale-110",
            style: { backgroundImage: accent ?? "var(--gradient-primary)" },
            children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6" })
          }
        ),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-base font-semibold text-foreground", children: title }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: description })
        ] })
      ]
    }
  );
}
const tools = [{
  to: "/merge",
  title: "Merge PDF",
  description: "Combine multiple PDFs into a single document.",
  icon: Combine
}, {
  to: "/split",
  title: "Split PDF",
  description: "Extract a range of pages into a new PDF.",
  icon: Scissors
}, {
  to: "/compress",
  title: "Compress PDF",
  description: "Reduce file size with smart optimization.",
  icon: Minimize2
}, {
  to: "/rotate",
  title: "Rotate PDF",
  description: "Rotate every page 90\xB0, 180\xB0 or 270\xB0.",
  icon: RotateCw
}, {
  to: "/page-numbers",
  title: "Page Numbers",
  description: "Add clean page numbers to every page.",
  icon: Hash
}, {
  to: "/convert",
  title: "Convert PDF",
  description: "Convert PDFs to other formats (coming soon).",
  icon: FileType
}];
function Home() {
  const {
    items,
    clear
  } = useRecentFiles();
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("section", { className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 -z-10 opacity-60", style: {
        backgroundImage: "var(--gradient-soft)"
      }, "aria-hidden": true }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28", children: [
        /* @__PURE__ */ jsxs("span", { className: "inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-[var(--shadow-soft)]", children: [
          /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5 text-primary" }),
          "Every tool you need to work with PDFs \u2014 in one place"
        ] }),
        /* @__PURE__ */ jsxs("h1", { className: "mt-6 text-4xl font-bold tracking-tight text-foreground sm:text-6xl", children: [
          "The fastest way to",
          " ",
          /* @__PURE__ */ jsx("span", { className: "bg-[image:var(--gradient-primary)] bg-clip-text text-transparent", children: "edit your PDFs" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mx-auto mt-5 max-w-2xl text-lg text-muted-foreground", children: "Merge, split, compress, rotate and number PDF files online. Fully client-side \u2014 your documents never leave your browser." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-8 flex flex-wrap items-center justify-center gap-3", children: [
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", className: "shadow-[var(--shadow-elegant)]", children: /* @__PURE__ */ jsx(Link, { to: "/merge", children: "Merge PDFs" }) }),
          /* @__PURE__ */ jsx(Button, { asChild: true, size: "lg", variant: "outline", children: /* @__PURE__ */ jsx(Link, { to: "/compress", children: "Compress a PDF" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("section", { className: "mx-auto max-w-7xl px-4 pb-16 sm:px-6", children: [
      /* @__PURE__ */ jsx("div", { className: "mb-8 flex items-end justify-between", children: /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold tracking-tight text-foreground", children: "All PDF tools" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Pick a tool to get started \u2014 no signup required." })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3", children: tools.map((t) => /* @__PURE__ */ jsx(ToolCard, { ...t }, t.to)) })
    ] }),
    items.length > 0 && /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-7xl px-4 pb-16 sm:px-6", children: /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxs("div", { className: "mb-4 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-semibold text-foreground", children: "Recent files" }),
        /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "ghost", onClick: clear, children: [
          /* @__PURE__ */ jsx(Trash2, { className: "mr-2 h-4 w-4" }),
          " Clear"
        ] })
      ] }),
      /* @__PURE__ */ jsx("ul", { className: "divide-y divide-border", children: items.map((it, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center justify-between py-3 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsx("p", { className: "truncate font-medium text-foreground", children: it.name }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
            it.tool,
            " \xB7 ",
            formatBytes(it.size)
          ] })
        ] }),
        /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: new Date(it.at).toLocaleString() })
      ] }, i)) })
    ] }) }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-7xl px-4 pb-20 sm:px-6", children: /* @__PURE__ */ jsx("div", { className: "grid gap-4 sm:grid-cols-3", children: [{
      icon: ShieldCheck,
      title: "Private by design",
      copy: "All processing runs in your browser. Files are never uploaded."
    }, {
      icon: Zap,
      title: "Instant results",
      copy: "Powered by pdf-lib for fast, in-memory transformations."
    }, {
      icon: Sparkles,
      title: "Beautifully simple",
      copy: "Clean interface, zero clutter, no account required."
    }].map(({
      icon: Icon,
      title,
      copy
    }) => /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6 text-primary" }),
      /* @__PURE__ */ jsx("h4", { className: "mt-3 font-semibold text-foreground", children: title }),
      /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: copy })
    ] }, title)) }) })
  ] });
}

export { Home as component };
//# sourceMappingURL=index-B_KvDTaP.mjs.map
