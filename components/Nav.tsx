"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useTheme } from "@/context/theme-context";
import { useLang } from "@/context/lang-context";
import Logo from "@/components/Logo";

// Shared look for every nav icon: stroke-only glyph on a soft tinted circle.
const iconButtonClass =
  "flex h-9 w-9 items-center justify-center rounded-full bg-zinc-900/5 text-zinc-700 transition-colors hover:bg-zinc-900/10 hover:text-zinc-900 dark:bg-white/10 dark:text-zinc-300 dark:hover:bg-white/20 dark:hover:text-white";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-[18px] w-[18px]"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function HomeIcon() {
  return (
    <Icon>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9v11h14V9" />
      <path d="M10 20v-6h4v6" />
    </Icon>
  );
}

function SunIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </Icon>
  );
}

function MoonIcon() {
  return (
    <Icon>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5Z" />
    </Icon>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title="Toggle theme"
      className={iconButtonClass}
    >
      <span
        className={`inline-flex transition-transform duration-500 ${
          theme === "dark" ? "rotate-180" : "rotate-0"
        }`}
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
      </span>
    </button>
  );
}

function LangToggle() {
  const { lang, setLang } = useLang();
  const next = lang === "en" ? "zh-TW" : "en";
  const label = next === "en" ? "Switch to English" : "切換為中文";
  return (
    <button
      type="button"
      onClick={() => setLang(next)}
      aria-label={label}
      title={label}
      className={iconButtonClass}
    >
      <span key={lang} className="animate-slide-down text-[13px] font-semibold leading-none">
        {lang === "en" ? "En" : "中"}
      </span>
    </button>
  );
}

export default function Nav() {
  const { t } = useLang();

  return (
    <header className="relative z-50">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          aria-label={t("nav.brand")}
          className="text-zinc-900 transition-opacity hover:opacity-70 dark:text-white"
        >
          <Logo />
        </Link>

        <nav className="flex items-center gap-2">
          <Link
            href="/"
            aria-label={t("nav.home")}
            title={t("nav.home")}
            className={iconButtonClass}
          >
            <HomeIcon />
          </Link>
          <LangToggle />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
