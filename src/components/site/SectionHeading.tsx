import { cn } from "@/lib/utils";

export function SectionHeading({
  index,
  label,
  className,
}: {
  index: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "hairline-t flex items-baseline justify-between gap-6 pt-4",
        className,
      )}
    >
      <span className="meta-label">{"\n"}</span>
      <span className="meta-label">{"\n"}</span>
    </div>
  );
}
