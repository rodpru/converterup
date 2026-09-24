"use client";

import { useEffect, useState } from "react";

/**
 * Read a query param after mount. Unlike `useSearchParams`, this does not
 * force a client-side-rendering bailout, so statically generated pages keep
 * their full HTML (H1, tool UI) for crawlers.
 */
export function useQueryParam(name: string): string | null {
  const [value, setValue] = useState<string | null>(null);
  useEffect(() => {
    setValue(new URLSearchParams(window.location.search).get(name));
  }, [name]);
  return value;
}
