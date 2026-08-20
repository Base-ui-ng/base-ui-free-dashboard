// Base UI (free tier) — https://base-ui.net
// Free to use in unlimited projects. Do not redistribute this source as a library, kit, or template collection.
// Full license terms: https://github.com/Base-ui-ng/base-ui/blob/main/LICENSE.md

/** Collect focusable menu items inside a menu container. */
export function getMenuItems(container: ParentNode): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      '[role^="menuitem"]:not([aria-disabled="true"]):not([disabled])'
    )
  );
}

/** Move focus among menu items; returns the newly focused element. */
export function focusMenuItem(
  container: ParentNode,
  current: HTMLElement | null,
  delta: number
): HTMLElement | null {
  const items = getMenuItems(container);
  if (!items.length) return null;

  const index = current ? items.indexOf(current) : -1;
  const next = items[(index + delta + items.length) % items.length];
  next.focus();
  return next;
}

/** Focus first or last menu item. */
export function focusMenuItemEdge(
  container: ParentNode,
  edge: 'first' | 'last'
): HTMLElement | null {
  const items = getMenuItems(container);
  if (!items.length) return null;
  const target = edge === 'first' ? items[0] : items[items.length - 1];
  target.focus();
  return target;
}
