"use client";

import Link from "next/link";
import { useLang } from "@/context/lang-context";
import { useCallback, useState } from "react";
import { privateProjects, projects, SITE_REPO_URL } from "@/lib/projects";
import type { Project } from "@/lib/projects";
import ProjectDialog, { ProjectIcon } from "./_components/ProjectDialog";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.66.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function OutlineIcon({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function WaveIcon() {
  return (
    <OutlineIcon className="animate-wave inline-block h-7 w-7 text-amber-500 sm:h-8 sm:w-8">
      <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
      <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
      <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
      <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
    </OutlineIcon>
  );
}

function ProjectCard({
  project,
  onSelect,
}: {
  project: Project;
  onSelect: (p: Project) => void;
}) {
  const { t } = useLang();
  return (
    <button
      type="button"
      onClick={() => onSelect(project)}
      className="group flex items-center gap-4 rounded-2xl border border-zinc-900/10 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900"
    >
      <ProjectIcon project={project} size={44} />
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
          {t(`projects.${project.key}.title`)}
        </h3>
        <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
          {t(`projects.${project.key}.description`)}
        </p>
      </div>
      <OutlineIcon className="h-5 w-5 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </OutlineIcon>
    </button>
  );
}

export default function Home() {
  const { t } = useLang();
  const [selected, setSelected] = useState<Project | null>(null);
  const closeDialog = useCallback(() => setSelected(null), []);

  return (
    <main className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-5xl px-4 pb-10 pt-14 sm:px-6 sm:pt-20">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
          <span className="inline-flex items-center gap-2">
            {t("home.heroTitle")}
            <WaveIcon />
          </span>
        </h1>
        <p className="mt-3 max-w-2xl text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
          {t("home.heroSubtitle")}
        </p>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-10 sm:px-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
          {t("home.resumeHeading")}
        </h2>
        <Link
          href="/profile"
          className="group flex items-center gap-4 rounded-2xl border border-zinc-900/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-white/10 dark:bg-zinc-900"
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:bg-emerald-400/15 dark:text-emerald-400">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
              aria-hidden="true"
            >
              <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
              <path d="M14 3v5h5M9 13h6M9 17h4" />
            </svg>
          </span>
          <div className="min-w-0 flex-1">
            <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">
              {t("profile.name")}
            </h3>
            <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">
              {t("home.resumeDescription")}
            </p>
          </div>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-10 sm:px-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
          {t("home.projectsHeading")}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.key} project={project} onSelect={setSelected} />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-5xl px-4 pb-16 sm:px-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
          {t("home.privateHeading")}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {privateProjects.map((project) => (
            <ProjectCard key={project.key} project={project} onSelect={setSelected} />
          ))}
        </div>
      </section>

      <footer className="mx-auto w-full max-w-5xl px-4 pb-10 sm:px-6">
        <a
          href={SITE_REPO_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-white"
        >
          <GitHubIcon />
          {t("home.siteSource")}
        </a>
      </footer>

      {selected && <ProjectDialog project={selected} onClose={closeDialog} />}
    </main>
  );
}
