/**
 * Netlify runs this automatically after every *verified* (non-spam) Netlify Forms submission.
 * It sends emails through Gmail using an app password:
 *   - donation: thank-you to the donor (if they gave an email) + details to the team
 *   - contact:  confirmation to the visitor + the message to the team
 *
 * Environment variables (Netlify → Project configuration → Environment variables):
 *   GMAIL_USER          the Gmail address that sends the emails
 *   GMAIL_APP_PASSWORD  16-character Gmail app password (mark as secret)
 *   TEAM_EMAIL          where team notifications go (optional, defaults to GMAIL_USER; comma-separate for several)
 *   EMAIL_DRY_RUN=1     log emails instead of sending (for testing)
 */
import type { Handler } from "@netlify/functions";
import nodemailer from "nodemailer";
import { contactConfirmation, contactForTeam, donationForTeam, donationThankYou, type Email, type Fields } from "../email/templates";

type FileField = { url?: string; filename?: string };
type Submission = { form_name: string; data: Record<string, string | FileField | undefined> };

const isEmail = (s?: string) => !!s && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);

/** Flatten submission data to strings and trim overly long values. */
function clean(data: Submission["data"]): Fields {
  const out: Fields = {};
  for (const [k, v] of Object.entries(data ?? {})) if (typeof v === "string") out[k] = v.trim().slice(0, 5000);
  return out;
}

function fileUrl(v: Submission["data"][string]): string | undefined {
  if (!v) return undefined;
  if (typeof v === "string") return v.startsWith("http") ? v : undefined;
  return v.url;
}

export function buildEmails(sub: Submission, team: string): Email[] {
  const d = clean(sub.data);
  const emails: Email[] = [];
  if (sub.form_name === "donation") {
    if (isEmail(d.email)) emails.push(donationThankYou(d, d.email));
    emails.push(donationForTeam(d, team, fileUrl(sub.data.screenshot)));
  } else if (sub.form_name === "contact") {
    if (isEmail(d.email)) emails.push(contactConfirmation(d, d.email), contactForTeam(d, team));
  }
  return emails;
}

export const handler: Handler = async (event) => {
  const { GMAIL_USER, GMAIL_APP_PASSWORD, TEAM_EMAIL, EMAIL_DRY_RUN } = process.env;
  const dryRun = EMAIL_DRY_RUN === "1";
  if (!dryRun && (!GMAIL_USER || !GMAIL_APP_PASSWORD)) {
    console.warn("[emails] GMAIL_USER / GMAIL_APP_PASSWORD not set; skipping");
    return { statusCode: 200, body: "email not configured" };
  }

  const { payload } = JSON.parse(event.body ?? "{}") as { payload: Submission };
  const emails = buildEmails(payload, TEAM_EMAIL || GMAIL_USER || "team@example.com");

  const transport = dryRun
    ? nodemailer.createTransport({ jsonTransport: true })
    : nodemailer.createTransport({ service: "gmail", auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD } });

  const results = await Promise.allSettled(
    emails.map((e) => transport.sendMail({ from: `"Mehrzun" <${GMAIL_USER ?? "dry-run@example.com"}>`, ...e }))
  );
  results.forEach((r, i) =>
    r.status === "rejected"
      ? console.error(`[emails] failed: ${emails[i].subject}`, r.reason)
      : console.log(`[emails] sent: ${emails[i].subject} -> ${emails[i].to}`)
  );
  // Always 200: the submission itself is already saved by Netlify.
  return { statusCode: 200, body: `sent ${results.filter((r) => r.status === "fulfilled").length}/${emails.length}` };
};
