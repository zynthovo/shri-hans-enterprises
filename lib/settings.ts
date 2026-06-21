import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "settings.json");

export interface SiteSettings {
  contact: {
    address: string; // may contain line breaks
    phone: string;
    whatsapp: string; // digits incl. country code, e.g. 918948972625
    emails: string[];
  };
  socials: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
    youtube: string;
    github: string;
  };
}

// Defaults match the previous hard-coded values, so nothing changes until edited.
export const DEFAULT_SETTINGS: SiteSettings = {
  contact: {
    address:
      "70-A, Lok Nagar K.B. Marg, Alok Nagar,\nKalyanpur, Lucknow-226022, Uttar Pradesh",
    phone: "8948972625",
    whatsapp: "918948972625",
    emails: [
      "info@zynthovo.com",
      "contact@zynthovo.com",
      "support@zynthovo.com",
      "careers@zynthovo.com",
    ],
  },
  socials: {
    facebook: "",
    instagram: "https://instagram.com/zynthovo",
    twitter: "https://x.com/zynthovo",
    linkedin: "https://linkedin.com/company/zynthovo",
    youtube: "",
    github: "https://github.com/zynthovo",
  },
};

export async function getSettings(): Promise<SiteSettings> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const saved = JSON.parse(raw);
    // Deep-merge over defaults so new fields always have a value.
    return {
      contact: { ...DEFAULT_SETTINGS.contact, ...(saved.contact ?? {}) },
      socials: { ...DEFAULT_SETTINGS.socials, ...(saved.socials ?? {}) },
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export async function saveSettings(next: SiteSettings): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(next, null, 2), "utf8");
}
