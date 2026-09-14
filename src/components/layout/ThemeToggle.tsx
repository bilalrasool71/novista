"use client";

import { useEffect, useSyncExternalStore } from "react";
import { Monitor, Moon, Sun } from "lucide-react";

import {
  applyTheme,
  getThemePreference,
  getThemePreferenceOnServer,
  setThemePreference,
  subscribeToTheme,
  type ThemePreference,
} from "@/lib/theme";
import { cn } from "@/lib/utils";

/**
 * Theme control: one button that cycles light → dark → follow the system.
 *
 * A three-segment switch was the widest thing on the bar, which is too much
 * weight for a preference most people set once. The cycle keeps all three
 * states reachable in a single target; the label and title always name the
 * state it will move to, so nobody has to guess what the icon means.
 *
 * The initial theme is applied by an inline script in the root layout before
 * first paint, so there is never a flash of the wrong one. This component
 * only reflects and changes the stored preference.
 */
const ORDER: ThemePreference[] = ["light", "dark", "system"];

const META: Record<
  ThemePreference,
  { icon: typeof Sun; now: string; next: string }
> = {
  light: { icon: Sun, now: "Light", next: "dark" },
  dark: { icon: Moon, now: "Dark", next: "system" },
  system: { icon: Monitor, now: "System", next: "light" },
};

export function ThemeToggle({ className }: { className?: string }) {
  const preference = useSyncExternalStore(
    subscribeToTheme,
    getThemePreference,
    getThemePreferenceOnServer,
  );

  // Follow the OS while the preference is "system".
  useEffect(() => {
    if (preference !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyTheme("system");
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [preference]);

  const meta = META[preference];
  const label = `Theme: ${meta.now}. Switch to ${meta.next}.`;

  return (
    <button
      type="button"
      onClick={() =>
        setThemePreference(
          ORDER[(ORDER.indexOf(preference) + 1) % ORDER.length],
        )
      }
      aria-label={label}
      title={label}
      className={cn(
        "text-muted hover:text-ink hover:bg-surface-2 relative grid size-9 shrink-0 place-items-center rounded-full transition-colors duration-200",
        className,
      )}
    >
      {/* All three are mounted and cross-faded, so the swap has somewhere to
          animate from and the button never reflows. */}
      {ORDER.map((value) => {
        const Icon = META[value].icon;
        const active = value === preference;

        return (
          <Icon
            key={value}
            aria-hidden="true"
            className={cn(
              "absolute size-[1.05rem] transition-[opacity,transform] duration-300 ease-out",
              active
                ? "scale-100 rotate-0 opacity-100"
                : "scale-50 -rotate-90 opacity-0",
            )}
          />
        );
      })}
    </button>
  );
}
