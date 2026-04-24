import { jsx, jsxs } from 'react/jsx-runtime';
import { T as ToolLayout } from './ToolLayout-BMBRjXDg.mjs';
import { Construction } from 'lucide-react';
import '@tanstack/react-router';

function ConvertPage() {
  return /* @__PURE__ */ jsx(ToolLayout, { title: "Convert PDF", description: "High-quality PDF conversion is coming soon.", children: /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-dashed border-border bg-card p-12 text-center shadow-[var(--shadow-soft)]", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-accent text-accent-foreground", children: /* @__PURE__ */ jsx(Construction, { className: "h-7 w-7" }) }),
    /* @__PURE__ */ jsx("h2", { className: "text-xl font-semibold text-foreground", children: "Coming soon" }),
    /* @__PURE__ */ jsx("p", { className: "mx-auto mt-2 max-w-md text-sm text-muted-foreground", children: "PDF \u2192 Word, Excel, JPG and more will be available shortly. The architecture is ready to connect to a conversion API." })
  ] }) });
}

export { ConvertPage as component };
//# sourceMappingURL=convert-Cca7albR.mjs.map
