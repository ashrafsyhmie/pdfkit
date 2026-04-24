import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { toast } from 'sonner';
import { T as ToolLayout } from './ToolLayout-BMBRjXDg.mjs';
import { U as UploadZone } from './UploadZone-CnNnEVkf.mjs';
import { B as Button } from './router-B5VEdezp.mjs';
import { u as useRecentFiles, a as addPageNumbers } from './useRecentFiles-BpCgjAOD.mjs';
import { Loader2, Hash } from 'lucide-react';
import '@tanstack/react-router';
import 'react-dropzone';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'pdf-lib';
import 'file-saver';

function PageNumbersPage() {
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const {
    add
  } = useRecentFiles();
  const onRun = async () => {
    const file = files[0];
    if (!file) return toast.error("Upload a PDF first.");
    setBusy(true);
    try {
      await addPageNumbers(file, `numbered-${file.name}`);
      add({
        name: `numbered-${file.name}`,
        tool: "Page numbers",
        size: file.size
      });
      toast.success("Numbered PDF downloaded.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to add page numbers.");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxs(ToolLayout, { title: "Add Page Numbers", description: "Adds clean numbers (1 / N) to the bottom of every page.", children: [
    /* @__PURE__ */ jsx(UploadZone, { files, onChange: setFiles, multiple: false, hint: "One PDF file" }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsxs(Button, { size: "lg", onClick: onRun, disabled: busy || files.length === 0, children: [
      busy ? /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Hash, { className: "mr-2 h-4 w-4" }),
      "Add numbers & download"
    ] }) })
  ] });
}

export { PageNumbersPage as component };
//# sourceMappingURL=page-numbers-DVQeKnuO.mjs.map
