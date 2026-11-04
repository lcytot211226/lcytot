"use client";

// A plain white A4 resume built from the same dictionary data as /profile,
// so the PDF is always as up to date as the page.
// It's portalled to <body> and only shown when printing (see the print rules
// in globals.css), so "Save as PDF" in the print dialog produces the resume.

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Dictionary } from "@/lib/dictionaries";
import { GITHUB_URL } from "@/lib/links";

const ACCENT = "#4b6b63"; // muted grey-green for headings and organisations

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{ color: ACCENT, borderColor: "#d4d4d8" }}
      className="mb-3 mt-6 border-b pb-1 text-[14pt] font-semibold"
    >
      {children}
    </h2>
  );
}

// Small outline icon on a light tinted tile, shown before certificates and education.
function EntryIcon({ d }: { d: string }) {
  return (
    <span
      style={{ color: ACCENT, backgroundColor: "#eef2f0" }}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
    >
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
        <path d={d} />
      </svg>
    </span>
  );
}

const AWARD_ICON = "M12 3a5 5 0 1 0 0 10a5 5 0 1 0 0-10ZM8.5 12.5 7 21l5-2.5 5 2.5-1.5-8.5";
const GRAD_CAP_ICON = "m2 9 10-5 10 5-10 5-10-5Zm4 2.2V16c0 1.66 2.69 3 6 3s6-1.34 6-3v-4.8M22 9v6";

function Dates({ start, end }: { start: string; end: string }) {
  return (
    <span className="shrink-0 text-[10pt] tabular-nums text-zinc-500">
      {start} – {end}
    </span>
  );
}

function Resume({ profile }: { profile: Dictionary["profile"] }) {
  const github = GITHUB_URL.replace(/^https?:\/\//, "");
  return (
    <div className="text-[11pt] leading-normal text-zinc-800">
      <header>
        <h1 className="text-[22pt] font-bold leading-tight text-zinc-900">{profile.name}</h1>
        <p style={{ color: ACCENT }} className="mt-0.5 text-[12pt] font-medium">
          {profile.title}
        </p>
        <p className="mt-1 text-[10pt] text-zinc-600">
          {profile.email} · {github}
        </p>
        <p className="mt-3">{profile.about}</p>
      </header>

      <section>
        <Heading>{profile.skillsHeading}</Heading>
        <p>{profile.skills.join(" · ")}</p>
      </section>

      <section>
        <Heading>{profile.experienceHeading}</Heading>
        <div className="space-y-3.5">
          {profile.experience.map((e) => (
            <div key={`${e.org}-${e.role}`} className="break-inside-avoid">
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-semibold text-zinc-900">
                  {e.role} <span className="text-zinc-400">·</span>{" "}
                  <span style={{ color: ACCENT }}>{e.org}</span>
                </p>
                <Dates start={e.start} end={e.end} />
              </div>
              <ul className="mt-1.5 list-disc space-y-1 pl-5">
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Heading>{profile.certificatesHeading}</Heading>
        <div className="space-y-3.5">
          {profile.certificates.map((c) => (
            <div key={c.name} className="flex break-inside-avoid gap-3">
              <EntryIcon d={AWARD_ICON} />
              <div className="min-w-0">
                <p className="font-semibold text-zinc-900">
                  {c.name} <span className="text-zinc-400">·</span>{" "}
                  <span style={{ color: ACCENT }}>{c.issuer}</span>
                </p>
                <p>{c.note}</p>
                <p className="break-all text-[10pt] text-zinc-500 underline">{c.url}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Heading>{profile.educationHeading}</Heading>
        <div className="space-y-3.5">
          {profile.education.filter((e) => !e.hideInPdf).map((e) => (
            <div key={`${e.school}-${e.degree}`} className="flex break-inside-avoid gap-3">
              <EntryIcon d={GRAD_CAP_ICON} />
              <div className="flex min-w-0 flex-1 items-baseline justify-between gap-4">
                <div>
                  <p className="font-semibold text-zinc-900">{e.school}</p>
                  <p style={{ color: ACCENT }}>{e.degree}</p>
                </div>
                <Dates start={e.start} end={e.end} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default function PrintableResume({ profile }: { profile: Dictionary["profile"] }) {
  // Portal target only exists in the browser.
  const [mounted, setMounted] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  // Name the saved PDF after the resume while the print dialog is open.
  useEffect(() => {
    let prev = document.title;
    const before = () => {
      prev = document.title;
      document.title = profile.resumeTitle;
    };
    const after = () => {
      document.title = prev;
    };
    window.addEventListener("beforeprint", before);
    window.addEventListener("afterprint", after);
    return () => {
      window.removeEventListener("beforeprint", before);
      window.removeEventListener("afterprint", after);
    };
  }, [profile.resumeTitle]);

  if (!mounted) return null;
  return createPortal(
    <div id="print-resume" className="hidden print:block">
      <Resume profile={profile} />
    </div>,
    document.body,
  );
}
