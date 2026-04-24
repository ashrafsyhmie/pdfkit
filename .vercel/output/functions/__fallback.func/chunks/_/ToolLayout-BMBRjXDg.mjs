import { jsxs, jsx } from 'react/jsx-runtime';
import { Link } from '@tanstack/react-router';
import { ChevronLeft } from 'lucide-react';

function ToolLayout({ title, description, children }) {
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14", children: [
    /* @__PURE__ */ jsxs(
      Link,
      {
        to: "/",
        className: "inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground",
        children: [
          /* @__PURE__ */ jsx(ChevronLeft, { className: "h-4 w-4" }),
          " Back to tools"
        ]
      }
    ),
    /* @__PURE__ */ jsxs("header", { className: "mt-4 mb-8 text-center", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-bold tracking-tight text-foreground sm:text-4xl", children: title }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-base text-muted-foreground", children: description })
    ] }),
    children
  ] });
}

export { ToolLayout as T };
//# sourceMappingURL=ToolLayout-BMBRjXDg.mjs.map
