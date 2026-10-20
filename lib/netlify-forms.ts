/**
 * Submit a form to Netlify Forms from client-side React.
 * Every form posted here must also exist (same name and field names) in public/__forms.html,
 * which Netlify scans at deploy time to register forms.
 * Files are sent as multipart; plain text forms are URL-encoded.
 */
export async function submitNetlifyForm(formName: string, fields: Record<string, string | File | undefined>) {
  const entries = Object.entries(fields).filter((e): e is [string, string | File] => e[1] !== undefined);
  const hasFile = entries.some(([, v]) => v instanceof File);

  let body: FormData | string;
  const headers: Record<string, string> = {};
  if (hasFile) {
    const fd = new FormData();
    fd.append("form-name", formName);
    entries.forEach(([k, v]) => fd.append(k, v));
    body = fd; // browser sets the multipart boundary header
  } else {
    body = new URLSearchParams({ "form-name": formName, ...Object.fromEntries(entries as [string, string][]) }).toString();
    headers["Content-Type"] = "application/x-www-form-urlencoded";
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/__forms.html`, { method: "POST", headers, body });
  if (!res.ok) throw new Error(`Form "${formName}" submission failed (${res.status})`);
}
