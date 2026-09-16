export default function  ValueBadge({
  value,
  type,
}: {
  value: string | null;
  type: "old" | "new";
}) {
  if (!value) {
    return <span className="text-muted-foreground">—</span>;
  }

  return (
    <span
      className={[
        "inline-flex max-w-[180px] items-center rounded-md border px-2 py-1",
        "text-xs font-medium",
        type === "new"
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-muted bg-muted/40 text-muted-foreground",
      ].join(" ")}
    >
      <span className="truncate">{value}</span>
    </span>
  );
}