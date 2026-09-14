/**
 * Theme preference store.
 *
 * The preference lives outside React because it is also read by the inline
 * script in the root layout before hydration. `useSyncExternalStore` then
 * reads it without a mount effect, which keeps the toggle correct under
 * concurrent rendering and avoids a setState-in-effect.
 */

export type ThemePreference = "light" | "dark" | "system";

export const THEME_STORAGE_KEY = "novista-theme";

const listeners = new Set<() => void>();

/** Cached so getSnapshot returns a stable value between changes. */
let cached: ThemePreference | null = null;

function read(): ThemePreference {
  try {
    const raw = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (raw === "light" || raw === "dark" || raw === "system") return raw;
  } catch {
    // Private mode or blocked storage — fall back to following the system.
  }
  return "system";
}

export function getThemePreference(): ThemePreference {
  if (cached === null) cached = read();
  return cached;
}

/** The server cannot know the preference, so it renders the neutral state. */
export function getThemePreferenceOnServer(): ThemePreference {
  return "system";
}

export function subscribeToTheme(listener: () => void) {
  listeners.add(listener);

  // Keep other tabs in sync.
  const onStorage = (event: StorageEvent) => {
    if (event.key === THEME_STORAGE_KEY) {
      cached = read();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Resolves a preference to a concrete theme and writes it to <html>. */
export function applyTheme(preference: ThemePreference) {
  const resolved =
    preference === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"
      : preference;

  document.documentElement.dataset.theme = resolved;
}

export function setThemePreference(preference: ThemePreference) {
  cached = preference;
  applyTheme(preference);

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // The preference simply will not persist; the page still switches.
  }

  for (const listener of listeners) listener();
}
