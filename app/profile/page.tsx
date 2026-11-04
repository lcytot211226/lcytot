"use client";

import { useLang } from "@/context/lang-context";
import { GITHUB_URL } from "@/lib/links";
import PrintableResume from "./_components/PrintableResume";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.15-1.11-1.46-1.11-1.46-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.28.1-2.66 0 0 .84-.27 2.75 1.02a9.6 9.6 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.66.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 6h16v12H4V6Zm0 0 8 7 8-7"
      />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14 5h5v5M19 5l-8 8M9 5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3"
      />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16M12 21v-7a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v7M4 21h16M7 7h1M7 11h1M7 15h1M15 13h1M15 17h1"
      />
    </svg>
  );
}

function GraduationCapIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2 9 10-5 10 5-10 5-10-5Zm4 2.2V16c0 1.66 2.69 3 6 3s6-1.34 6-3v-4.8M22 9v6"
      />
    </svg>
  );
}

function AwardIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <circle cx="12" cy="8" r="5" stroke="currentColor" strokeWidth="2" />
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m8.5 12.5-1.5 8 5-2.5 5 2.5-1.5-8"
      />
    </svg>
  );
}

function DateRange({ start, end }: { start: string; end: string }) {
  return (
    <span className="flex shrink-0 items-baseline text-xs tabular-nums text-zinc-500 dark:text-zinc-500">
      <span className="inline-block w-15 text-center">{start}</span>
      <span className="px-1">—</span>
      <span className="inline-block w-15 text-center">{end}</span>
    </span>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-500">
      <span className="h-4 w-1 rounded-full bg-gradient-to-b from-indigo-500 to-fuchsia-500" />
      {children}
    </h2>
  );
}

const SKILL_COLORS = [
  "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300",
  "bg-fuchsia-50 text-fuchsia-700 dark:bg-fuchsia-500/10 dark:text-fuchsia-300",
  "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300",
  "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300",
  "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300",
];

export default function ProfilePage() {
  const { dict } = useLang();
  const { profile } = dict;

  return (
    <main className="flex flex-1 flex-col">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-zinc-900/10 bg-white dark:border-white/10 dark:bg-zinc-900">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 animate-float rounded-full bg-gradient-to-br from-indigo-400/30 to-fuchsia-400/30 blur-3xl" />
        <div
          className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 animate-float rounded-full bg-gradient-to-br from-sky-400/20 to-emerald-400/20 blur-3xl"
          style={{ animationDelay: "2s" }}
        />

        <div className="relative mx-auto flex max-w-3xl animate-fade-in-up flex-col gap-4 px-4 py-12 sm:px-6 sm:py-16">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl dark:text-white">
              {profile.name}
            </h1>
            <p className="mt-1 text-base font-medium text-indigo-600 dark:text-indigo-400">
              {profile.title}
            </p>
            <p className="mt-2 max-w-xl text-sm text-zinc-600 sm:text-base dark:text-zinc-400">
              {profile.tagline}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-900/10 px-3 py-1.5 text-sm text-zinc-700 transition-all hover:-translate-y-0.5 hover:bg-zinc-900/5 hover:shadow-sm dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/10"
            >
              <MailIcon /> {profile.email}
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-900/10 px-3 py-1.5 text-sm text-zinc-700 transition-all hover:-translate-y-0.5 hover:bg-zinc-900/5 hover:shadow-sm dark:border-white/10 dark:text-zinc-300 dark:hover:bg-white/10"
            >
              <GitHubIcon /> GitHub
            </a>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-10 sm:px-6 sm:py-12">
        {/* About */}
        <section
          className="mb-10 animate-fade-in-up"
          style={{ animationDelay: "80ms" }}
        >
          <SectionHeading>{profile.aboutHeading}</SectionHeading>
          <p className="text-sm leading-relaxed text-zinc-700 sm:text-base dark:text-zinc-300">
            {profile.about}
          </p>
        </section>

        {/* Skills */}
        <section
          className="mb-10 animate-fade-in-up"
          style={{ animationDelay: "160ms" }}
        >
          <SectionHeading>{profile.skillsHeading}</SectionHeading>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map((skill, i) => (
              <span
                key={skill}
                className={`rounded-full px-3 py-1 text-xs font-medium shadow-sm transition-transform hover:-translate-y-0.5 hover:scale-105 ${
                  SKILL_COLORS[i % SKILL_COLORS.length]
                }`}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section
          className="mb-10 animate-fade-in-up"
          style={{ animationDelay: "240ms" }}
        >
          <SectionHeading>{profile.experienceHeading}</SectionHeading>
          <ul className="space-y-4">
            {profile.experience.map((entry) => (
              <li
                key={`${entry.org}-${entry.role}`}
                className="group -mx-2 flex gap-4 rounded-xl p-2 transition-colors hover:bg-zinc-900/5 dark:hover:bg-white/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-700 to-zinc-900 text-white shadow-sm transition-transform duration-300 group-hover:scale-105 dark:from-zinc-200 dark:to-white dark:text-zinc-900">
                  <BuildingIcon />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                    <h3 className="text-sm font-semibold text-zinc-900 sm:text-base dark:text-white">
                      {entry.role} · {entry.org}
                    </h3>
                    <DateRange start={entry.start} end={entry.end} />
                  </div>
                  <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-zinc-600 dark:text-zinc-400">
                    {entry.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Certificates */}
        <section
          className="mb-10 animate-fade-in-up"
          style={{ animationDelay: "320ms" }}
        >
          <SectionHeading>{profile.certificatesHeading}</SectionHeading>
          <ul className="space-y-4">
            {profile.certificates.map((cert) => (
              <li
                key={cert.name}
                className="group -mx-2 flex gap-4 rounded-xl p-2 transition-colors hover:bg-zinc-900/5 dark:hover:bg-white/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <AwardIcon />
                </div>
                <div className="min-w-0 flex-1">
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-900 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-400"
                  >
                    {cert.name}
                    <ExternalLinkIcon />
                  </a>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {cert.issuer} · {cert.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Education */}
        <section
          className="animate-fade-in-up"
          style={{ animationDelay: "400ms" }}
        >
          <SectionHeading>{profile.educationHeading}</SectionHeading>
          <ul className="space-y-4">
            {profile.education.map((entry) => (
              <li
                key={`${entry.school}-${entry.degree}`}
                className="group -mx-2 flex gap-4 rounded-xl p-2 transition-colors hover:bg-zinc-900/5 dark:hover:bg-white/5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 text-white shadow-sm transition-transform duration-300 group-hover:scale-105">
                  <GraduationCapIcon />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 sm:text-base dark:text-white">
                      {entry.school}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      {entry.degree}
                    </p>
                  </div>
                  <DateRange start={entry.start} end={entry.end} />
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Download resume — prints the white PDF version built from this page */}
        <section className="mt-12 flex flex-col items-start gap-2 border-t border-zinc-900/10 pt-8 dark:border-white/10">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-zinc-700 hover:shadow-md dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            <DownloadIcon />
            {profile.resumeDownload}
          </button>
          <p className="text-xs text-zinc-500">{profile.resumeHint}</p>
        </section>
      </div>

      <PrintableResume profile={profile} />
    </main>
  );
}
