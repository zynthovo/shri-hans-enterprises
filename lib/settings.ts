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

// Placeholder defaults — update the real business details from /admin/settings
// (or edit here) before launch. Nothing here is a real, reachable contact.
export const DEFAULT_SETTINGS: SiteSettings = {
  contact: {
    address:
      "Plot No. 14, Industrial Area, Sector 25,\nFaridabad-121003, Haryana",
    phone: "9876543210",
    whatsapp: "919876543210",
    emails: ["info@shrihansenterprises.com", "sales@shrihansenterprises.com"],
  },
  socials: {
    facebook: "https://facebook.com/shrihansenterprises",
    instagram: "https://instagram.com/shrihansenterprises",
    twitter: "",
    linkedin: "",
    youtube: "https://youtube.com/@shrihansenterprises",
    github: "",
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
