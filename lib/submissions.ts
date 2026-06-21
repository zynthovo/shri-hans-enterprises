import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";

// Submissions are stored in a JSON file on disk (no external DB needed).
const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "submissions.json");

export interface Submission {
  id: string;
  type: string;
  createdAt: string;
  fields: Record<string, string>;
}

async function readAll(): Promise<Submission[]> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Submission[]) : [];
  } catch {
    return [];
  }
}

/** Newest first. */
export async function getSubmissions(): Promise<Submission[]> {
  const all = await readAll();
  return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addSubmission(
  type: string,
  fields: Record<string, string>
): Promise<Submission> {
  const all = await readAll();
  const sub: Submission = {
    id: crypto.randomUUID(),
    type,
    createdAt: new Date().toISOString(),
    fields,
  };
  all.push(sub);
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(all, null, 2), "utf8");
  return sub;
}
