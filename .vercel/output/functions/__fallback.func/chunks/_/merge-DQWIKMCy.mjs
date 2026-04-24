import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { toast } from 'sonner';
import { T as ToolLayout } from './ToolLayout-BMBRjXDg.mjs';
import { U as UploadZone } from './UploadZone-CnNnEVkf.mjs';
import { B as Button } from './router-B5VEdezp.mjs';
import { u as useRecentFiles, m as mergePdfs } from './useRecentFiles-BpCgjAOD.mjs';
import { Loader2, Combine } from 'lucide-react';
import '@tanstack/react-router';
import 'react-dropzone';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'pdf-lib';
import 'file-saver';

function MergePage() {
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const {
    add
  } = useRecentFiles();
  const onMerge = async () => {
    if (files.length < 2) {
      toast.error("Select at least 2 PDFs to merge.");
      return;
    }
    setBusy(true);
    try {
      await mergePdfs(files);
      const total = files.reduce((s, f) => s + f.size, 0);
      add({
        name: "merged.pdf",
        tool: "Merge",
        size: total
      });
      toast.success("Merged PDF downloaded.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to merge PDFs.");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxs(ToolLayout, { title: "Merge PDFs", description: "Combine multiple PDFs into a single document.", children: [
    /* @__PURE__ */ jsx(UploadZone, { files, onChange: setFiles, hint: "Add 2 or more PDFs" }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsxs(Button, { size: "lg", onClick: onMerge, disabled: busy || files.length < 2, children: [
      busy ? /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Combine, { className: "mr-2 h-4 w-4" }),
      "Merge & download"
    ] }) })
  ] });
}

export { MergePage as component };
//# sourceMappingURL=merge-DQWIKMCy.mjs.map
