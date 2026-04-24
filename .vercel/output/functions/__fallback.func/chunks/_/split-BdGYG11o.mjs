import { jsxs, jsx } from 'react/jsx-runtime';
import * as React from 'react';
import { useState, useEffect } from 'react';
import { PDFDocument } from 'pdf-lib';
import { toast } from 'sonner';
import { T as ToolLayout } from './ToolLayout-BMBRjXDg.mjs';
import { U as UploadZone } from './UploadZone-CnNnEVkf.mjs';
import { B as Button, c as cn } from './router-B5VEdezp.mjs';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';
import { u as useRecentFiles, s as splitPdf } from './useRecentFiles-BpCgjAOD.mjs';
import { Loader2, Scissors } from 'lucide-react';
import '@tanstack/react-router';
import 'react-dropzone';
import '@radix-ui/react-slot';
import 'clsx';
import 'tailwind-merge';
import 'file-saver';

const Input = React.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "input",
      {
        type,
        className: cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(LabelPrimitive.Root, { ref, className: cn(labelVariants(), className), ...props }));
Label.displayName = LabelPrimitive.Root.displayName;
function SplitPage() {
  const [files, setFiles] = useState([]);
  const [pages, setPages] = useState(null);
  const [start, setStart] = useState(1);
  const [end, setEnd] = useState(1);
  const [busy, setBusy] = useState(false);
  const {
    add
  } = useRecentFiles();
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
      add({
        name: `split-${file.name}`,
        tool: "Split",
        size: file.size
      });
      toast.success("Split PDF downloaded.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to split.");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxs(ToolLayout, { title: "Split PDF", description: "Extract a range of pages into a new PDF.", children: [
    /* @__PURE__ */ jsx(UploadZone, { files, onChange: setFiles, multiple: false, hint: "One PDF file" }),
    pages !== null && /* @__PURE__ */ jsxs("div", { className: "mt-6 grid grid-cols-2 gap-4 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "start", children: "From page" }),
        /* @__PURE__ */ jsx(Input, { id: "start", type: "number", min: 1, max: pages, value: start, onChange: (e) => setStart(Number(e.target.value)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Label, { htmlFor: "end", children: "To page" }),
        /* @__PURE__ */ jsx(Input, { id: "end", type: "number", min: 1, max: pages, value: end, onChange: (e) => setEnd(Number(e.target.value)) })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "col-span-2 text-xs text-muted-foreground", children: [
        "Total pages: ",
        pages
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsxs(Button, { size: "lg", onClick: onSplit, disabled: busy || files.length === 0, children: [
      busy ? /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Scissors, { className: "mr-2 h-4 w-4" }),
      "Split & download"
    ] }) })
  ] });
}

export { SplitPage as component };
//# sourceMappingURL=split-BdGYG11o.mjs.map
