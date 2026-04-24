import { jsx, jsxs } from 'react/jsx-runtime';
import { createRouter, useRouter, createRootRoute, Link, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent } from '@tanstack/react-router';
import { FileText, Sun, Moon } from 'lucide-react';
import * as React from 'react';
import { useState, useEffect, createContext, useContext } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Toaster as Toaster$1 } from 'sonner';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const ThemeCtx = createContext({
  theme: "light",
  toggle: () => {
  }
});
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const stored = false;
    const initial = stored;
    setTheme(initial);
  }, []);
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    try {
      localStorage.setItem("pdfkit:theme", theme);
    } catch {
    }
  }, [theme]);
  const toggle = () => setTheme((t) => t === "dark" ? "light" : "dark");
  return /* @__PURE__ */ jsx(ThemeCtx.Provider, { value: { theme, toggle }, children });
}
const useTheme = () => useContext(ThemeCtx);
const links = [
  { to: "/merge", label: "Merge" },
  { to: "/split", label: "Split" },
  { to: "/compress", label: "Compress" },
  { to: "/rotate", label: "Rotate" },
  { to: "/page-numbers", label: "Page Numbers" },
  { to: "/convert", label: "Convert" }
];
function Navbar() {
  const { theme, toggle } = useTheme();
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur-md", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2 font-semibold", children: [
      /* @__PURE__ */ jsx("span", { className: "grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-primary)] text-primary-foreground shadow-[var(--shadow-elegant)]", children: /* @__PURE__ */ jsx(FileText, { className: "h-5 w-5" }) }),
      /* @__PURE__ */ jsx("span", { className: "text-lg tracking-tight", children: "PDFKit" })
    ] }),
    /* @__PURE__ */ jsx("nav", { className: "hidden items-center gap-1 md:flex", children: links.map((l) => /* @__PURE__ */ jsx(
      Link,
      {
        to: l.to,
        className: "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground",
        activeProps: { className: "text-foreground bg-accent" },
        children: l.label
      },
      l.to
    )) }),
    /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsx(Button, { variant: "ghost", size: "icon", onClick: toggle, "aria-label": "Toggle theme", children: theme === "dark" ? /* @__PURE__ */ jsx(Sun, { className: "h-5 w-5" }) : /* @__PURE__ */ jsx(Moon, { className: "h-5 w-5" }) }) })
  ] }) });
}
function Footer() {
  return /* @__PURE__ */ jsx("footer", { className: "border-t border-border/60 bg-background", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6", children: [
    /* @__PURE__ */ jsxs("p", { children: [
      "\xA9 ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " PDFKit \u2014 Online PDF Tools"
    ] }),
    /* @__PURE__ */ jsx("p", { children: "Built client-side with pdf-lib. Your files never leave your browser." })
  ] }) });
}
const Toaster = ({ ...props }) => {
  return /* @__PURE__ */ jsx(
    Toaster$1,
    {
      className: "toaster group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...props
    }
  );
};
const appCss = "/assets/styles-KpjlsRLh.css";
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
const Route$7 = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "PDFKit \u2014 Free Online PDF Tools" },
      {
        name: "description",
        content: "Merge, split, compress, rotate and edit PDF files online. 100% client-side \u2014 your files never leave your browser."
      },
      { property: "og:title", content: "PDFKit \u2014 Free Online PDF Tools" },
      {
        property: "og:description",
        content: "Merge, split, compress, rotate and edit PDF files online \u2014 fully in your browser."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" }
    ],
    links: [{ rel: "stylesheet", href: appCss }]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  return /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsxs("div", { className: "flex min-h-screen flex-col bg-background text-foreground", children: [
    /* @__PURE__ */ jsx(Navbar, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {}),
    /* @__PURE__ */ jsx(Toaster, { richColors: true, position: "top-right" })
  ] }) });
}
const $$splitComponentImporter$6 = () => import('./split-BdGYG11o.mjs');
const Route$6 = createFileRoute("/split")({
  head: () => ({
    meta: [{
      title: "Split PDF \u2014 PDFKit"
    }, {
      name: "description",
      content: "Extract a range of pages from a PDF in your browser."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import('./rotate-B3T91v7I.mjs');
const Route$5 = createFileRoute("/rotate")({
  head: () => ({
    meta: [{
      title: "Rotate PDF \u2014 PDFKit"
    }, {
      name: "description",
      content: "Rotate every page of a PDF 90\xB0, 180\xB0 or 270\xB0."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import('./page-numbers-DVQeKnuO.mjs');
const Route$4 = createFileRoute("/page-numbers")({
  head: () => ({
    meta: [{
      title: "Add Page Numbers to PDF \u2014 PDFKit"
    }, {
      name: "description",
      content: "Add page numbers to every page of a PDF in your browser."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import('./merge-DQWIKMCy.mjs');
const Route$3 = createFileRoute("/merge")({
  head: () => ({
    meta: [{
      title: "Merge PDF \u2014 PDFKit"
    }, {
      name: "description",
      content: "Combine multiple PDF files into one in your browser."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import('./convert-Cca7albR.mjs');
const Route$2 = createFileRoute("/convert")({
  head: () => ({
    meta: [{
      title: "Convert PDF \u2014 PDFKit"
    }, {
      name: "description",
      content: "Convert PDFs to other formats. Coming soon."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import('./compress-BrkxO5Gz.mjs');
const Route$1 = createFileRoute("/compress")({
  head: () => ({
    meta: [{
      title: "Compress PDF \u2014 PDFKit"
    }, {
      name: "description",
      content: "Reduce PDF file size with in-browser optimization."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import('./index-B_KvDTaP.mjs');
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "PDFKit \u2014 Free Online PDF Tools"
    }, {
      name: "description",
      content: "Merge, split, compress, rotate and edit PDFs entirely in your browser."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SplitRoute = Route$6.update({
  id: "/split",
  path: "/split",
  getParentRoute: () => Route$7
});
const RotateRoute = Route$5.update({
  id: "/rotate",
  path: "/rotate",
  getParentRoute: () => Route$7
});
const PageNumbersRoute = Route$4.update({
  id: "/page-numbers",
  path: "/page-numbers",
  getParentRoute: () => Route$7
});
const MergeRoute = Route$3.update({
  id: "/merge",
  path: "/merge",
  getParentRoute: () => Route$7
});
const ConvertRoute = Route$2.update({
  id: "/convert",
  path: "/convert",
  getParentRoute: () => Route$7
});
const CompressRoute = Route$1.update({
  id: "/compress",
  path: "/compress",
  getParentRoute: () => Route$7
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$7
});
const rootRouteChildren = {
  IndexRoute,
  CompressRoute,
  ConvertRoute,
  MergeRoute,
  PageNumbersRoute,
  RotateRoute,
  SplitRoute
};
const routeTree = Route$7._addFileChildren(rootRouteChildren)._addFileTypes();
function DefaultErrorComponent({ error, reset }) {
  const router2 = useRouter();
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10", children: /* @__PURE__ */ jsx(
      "svg",
      {
        xmlns: "http://www.w3.org/2000/svg",
        className: "h-8 w-8 text-destructive",
        fill: "none",
        viewBox: "0 0 24 24",
        stroke: "currentColor",
        strokeWidth: 2,
        children: /* @__PURE__ */ jsx(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
          }
        )
      }
    ) }),
    /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-tight text-foreground", children: "Something went wrong" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "An unexpected error occurred. Please try again." }),
    false,
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const getRouter = () => {
  const router2 = createRouter({
    routeTree,
    context: {},
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultErrorComponent: DefaultErrorComponent
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));

export { Button as B, cn as c, router as r };
//# sourceMappingURL=router-B5VEdezp.mjs.map
