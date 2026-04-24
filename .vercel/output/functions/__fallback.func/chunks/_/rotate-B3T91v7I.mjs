import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { toast } from 'sonner';
import { T as ToolLayout } from './ToolLayout-BMBRjXDg.mjs';
import { U as UploadZone } from './UploadZone-CnNnEVkf.mjs';
import { c as cn, B as Button } from './router-B5VEdezp.mjs';
import { u as useRecentFiles, r as rotatePdf } from './useRecentFiles-BpCgjAOD.mjs';
import { Loader2, RotateCw } from 'lucide-react';
import '@tanstack/react-router';
import 'react-dropzone';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'pdf-lib';
import 'file-saver';

function RotatePage() {
  const [files, setFiles] = useState([]);
  const [angle, setAngle] = useState(90);
  const [busy, setBusy] = useState(false);
  const {
    add
  } = useRecentFiles();
  const onRotate = async () => {
    const file = files[0];
    if (!file) return toast.error("Upload a PDF first.");
    setBusy(true);
    try {
      await rotatePdf(file, angle, `rotated-${file.name}`);
      add({
        name: `rotated-${file.name}`,
        tool: `Rotate ${angle}\xB0`,
        size: file.size
      });
      toast.success("Rotated PDF downloaded.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to rotate.");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxs(ToolLayout, { title: "Rotate PDF", description: "Rotate every page of your PDF.", children: [
    /* @__PURE__ */ jsx(UploadZone, { files, onChange: setFiles, multiple: false, hint: "One PDF file" }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-center gap-3", children: [90, 180, 270].map((a) => /* @__PURE__ */ jsxs("button", { onClick: () => setAngle(a), className: cn("rounded-xl border-2 px-6 py-4 text-sm font-medium transition-all", angle === a ? "border-primary bg-accent text-accent-foreground shadow-[var(--shadow-soft)]" : "border-border bg-card text-muted-foreground hover:border-primary/40"), children: [
      a,
      "\xB0"
    ] }, a)) }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsxs(Button, { size: "lg", onClick: onRotate, disabled: busy || files.length === 0, children: [
      busy ? /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(RotateCw, { className: "mr-2 h-4 w-4" }),
      "Rotate & download"
    ] }) })
  ] });
}

export { RotatePage as component };
//# sourceMappingURL=rotate-B3T91v7I.mjs.map
