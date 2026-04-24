import { Link } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";

interface Props {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function ToolLayout({ title, description, children }: Props) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ChevronLeft className="h-4 w-4" /> Back to tools
      </Link>
      <header className="mt-4 mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">{title}</h1>
        <p className="mt-2 text-base text-muted-foreground">{description}</p>
      </header>
      {children}
    </div>
  );
}
