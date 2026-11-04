export type ExperienceEntry = {
  role: string;
  org: string;
  start: string;
  end: string;
  points: string[];
};

export type EducationEntry = {
  school: string;
  degree: string;
  start: string;
  end: string;
  hideInPdf?: boolean; // shown on /profile but left out of the downloadable resume
};

export type CertificateEntry = {
  name: string;
  issuer: string;
  note: string;
  url: string;
};

export type ProjectText = {
  title: string;
  description: string;
  detail: string;
  platform: string;
  signup: string;
  features?: string[];
};

export type Dictionary = {
  nav: {
    brand: string;
    home: string;
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    projectsHeading: string;
    resumeHeading: string;
    resumeDescription: string;
    privateHeading: string;
    siteSource: string;
  };
  profile: {
    name: string;
    title: string;
    tagline: string;
    aboutHeading: string;
    about: string;
    skillsHeading: string;
    skills: string[];
    experienceHeading: string;
    experience: ExperienceEntry[];
    certificatesHeading: string;
    certificates: CertificateEntry[];
    educationHeading: string;
    education: EducationEntry[];
    contactHeading: string;
    email: string;
    resumeDownload: string;
    resumeHint: string;
    resumeTitle: string;
  };
  projects: {
    dialog: {
      tech: string;
      platform: string;
      signup: string;
      visit: string;
      close: string;
      features: string;
    };
    accounting: ProjectText;
    motoLicense: ProjectText;
    deployPlatform: ProjectText;
  };
};

export const dictionaries: Record<"en" | "zh-TW", Dictionary> = {
  en: {
    nav: {
      brand: "LCYTOT",
      home: "Home",
    },
    home: {
      heroTitle: "Hi, I'm Chin-Yung",
      heroSubtitle:
        "This is my personal hub — a collection of small projects and experiments, all living under one roof.",
      projectsHeading: "Projects",
      resumeHeading: "About Me",
      resumeDescription: "A personal introduction — who I am, what I do, and how to reach me.",
      privateHeading: "Private Projects",
      siteSource: "Source code of this site",
    },
    profile: {
      name: "Lin Chin-Yung",
      title: "M.S. Student, NYCU · Algorithm Theory Lab",
      tagline:
        "Interested in algorithm theory, software & firmware development, and data analysis.",
      aboutHeading: "About",
      about:
        "I'm a first-year graduate student at the Institute of Computer Science and Engineering at National Yang Ming Chiao Tung University (NYCU), where I'm a member of the Algorithm Theory Lab. I'm interested in algorithm theory, software and firmware development, and data analysis. I have experience in low-level software development, frontend development, and data analysis through academic research and industry internships.",
      skillsHeading: "Skills",
      skills: [
        "Algorithm Theory",
        "Firmware Development",
        "Python",
        "C/C++",
        "React.js (Vite)",
        "Data Analysis",
        "LabVIEW",
      ],
      experienceHeading: "Experience",
      experience: [
        {
          role: "Software Engineering Intern",
          org: "TanE Wireless",
          start: "Feb. 2026",
          end: "Now",
          points: [
            "Developed front-end features across web (React.js with Vite) and mobile (Flutter / Kotlin for Android) platforms.",
            "Contributed to back-end development in Python.",
            "Developed health analysis algorithms, including sleep-stage and physiological signal analysis.",
          ],
        },
        {
          role: "Firmware Engineering Intern",
          org: "Phison Electronics",
          start: "Feb. 2025",
          end: "Jun. 2025",
          points: [
            "Researched algorithms and methods from academic papers and implemented them in C.",
            "Developed and tested programs on development boards, evaluating performance through experiments.",
            "Collected experimental results and analyzed system performance.",
          ],
        },
      ],
      certificatesHeading: "Certificates",
      certificates: [
        {
          name: "Certified LabVIEW Associate Developer (CLAD)",
          issuer: "LabVIEW",
          note: "Obtained in my first year of university.",
          url: "https://www.credly.com/badges/c712fc48-d128-4406-94f6-04be4ccd9774/public_url",
        },
      ],
      educationHeading: "Education",
      education: [
        {
          school: "National Yang Ming Chiao Tung University",
          degree: "M.S. in Institute of Computer Science and Engineering",
          start: "Sep. 2026",
          end: "Now",
        },
        {
          school: "National Yang Ming Chiao Tung University",
          degree: "B.S. in Computer Science",
          start: "Sep. 2022",
          end: "Jun. 2026",
        },
        {
          school: "National Lo-Tung Senior High School",
          degree: "Gifted Class in Mathematics and Science",
          start: "Sep. 2019",
          end: "Jun. 2022",
          hideInPdf: true,
        },
      ],
      contactHeading: "Contact",
      email: "lcytot211226@gmail.com",
      resumeDownload: "Download Resume (PDF)",
      resumeHint: "Generated from this page. In the print dialog, choose “Save as PDF”.",
      resumeTitle: "Lin Chin-Yung - Resume",
    },
    projects: {
      dialog: {
        tech: "Tech stack",
        platform: "Platform",
        signup: "Account",
        visit: "Open",
        close: "Close",
        features: "Features",
      },
      accounting: {
        title: "Accounting",
        description: "Track daily income and expenses.",
        detail:
          "Most expense trackers record a credit-card purchase the moment you swipe, even though the money doesn't leave your account until the bill is due. Subanote is built around that deferred payment, so your records match when you actually pay.",
        platform: "Web (installable as a web app)",
        signup: "Sign-up required",
      },
      motoLicense: {
        title: "Motorcycle License Alerts",
        description: "Crawls exam openings and pushes sign-up alerts.",
        detail:
          "Motorcycle license exam slots are hard to get, and when one frees up, nobody tells you. This system crawls the registration data in the background and sends a push notification the moment a slot opens, so you can book it first.",
        platform: "Web (installable as a web app)",
        signup: "No sign-up needed",
      },
      deployPlatform: {
        title: "Deploy & Monitoring Platform",
        description: "Auto-deploys, health-checks, and alerts for all my services.",
        detail:
          "Every project here is self-hosted on a Mac mini at home, served under my own domain (subani.cc) and exposed to the internet through Cloudflare Tunnel, with no open ports. Databases are backed up daily. To keep all of it running, I built a deploy and monitoring dashboard that lives only on my local network.",
        features: [
          "Auto-deploy: pushing to GitHub triggers a pull, build, and redeploy.",
          "PM2: runs every service and restarts it after each deploy or crash.",
          "Health checks: each service is checked automatically on a schedule.",
          "Discord alerts: failed deploys and unhealthy services are reported right away.",
        ],
        platform: "Local network only",
        signup: "Private",
      },
    },
  },
  "zh-TW": {
    nav: {
      brand: "LCYTOT",
      home: "首頁",
    },
    home: {
      heroTitle: "嗨，我是晉湧",
      heroSubtitle: "這裡是我的個人網站，收錄了我做的各種小專案與實驗，全部都放在同一個地方。",
      projectsHeading: "專案",
      resumeHeading: "個人介紹",
      resumeDescription: "認識我：我是誰、在做什麼，以及如何聯絡我。",
      privateHeading: "私有專案",
      siteSource: "本站原始碼",
    },
    profile: {
      name: "林晉湧",
      title: "陽明交通大學資工所碩士生 · 演算法理論實驗室",
      tagline: "專注於演算法理論、軟體與韌體開發，以及資料分析。",
      aboutHeading: "關於我",
      about:
        "我是國立陽明交通大學資訊科學與工程研究所的碩士一年級學生，同時也是演算法理論實驗室的成員。我對演算法理論、軟體與韌體開發，以及資料分析深感興趣。透過學術研究與業界實習，我累積了低階軟體開發、前端開發與資料分析方面的經驗。",
      skillsHeading: "技能",
      skills: [
        "演算法理論",
        "軟韌體開發",
        "Python",
        "C/C++",
        "React.js (Vite)",
        "資料分析",
        "LabVIEW",
      ],
      experienceHeading: "經歷",
      experience: [
        {
          role: "軟體工程實習生",
          org: "TanE Wireless",
          start: "2026年2月",
          end: "至今",
          points: [
            "負責 Web（React.js + Vite）與行動裝置（Flutter / Kotlin for Android）跨平台前端開發。",
            "參與 Python 後端開發工作。",
            "開發健康分析演算法，包括睡眠階段與生理訊號分析。",
          ],
        },
        {
          role: "韌體工程實習生",
          org: "群聯電子",
          start: "2025年2月",
          end: "2025年6月",
          points: [
            "根據學術論文進行研究，並以 C 語言實作相關演算法與方法。",
            "在開發板上撰寫與測試程式，透過實驗評估效能。",
            "蒐集實驗數據並分析系統效能。",
          ],
        },
      ],
      certificatesHeading: "證照",
      certificates: [
        {
          name: "Certified LabVIEW Associate Developer (CLAD)",
          issuer: "LabVIEW",
          note: "於大學一年級取得。",
          url: "https://www.credly.com/badges/c712fc48-d128-4406-94f6-04be4ccd9774/public_url",
        },
      ],
      educationHeading: "學歷",
      education: [
        {
          school: "國立陽明交通大學",
          degree: "資訊科學與工程研究所 碩士",
          start: "2026年9月",
          end: "至今",
        },
        {
          school: "國立陽明交通大學",
          degree: "資訊工程學系 學士",
          start: "2022年9月",
          end: "2026年6月",
        },
        {
          school: "國立羅東高級中學",
          degree: "數理資優班",
          start: "2019年9月",
          end: "2022年6月",
          hideInPdf: true,
        },
      ],
      contactHeading: "聯絡方式",
      email: "lcytot211226@gmail.com",
      resumeDownload: "下載履歷（PDF）",
      resumeHint: "依本頁最新內容產生，請在列印視窗選擇「另存為 PDF」。",
      resumeTitle: "林晉湧 - 履歷",
    },
    projects: {
      dialog: {
        tech: "使用技術",
        platform: "平台",
        signup: "帳號",
        visit: "前往",
        close: "關閉",
        features: "功能",
      },
      accounting: {
        title: "記帳",
        description: "記錄每天的收入與支出。",
        detail:
          "一般記帳 App 多半在刷卡當下就算成支出，但信用卡的錢其實要到繳款時才會扣。Subanote 針對信用卡延後付款的機制而設計，讓帳上的支出和實際付款的時間對得起來。",
        platform: "Web（可加入主畫面作為 Web App）",
        signup: "需註冊帳號",
      },
      motoLicense: {
        title: "機車駕照通知系統",
        description: "爬蟲監看考照名額，推播通知報名。",
        detail:
          "機車駕照的考試名額很難搶，有人取消釋出名額時也不會主動通知。這個系統在後台定時爬取報名資料，一有空位就推播到你的裝置，讓你搶先報名。",
        platform: "Web（可加入主畫面作為 Web App）",
        signup: "免註冊",
      },
      deployPlatform: {
        title: "自動部署監控平台",
        description: "所有服務的自動部署、健康檢查與錯誤通知。",
        detail:
          "上面的專案都架在家裡的 Mac mini 上，使用自己購買的網域 subani.cc，透過 Cloudflare Tunnel 對外連線，不需要開放任何連接埠；資料庫每天自動備份。為了管理這些服務，我做了一個只架在內網的部署監控後台。",
        features: [
          "自動部署：推送到 GitHub 後自動拉取、建置並重新部署。",
          "PM2 管理：以 PM2 執行所有服務，部署完成或當機時自動重啟。",
          "健康檢查：定時自動檢查每個服務是否正常運作。",
          "Discord 通知：部署失敗或服務異常時立即發送通知。",
        ],
        platform: "僅限內網",
        signup: "私人使用",
      },
    },
  },
};
