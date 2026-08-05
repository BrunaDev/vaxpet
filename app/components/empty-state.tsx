import type { LucideIcon } from "lucide-react";

export function EmptyState({ icon: Icon, title, description, children }: {
  icon: LucideIcon; title: string; description: string; children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-12 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-chip text-primary">
        <Icon className="h-7 w-7" />
      </span>
      <h3 className="mt-4 font-display text-xl">{title}</h3>
      <p className="mt-1.5 max-w-sm text-sm text-muted-foreground">{description}</p>
      {children && <div className="mt-5">{children}</div>}
    </div>
  );
}