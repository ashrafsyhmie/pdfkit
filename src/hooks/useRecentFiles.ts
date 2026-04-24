import { useEffect, useState } from "react";

export interface RecentFile {
  name: string;
  tool: string;
  size: number;
  at: number;
}

const KEY = "pdfkit:recent";
const MAX = 8;

export function useRecentFiles() {
  const [items, setItems] = useState<RecentFile[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
  }, []);

  const add = (entry: Omit<RecentFile, "at">) => {
    const next = [{ ...entry, at: Date.now() }, ...items].slice(0, MAX);
    setItems(next);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const clear = () => {
    setItems([]);
    try {
      localStorage.removeItem(KEY);
    } catch {
      // ignore
    }
  };

  return { items, add, clear };
}
