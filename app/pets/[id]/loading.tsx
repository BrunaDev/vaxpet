export default function PetLoading() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="mb-8 flex items-center gap-4">
        <div className="h-16 w-16 animate-pulse rounded-full bg-muted" />
        <div className="space-y-2">
          <div className="h-8 w-40 animate-pulse rounded bg-muted" />
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />
        </div>
      </div>
      <div className="h-40 animate-pulse rounded-2xl bg-muted" />
      <div className="mt-6 grid gap-3">
        {Array.from({ length: 3 }).map((_, i) => <div key={i} className="h-20 animate-pulse rounded-2xl bg-muted" />)}
      </div>
    </div>
  );
}