"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Send } from "lucide-react";
import { FaInstagram as Instagram } from "react-icons/fa6";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { buttonVariants } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Please enter a valid email address"),
  subject: z.string().trim().min(3, "Please add a subject"),
  message: z.string().trim().min(10, "Please write a short message (10+ characters)"),
  consent: z.literal(true, { message: "Please agree before sending" }),
});
type FormValues = z.infer<typeof schema>;

/** Netlify Forms form name; must match public/__forms.html. */
const FORM_NAME = "contact";

/**
 * Submits to Netlify Forms. Netlify registers the form from public/__forms.html at deploy time,
 * stores each submission and emails it to the addresses set under Forms → Form notifications.
 */
async function submitToNetlify(data: FormValues, botField: string) {
  const body = new URLSearchParams({
    "form-name": FORM_NAME,
    "bot-field": botField,
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    consent: data.consent ? "yes" : "no",
  });
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/__forms.html`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
  });
  if (!res.ok) throw new Error(`Form submission failed (${res.status})`);
}

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [botField, setBotField] = useState(""); // honeypot: real visitors never fill it
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormValues) => {
    setSendError(false);
    try {
      await submitToNetlify(data, botField);
      setSent(true);
      reset();
    } catch {
      setSendError(true);
    }
  };

  const field =
    "w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/20";
  const Err = ({ msg }: { msg?: string }) =>
    msg ? <p className="mt-1.5 text-sm text-danger">{msg}</p> : null;

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex flex-col items-center rounded-3xl bg-surface p-10 text-center shadow-xl shadow-black/5"
          role="status"
        >
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.15 }}>
            <CheckCircle2 size={56} className="text-primary dark:text-accent" />
          </motion.div>
          <h3 className="mt-4 font-serif text-3xl font-semibold ">Thank you for reaching out</h3>
          <p className="mt-3 max-w-md text-muted-foreground">
            We have received your message and will get back to you soon. You can also reach us on Instagram.
          </p>
          <a href={siteConfig.social.instagram.url} target="_blank" rel="noopener noreferrer" className={buttonVariants({ className: "mt-6" })}>
            <Instagram size={18} /> {siteConfig.social.instagram.handle}
          </a>
          <button onClick={() => setSent(false)} className="mt-4 text-sm font-medium text-accent-text underline-offset-4 hover:underline">
            Back to the form
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          noValidate
          name={FORM_NAME}
          onSubmit={handleSubmit(onSubmit)}
          exit={{ opacity: 0, y: -10 }}
          className="space-y-5 rounded-3xl bg-surface p-6 shadow-xl shadow-black/5 sm:p-10"
        >
          <p hidden aria-hidden="true">
            <label>
              Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" value={botField} onChange={(e) => setBotField(e.target.value)} />
            </label>
          </p>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">Name</span>
              <input {...register("name")} autoComplete="name" className={field} />
              <Err msg={errors.name?.message} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">Email</span>
              <input {...register("email")} type="email" autoComplete="email" className={field} />
              <Err msg={errors.email?.message} />
            </label>
          </div>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Subject</span>
            <input {...register("subject")} className={field} />
            <Err msg={errors.subject?.message} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Message</span>
            <textarea {...register("message")} rows={5} className={`${field} resize-y`} />
            <Err msg={errors.message?.message} />
          </label>
          <label className="flex items-start gap-3 text-sm text-muted-foreground">
            <input {...register("consent")} type="checkbox" className="mt-1 size-4 accent-[var(--primary)]" />
            <span>
              I agree that Mehrzun may use the details I provide only to respond to my message. We do not share your
              information with third parties.
            </span>
          </label>
          <Err msg={errors.consent?.message} />
          {sendError && (
            <p role="alert" className="text-sm text-danger">
              Sorry, your message could not be sent. Please try again, or message us on Instagram at{" "}
              <a href={siteConfig.social.instagram.url} target="_blank" rel="noopener noreferrer" className="underline">
                {siteConfig.social.instagram.handle}
              </a>
              .
            </p>
          )}
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} type="submit" disabled={isSubmitting} className={buttonVariants({ className: "w-full sm:w-auto" })}>
            <Send size={18} /> {isSubmitting ? "Sending…" : "Send Message"}
          </motion.button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
