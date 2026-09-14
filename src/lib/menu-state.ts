/**
 * Whether the mobile menu is open.
 *
 * The header owns the menu and the floating actions have to get out of its
 * way, but they are siblings in the root layout rather than parent and child.
 * A three-function external store is enough to connect them — lighter than a
 * context provider, and `useSyncExternalStore` keeps it correct under
 * concurrent rendering.
 */

let menuOpen = false;
const listeners = new Set<() => void>();

export function setMenuOpen(value: boolean) {
  if (menuOpen === value) return;
  menuOpen = value;
  for (const listener of listeners) listener();
}

export function subscribeToMenu(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getMenuOpen() {
  return menuOpen;
}

/** The server has no menu state; it always renders the closed form. */
export function getMenuOpenOnServer() {
  return false;
}
