"use client";

import Image from "next/image";
import { useEffect } from "react";
import { useLang } from "@/context/lang-context";
import type { Project } from "@/lib/projects";

function Icon({ className, d }: { className: string; d: string }) {
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
      <path d={d} />
    </svg>
  );
}

const GITHUB_PATH =
  "M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.66.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z";

// App icon if the project has one, otherwise an outline server icon on a tinted tile.
export function ProjectIcon({ project, size }: { project: Project; size: number }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt=""
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className="shrink-0 rounded-xl"
      />
    );
  }
  return (
    <span
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600 dark:bg-sky-400/15 dark:text-sky-400"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: size * 0.45, height: size * 0.45 }}
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="7" rx="2" />
        <rect x="3" y="14" width="18" height="7" rx="2" />
        <path d="M7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6" />
      </svg>
    </span>
  );
}

export default function ProjectDialog({
  project,
  onClose,
}: {
  project: Project;
  onClose: () => void;
}) {
  const { dict } = useLang();
  const text = dict.projects[project.key];
  const labels = dict.projects.dialog;

  // Close on Escape and lock page scroll while open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-dialog-title"
        onClick={(e) => e.stopPropagation()}
        className="animate-fade-in-up relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl border border-zinc-900/10 bg-white p-6 shadow-xl dark:border-white/10 dark:bg-zinc-900"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={labels.close}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-900/5 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
        >
          <Icon className="h-4 w-4" d="M6 6l12 12M18 6L6 18" />
        </button>

        <div className="flex items-center gap-4 pr-8">
          <ProjectIcon project={project} size={56} />
          <div className="min-w-0">
            <h2
              id="project-dialog-title"
              className="text-xl font-semibold text-zinc-900 dark:text-white"
            >
              {text.title}
            </h2>
            <p className="mt-0.5 text-sm text-zinc-500 dark:text-zinc-400">
              {text.description}
            </p>
          </div>
        </div>

        <p className="mt-5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
          {text.detail}
        </p>

        {text.features && (
          <div className="mt-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {labels.features}
            </h3>
            <ul className="mt-2 space-y-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {text.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" d="M5 12l5 5L20 7" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <dl className="mt-5 space-y-3 text-sm">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {labels.tech}
            </dt>
            <dd className="mt-1.5 flex flex-wrap gap-1.5">
              {project.tech.map((name) => (
                <span
                  key={name}
                  className="rounded-full bg-zinc-900/5 px-2.5 py-1 text-xs font-medium text-zinc-700 dark:bg-white/10 dark:text-zinc-300"
                >
                  {name}
                </span>
              ))}
            </dd>
          </div>
          <div className="flex gap-6">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {labels.platform}
              </dt>
              <dd className="mt-1 text-zinc-700 dark:text-zinc-300">{text.platform}</dd>
            </div>
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
                {labels.signup}
              </dt>
              <dd className="mt-1 text-zinc-700 dark:text-zinc-300">{text.signup}</dd>
            </div>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap items-center justify-end gap-2">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mr-auto inline-flex items-center gap-1.5 rounded-full border border-zinc-900/10 px-3.5 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-900/5 dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/10"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
                <path d={GITHUB_PATH} />
              </svg>
              GitHub
            </a>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-4 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-900/5 dark:text-zinc-300 dark:hover:bg-white/10"
          >
            {labels.close}
          </button>
          {project.slug && (
            <a
              href={`/${project.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              {labels.visit}
              <Icon
                className="h-4 w-4"
                d="M14 5h5v5M19 5l-8 8M9 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
