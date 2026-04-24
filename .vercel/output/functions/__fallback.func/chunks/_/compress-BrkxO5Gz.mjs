import { jsxs, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { toast } from 'sonner';
import { T as ToolLayout } from './ToolLayout-BMBRjXDg.mjs';
import { U as UploadZone } from './UploadZone-CnNnEVkf.mjs';
import { B as Button } from './router-B5VEdezp.mjs';
import { u as useRecentFiles, f as formatBytes, c as compressPdf } from './useRecentFiles-BpCgjAOD.mjs';
import { Loader2, Minimize2 } from 'lucide-react';
import '@tanstack/react-router';
import 'react-dropzone';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'pdf-lib';
import 'file-saver';

function CompressPage() {
  const [files, setFiles] = useState([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);
  const {
    add
  } = useRecentFiles();
  const onCompress = async () => {
    const file = files[0];
    if (!file) return toast.error("Upload a PDF first.");
    setBusy(true);
    try {
      const after = await compressPdf(file, `compressed-${file.name}`);
      setResult({
        before: file.size,
        after
      });
      add({
        name: `compressed-${file.name}`,
        tool: "Compress",
        size: after
      });
      toast.success("Compressed PDF downloaded.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to compress.");
    } finally {
      setBusy(false);
    }
  };
  return /* @__PURE__ */ jsxs(ToolLayout, { title: "Compress PDF", description: "Reduce PDF size with object-stream optimization. Best results on uncompressed PDFs.", children: [
    /* @__PURE__ */ jsx(UploadZone, { files, onChange: setFiles, multiple: false, hint: "One PDF file" }),
    /* @__PURE__ */ jsx("div", { className: "mt-6 flex justify-center", children: /* @__PURE__ */ jsxs(Button, { size: "lg", onClick: onCompress, disabled: busy || files.length === 0, children: [
      busy ? /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsx(Minimize2, { className: "mr-2 h-4 w-4" }),
      "Compress & download"
    ] }) }),
    result && /* @__PURE__ */ jsx("div", { className: "mt-6 rounded-2xl border border-border bg-card p-6 text-center shadow-[var(--shadow-soft)]", children: /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
      formatBytes(result.before),
      " \u2192 ",
      /* @__PURE__ */ jsx("span", { className: "font-semibold text-foreground", children: formatBytes(result.after) }),
      " ",
      "(",
      Math.max(0, Math.round((1 - result.after / result.before) * 100)),
      "% smaller)"
    ] }) })
  ] });
}

export { CompressPage as component };
//# sourceMappingURL=compress-BrkxO5Gz.mjs.map
