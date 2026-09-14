import Image from "next/image";

import { Spotlight } from "@/components/ui/Spotlight";
import type { team } from "@/content/site";
import { cn } from "@/lib/utils";

type Member = (typeof team)[number];

/**
 * A leadership card: portrait beside the words, not above them.
 *
 * Stacked, a 4:5 portrait across the full width of a card ran 546px tall and
 * took 63% of an 867px card — two photographs that size stop being portraits
 * and start being the page. Set alongside the text the same photograph holds
 * its presence at a fifth of the height, and two people fit in one column
 * that reads as a pair rather than as a gallery.
 *
 * Both images come from the same studio setup, so they keep a shared 4:5
 * frame and a fixed width: the two cards then line up exactly however long
 * the names and titles run.
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
        "group border-line hover:border-accent/45 relative isolate flex h-full flex-col overflow-hidden rounded-3xl border bg-surface p-5 sm:p-6",
        "transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <Spotlight />

      {/* `items-start`, or the row's default stretch overrides the portrait's
          aspect ratio and each photograph ends up a different height. */}
      <div className="above-spotlight flex flex-col items-start gap-5 sm:flex-row sm:gap-6">
        <div className="border-line bg-surface-2 relative aspect-4/5 w-32 shrink-0 overflow-hidden rounded-2xl border sm:w-36 lg:w-40">
          <Image
            src={member.photo}
            alt={`${member.name}, ${member.role} at Novista Solutions`}
            fill
            sizes="(min-width: 1024px) 10rem, (min-width: 640px) 9rem, 8rem"
            className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="eyebrow text-accent-2">{member.role}</p>
          <h3 className="font-display text-ink mt-2 text-xl leading-tight font-semibold sm:text-2xl">
            {member.name}
          </h3>
          <p className="text-muted mt-3.5 text-[0.9375rem] leading-[1.65]">
            {member.bio}
          </p>
        </div>
      </div>
    </article>
  );
}
