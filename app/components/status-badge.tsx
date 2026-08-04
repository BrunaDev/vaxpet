import { getStatus, STATUS_META } from "@/lib/vaccine-status";

export function StatusBadge({ nextDueDate }: { nextDueDate: string | null }) {
  const status = getStatus(nextDueDate);
  if (!status) return null;
  const { label, classes } = STATUS_META[status];
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${classes}`}>
      {label}
    </span>
  );
}