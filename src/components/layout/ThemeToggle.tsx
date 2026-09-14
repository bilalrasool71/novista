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
 * Three-state theme control: light, dark, or follow the system.
 *
 * The initial theme is applied by an inline script in the root layout before
 * first paint, so there is never a flash of the wrong one. This component
 * only reflects and changes the stored preference.
 */
const OPTIONS: { value: ThemePreference; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "system", label: "System", icon: Monitor },
  { value: "dark", label: "Dark", icon: Moon },
];

export function ThemeToggle() {
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

  return (
    <div
      role="radiogroup"
      aria-label="Colour theme"
      className={cn(
        "inline-flex items-center gap-0.5 rounded-xl p-0.5 transition-colors duration-300",
        "bg-surface-2 border border-line",
      )}
    >
      {OPTIONS.map((option) => {
        const Icon = option.icon;
        const selected = preference === option.value;

        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            aria-label={`${option.label} theme`}
            title={`${option.label} theme`}
            onClick={() => setThemePreference(option.value)}
            className={cn(
              "grid size-8 place-items-center rounded-lg transition-colors duration-200",
              selected
                ? "bg-surface text-accent-2 card-elev"
                : "text-muted hover:text-ink",
            )}
          >
            <Icon aria-hidden="true" className="size-4" />
          </button>
        );
      })}
    </div>
  );
}
