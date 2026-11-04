// Single source of truth for every project shown on "/".
// Public projects get a route at app/<slug>/page.tsx (redirecting to the live app);
// private ones have no public URL. Text lives under `projects.<key>` in lib/dictionaries.ts.
export type ProjectKey = "accounting" | "motoLicense" | "deployPlatform";

export type Project = {
  key: ProjectKey;
  slug?: string; // public route; omit for private projects
  image?: string; // app icon in /public; omit to use the generic server icon
  tech: string[];
  github?: string;
};

export const projects: Project[] = [
  {
    key: "accounting",
    slug: "accounting",
    image: "/projects/accounting.png",
    tech: ["Next.js", "MongoDB"],
    github: "https://github.com/lcytot211226/subanote",
  },
  {
    key: "motoLicense",
    slug: "moto-license",
    image: "/projects/moto-license.png",
    tech: ["Python", "HTML", "MongoDB", "Web Push"],
    github: "https://github.com/lcytot211226/taiwan-scooter-license-notifier",
  },
];

export const privateProjects: Project[] = [
  {
    key: "deployPlatform",
    tech: ["Mac mini", "Cloudflare Tunnel", "PM2", "GitHub", "Discord"],
  },
];

export const SITE_REPO_URL = "https://github.com/lcytot211226/lcytot";
