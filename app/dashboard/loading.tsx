export default function DashboardLoading() {
  return (
    <div>
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="h-6 w-24 animate-pulse rounded bg-muted" />
          <div className="h-6 w-16 animate-pulse rounded bg-muted" />
        </div>
      </div>
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="mb-8 h-10 w-56 animate-pulse rounded-lg bg-muted" />
        <div className="mb-8 h-24 animate-pulse rounded-2xl bg-muted" />
        <div className="grid gap-4 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-20 animate-pulse rounded-2xl bg-muted" />)}
        </div>
      </div>
    </div>
  );
}