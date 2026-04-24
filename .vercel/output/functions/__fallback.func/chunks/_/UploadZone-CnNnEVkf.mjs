import { jsxs, jsx } from 'react/jsx-runtime';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, X } from 'lucide-react';
import { c as cn, B as Button } from './router-B5VEdezp.mjs';
import { f as formatBytes } from './useRecentFiles-BpCgjAOD.mjs';

function UploadZone({
  files,
  onChange,
  multiple = true,
  accept = { "application/pdf": [".pdf"] },
  hint = "PDF files only"
}) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept,
    multiple,
    onDrop: (accepted) => {
      const next = multiple ? [...files, ...accepted] : accepted.slice(0, 1);
      onChange(next);
    }
  });
  const remove = (idx) => onChange(files.filter((_, i) => i !== idx));
  return /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        ...getRootProps(),
        className: cn(
          "group relative cursor-pointer rounded-2xl border-2 border-dashed border-border bg-card p-10 text-center transition-all duration-300",
          "hover:border-primary hover:bg-accent/40 hover:shadow-[var(--shadow-soft)]",
          isDragActive && "scale-[1.01] border-primary bg-accent/60"
        ),
        children: [
          /* @__PURE__ */ jsx("input", { ...getInputProps() }),
          /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)] transition-transform duration-300 group-hover:scale-110", children: /* @__PURE__ */ jsx(UploadCloud, { className: "h-7 w-7" }) }),
          /* @__PURE__ */ jsx("p", { className: "text-base font-semibold text-foreground", children: isDragActive ? "Drop files here" : "Drag & drop or click to upload" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: hint })
        ]
      }
    ),
    files.length > 0 && /* @__PURE__ */ jsx("ul", { className: "space-y-2", children: files.map((file, idx) => /* @__PURE__ */ jsxs(
      "li",
      {
        className: "flex items-center gap-3 rounded-xl border border-border bg-card p-3 shadow-[var(--shadow-soft)]",
        children: [
          /* @__PURE__ */ jsx("span", { className: "grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent text-accent-foreground", children: /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsx("p", { className: "truncate text-sm font-medium text-foreground", children: file.name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: formatBytes(file.size) })
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              size: "icon",
              variant: "ghost",
              "aria-label": `Remove ${file.name}`,
              onClick: () => remove(idx),
              children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
            }
          )
        ]
      },
      `${file.name}-${idx}`
    )) })
  ] });
}

export { UploadZone as U };
//# sourceMappingURL=UploadZone-CnNnEVkf.mjs.map
