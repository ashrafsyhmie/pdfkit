import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";

interface Props {
  to: "/merge" | "/split" | "/compress" | "/rotate" | "/page-numbers" | "/convert";
  title: string;
  description: string;
  icon: LucideIcon;
  accent?: string;
}

export function ToolCard({ to, title, description, icon: Icon, accent }: Props) {
  return (
    <Link
      to={to}
      className="group relative flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[var(--shadow-elegant)]"
    >
      <span
        className="grid h-12 w-12 place-items-center rounded-xl text-primary-foreground transition-transform duration-300 group-hover:scale-110"
        style={{ backgroundImage: accent ?? "var(--gradient-primary)" }}
      >
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <h3 className="text-base font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}
