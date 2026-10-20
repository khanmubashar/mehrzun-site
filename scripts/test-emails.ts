/**
 * Try the submission emails locally.
 *   npx tsx scripts/test-emails.ts            preview only: writes HTML files to ./email-previews
 *   npx tsx scripts/test-emails.ts --send     really sends via Gmail; all emails go to GMAIL_USER (needs .env.local)
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { buildEmails, handler } from "../netlify/functions/submission-created";

// load .env.local (KEY=value lines) without extra dependencies
if (existsSync(".env.local")) {
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const send = process.argv.includes("--send");
const me = process.env.GMAIL_USER ?? "donor@example.com";
const samples = [
  {
    form_name: "donation",
    data: {
      name: "Ali Khan",
      phone: "0300 1234567",
      email: send ? me : "ali@example.com",
      amount: "PKR 2,000",
      bankDetails: "Meezan Bank, Ali Khan",
      screenshot: { url: "https://example.com/screenshot.png", filename: "receipt.png" },
    },
  },
  {
    form_name: "contact",
    data: { name: "Sara Ahmed", email: send ? me : "sara@example.com", subject: "Partnership", message: "Hello,\nWe would like to partner with Mehrzun." },
  },
];

(async () => {
  if (!send) {
    mkdirSync("email-previews", { recursive: true });
    for (const s of samples)
      buildEmails(s, "team@example.com").forEach((e, i) => {
        const f = `email-previews/${s.form_name}-${i + 1}.html`;
        writeFileSync(f, e.html);
        console.log(`${f}\n  to: ${e.to}${e.replyTo ? `  reply-to: ${e.replyTo}` : ""}\n  subject: ${e.subject}`);
      });
    return;
  }
  process.env.TEAM_EMAIL = me; // send team copies to yourself too during the test
  for (const s of samples) {
    const res = await handler({ body: JSON.stringify({ payload: s }) } as never, {} as never);
    console.log(s.form_name, "->", res && "body" in res ? res.body : res);
  }
})();
