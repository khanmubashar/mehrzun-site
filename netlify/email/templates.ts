/**
 * Email content for form submissions. Edit wording here.
 * Every email has an HTML and a plain-text version. All visitor input is HTML-escaped.
 */

export type Fields = Record<string, string>;
export type Email = { to: string; subject: string; text: string; html: string; replyTo?: string };

const SITE = "Mehrzun";
const TAGLINE = "No Interest. Just Opportunity.";

const esc = (s = "") =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Shared branded wrapper: forest green header, cream body. */
function layout(title: string, bodyHtml: string) {
  return `<!doctype html><html><body style="margin:0;background:#f7f1e3;font-family:Arial,Helvetica,sans-serif;color:#163223">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f1e3;padding:24px 12px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fdfaf3;border-radius:12px;overflow:hidden;border:1px solid #ede3cc">
<tr><td style="background:#1d3b2a;padding:22px 28px">
<div style="font-family:Georgia,serif;font-size:24px;color:#fdfaf3">${SITE}</div>
<div style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#dcc28e;margin-top:4px">${TAGLINE}</div>
</td></tr>
<tr><td style="padding:28px">
<h1 style="font-family:Georgia,serif;font-weight:normal;font-size:24px;margin:0 0 16px">${esc(title)}</h1>
${bodyHtml}
</td></tr>
<tr><td style="padding:16px 28px;border-top:1px solid #ede3cc;font-size:12px;color:#3f5a49">
${SITE} · Interest-free microfinance
</td></tr>
</table></td></tr></table></body></html>`;
}

const p = (t: string) => `<p style="font-size:15px;line-height:1.6;margin:0 0 14px">${t}</p>`;

function table(rows: [string, string | undefined][]) {
  const tr = rows
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px 8px 0;color:#3f5a49;font-size:13px;vertical-align:top;white-space:nowrap">${esc(k)}</td>` +
        `<td style="padding:8px 0;font-size:15px;font-weight:bold">${v!.startsWith("<a ") ? v : esc(v)}</td></tr>`
    )
    .join("");
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0 18px;border-top:1px solid #ede3cc">${tr}</table>`;
}
const textRows = (rows: [string, string | undefined][]) =>
  rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");

/* ---------- Donation ---------- */

export function donationThankYou(d: Fields, to: string): Email {
  const rows: [string, string | undefined][] = [["Amount", d.amount], ["Sent from", d.bankDetails]];
  return {
    to,
    subject: `Thank you for your donation to ${SITE}`,
    text: `Dear ${d.name},\n\nThank you for supporting ${SITE}. We have received your donation details:\n\n${textRows(rows)}\n\nWe will confirm once the transfer is verified. Your support helps make interest-free microfinance accessible to more people.\n\nWith gratitude,\nThe ${SITE} team`,
    html: layout(
      "Thank you for your support",
      p(`Dear ${esc(d.name)},`) +
        p(`Thank you for supporting ${SITE}. We have received your donation details:`) +
        table(rows) +
        p("We will confirm once the transfer is verified. Your support helps make interest-free microfinance accessible to more people.") +
        p(`With gratitude,<br>The ${SITE} team`)
    ),
  };
}

export function donationForTeam(d: Fields, to: string, screenshotUrl?: string): Email {
  const rows: [string, string | undefined][] = [
    ["Name", d.name],
    ["Phone", d.phone],
    ["Email", d.email],
    ["Amount", d.amount],
    ["Donor bank", d.bankDetails],
  ];
  return {
    to,
    replyTo: d.email || undefined,
    subject: `New donation: ${d.amount} from ${d.name}`,
    text: `New donation submitted on the website.\n\n${textRows(rows)}\nScreenshot: ${screenshotUrl ?? "not available"}\n\nVerify the transfer, then reply to the donor.`,
    html: layout(
      "New donation received",
      p("A donation was submitted on the website.") +
        table([...rows, ["Screenshot", screenshotUrl ? `<a href="${esc(screenshotUrl)}" style="color:#8a6c3a">View transfer screenshot</a>` : undefined]]) +
        p("Verify the transfer in the bank account, then reply to the donor.")
    ),
  };
}

/* ---------- Contact ---------- */

export function contactConfirmation(d: Fields, to: string): Email {
  return {
    to,
    subject: `We received your message: ${d.subject}`,
    text: `Dear ${d.name},\n\nThank you for contacting ${SITE}. We have received your message and will get back to you soon.\n\nYour message:\n${d.message}\n\nWarm regards,\nThe ${SITE} team`,
    html: layout(
      "We received your message",
      p(`Dear ${esc(d.name)},`) +
        p(`Thank you for contacting ${SITE}. We have received your message and will get back to you soon.`) +
        `<div style="background:#f7f1e3;border-left:3px solid #c9a96a;padding:12px 16px;margin:0 0 18px;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(d.message)}</div>` +
        p(`Warm regards,<br>The ${SITE} team`)
    ),
  };
}

export function contactForTeam(d: Fields, to: string): Email {
  return {
    to,
    replyTo: d.email,
    subject: `New message: ${d.subject}`,
    text: `New contact message from the website.\n\nName: ${d.name}\nEmail: ${d.email}\nSubject: ${d.subject}\n\n${d.message}\n\nReply to this email to answer ${d.name}.`,
    html: layout(
      "New contact message",
      table([["Name", d.name], ["Email", d.email], ["Subject", d.subject]]) +
        `<div style="background:#f7f1e3;border-left:3px solid #c9a96a;padding:12px 16px;margin:0 0 18px;font-size:14px;line-height:1.6;white-space:pre-wrap">${esc(d.message)}</div>` +
        p(`Reply to this email to answer ${esc(d.name)} directly.`)
    ),
  };
}
