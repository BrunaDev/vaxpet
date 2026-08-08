export default function PerfilLoading() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <div className="mb-8 h-10 w-32 animate-pulse rounded-lg bg-muted" />
      <div className="mb-6 h-24 animate-pulse rounded-2xl bg-muted" />
      <div className="mb-6 grid grid-cols-2 gap-4">
        <div className="h-20 animate-pulse rounded-2xl bg-muted" />
        <div className="h-20 animate-pulse rounded-2xl bg-muted" />
      </div>
      <div className="h-48 animate-pulse rounded-2xl bg-muted" />
    </div>
  );
}