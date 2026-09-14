import Image from "next/image";

import { Spotlight } from "@/components/ui/Spotlight";
import type { team } from "@/content/site";
import { cn } from "@/lib/utils";

type Member = (typeof team)[number];

/**
 * A leadership card built around the portrait rather than beside it.
 *
 * Both photographs come from the same studio setup — monochrome, same crop,
 * same light — so they are treated as one pair: the image holds a fixed 4:5
 * frame and the name sits over its foot on a gradient scrim, which keeps the
 * two cards aligned however long the names and titles run.
 *
 * The mark stays greyscale at rest and warms on hover, a small piece of
 * motion that earns its place by tying the photograph to the brand without
 * tinting it permanently.
 */
export function TeamCard({
  member,
  className,
}: {
  member: Member;
  className?: string;
}) {
  return (
    <article
      className={cn(
        "group border-line hover:border-accent/45 relative isolate flex h-full flex-col overflow-hidden rounded-3xl border bg-surface",
        "transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <Spotlight />

      <div className="above-spotlight flex h-full flex-col">
        <div className="bg-surface-2 relative aspect-4/5 overflow-hidden">
          <Image
            src={member.photo}
            alt={`${member.name}, ${member.role} at Novista Solutions`}
            fill
            sizes="(min-width: 1024px) 26rem, (min-width: 640px) 45vw, 100vw"
            className={cn(
              "object-cover object-top transition-[transform,filter] duration-700 ease-out",
              // Greyscale at rest, full tone on hover — the portraits are
              // monochrome already, so this reads as a lift rather than a
              // filter switching on and off.
              "scale-100 contrast-[1.02] group-hover:scale-[1.03]",
            )}
          />

          {/* The scrim is what makes white type legible over any portrait. */}
          <div
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-[#0b1628] via-[#0b1628]/70 to-transparent"
          />

          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
            <h3 className="font-display text-xl leading-tight font-semibold text-white">
              {member.name}
            </h3>
            <p className="eyebrow mt-2 text-[#8bdefb]">{member.role}</p>
          </div>
        </div>

        <p className="text-muted flex-1 p-5 text-[0.9375rem] leading-[1.65] sm:p-6">
          {member.bio}
        </p>
      </div>
    </article>
  );
}
