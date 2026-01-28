"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

// Simple store to track if we're mounted (client-side)
const emptySubscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export function ThemeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  
  // This is the hydration-safe way to check if mounted
  const mounted = useSyncExternalStore(
    emptySubscribe,
    getClientSnapshot,
    getServerSnapshot
  );

  if (!mounted) {
    return (
      <button
        className="w-10 h-10 flex items-center justify-center rounded-xl border border-border text-muted-foreground"
        aria-label="Toggle theme"
      >
        <div className="w-5 h-5 bg-muted animate-pulse rounded-full" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="w-10 h-10 flex items-center justify-center rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all group"
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      title={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {isDark ? (
        <Sun size={18} className="group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <Moon size={18} className="group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
}
