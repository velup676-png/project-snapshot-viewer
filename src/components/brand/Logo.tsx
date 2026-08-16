import { cn } from "@/lib/utils";

const mark = "/assets/brand/draftbin-mark.png";

type LogoProps = {
  className?: string;
  /** Show the wordmark text next to the mark (desktop lockup). */
  withWordmark?: boolean;
};

/**
 * The Draft Bin mark is used as supplied artwork (never re-typeset).
 * A transparent-background version is used so it sits on any ground.
 */
export function Logo({ className, withWordmark = false }: LogoProps) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <img
        src={mark}
        alt="Draft Bin"
        width={40}
        height={40}
        className="block h-7 w-auto select-none md:h-8"
        draggable={false}
      />
      {withWordmark ? (
        <span className="hidden text-[0.6875rem] font-medium tracking-[0.34em] text-meta uppercase sm:inline">
          Draft Bin
        </span>
      ) : null}
    </span>
  );
}
