"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "motion/react";
import { Check, CheckCircle2, Copy, ImageUp, Loader2, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { buttonVariants } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { donationForm as copy } from "@/lib/content";
import { submitNetlifyForm } from "@/lib/netlify-forms";
import { cn } from "@/lib/utils";

const FORM_NAME = "donation"; // must match public/__forms.html
const { currency, bank, maxScreenshotMB, presetAmounts } = siteConfig.donation;
const MAX_BYTES = maxScreenshotMB * 1024 * 1024;

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s-]{7,16}$/, "Please enter a valid phone number"),
  email: z.union([z.literal(""), z.string().trim().email("Please enter a valid email address")]),
  amount: z
    .string()
    .trim()
    .regex(/^\d+(\.\d{1,2})?$/, "Please enter an amount in numbers")
    .refine((v) => Number(v) > 0, "Amount must be more than 0"),
  bankDetails: z.string().trim().min(3, "Please add the bank and account you sent from"),
  screenshot: z
    .instanceof(File, { message: "Please attach a screenshot of the transfer" })
    .refine((f) => f.type.startsWith("image/"), "Please attach an image file")
    .refine((f) => f.size <= MAX_BYTES, `Image must be ${maxScreenshotMB} MB or smaller`),
});
type FormValues = z.infer<typeof schema>;

const field =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground outline-none transition focus:border-accent focus:ring-4 focus:ring-accent/20";

function Err({ msg }: { msg?: string }) {
  return msg ? <p className="mt-1.5 text-sm text-danger">{msg}</p> : null;
}

/** One line of the bank card with a copy button. */
function BankRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  if (!value) return null;
  return (
    <div className="flex items-center justify-between gap-3 py-2">
      <div className="min-w-0">
        <p className="text-xs tracking-wide text-inverse-muted uppercase">{label}</p>
        <p className="font-semibold break-words">{value}</p>
      </div>
      <button
        type="button"
        onClick={async () => {
          // numbers are copied without spaces so they paste cleanly into banking apps
          await navigator.clipboard?.writeText(/number|IBAN/i.test(label) ? value.replace(/\s/g, "") : value);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="shrink-0 rounded-md p-2 text-inverse-muted transition hover:bg-inverse-foreground/10 hover:text-inverse-foreground"
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>
    </div>
  );
}

/** Drag-and-drop image picker with preview (react-dropzone). */
function ScreenshotDrop({ value, onChange, invalid }: { value?: File; onChange: (f?: File) => void; invalid: boolean }) {
  const preview = useMemo(() => (value ? URL.createObjectURL(value) : undefined), [value]);
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
    onDrop: (files) => files[0] && onChange(files[0]),
  });

  if (value && preview) {
    return (
      <div className="flex items-center gap-4 rounded-lg border border-border bg-background p-3">
        {/* eslint-disable-next-line @next/next/no-img-element -- local object URL preview */}
        <img src={preview} alt="Transfer screenshot preview" className="size-16 rounded-md object-cover" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{value.name}</p>
          <p className="text-xs text-muted-foreground">{(value.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
        <button type="button" onClick={() => onChange(undefined)} className="rounded-md p-2 text-muted-foreground hover:bg-surface-muted" aria-label="Remove screenshot">
          <X size={18} />
        </button>
      </div>
    );
  }
  return (
    <div
      {...getRootProps()}
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-4 py-7 text-center transition",
        isDragActive ? "border-accent bg-accent/10" : invalid ? "border-danger/60" : "border-border hover:border-accent/70"
      )}
    >
      <input {...getInputProps({ name: "screenshot" })} />
      <ImageUp className="text-accent" size={28} />
      <p className="text-sm font-medium">{copy.labels.screenshotHint}</p>
      <p className="text-xs text-muted-foreground">PNG or JPG, up to {maxScreenshotMB} MB</p>
    </div>
  );
}

export default function DonationForm({ onDone }: { onDone: () => void }) {
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState(false);
  const [botField, setBotField] = useState("");
  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { email: "" } });

  const amount = watch("amount");
  const pickAmount = (n: number) => setValue("amount", String(n), { shouldValidate: true, shouldDirty: true });

  const onSubmit = async (data: FormValues) => {
    setSendError(false);
    try {
      await submitNetlifyForm(FORM_NAME, {
        "bot-field": botField,
        name: data.name,
        phone: data.phone,
        email: data.email || "",
        amount: `${currency} ${Number(data.amount).toLocaleString("en-PK")}`,
        bankDetails: data.bankDetails,
        screenshot: data.screenshot,
      });
      setSent(true);
    } catch {
      setSendError(true);
    }
  };

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div key="done" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="py-6 text-center" role="status">
          <CheckCircle2 size={52} className="mx-auto text-primary dark:text-accent" />
          <h3 className="mt-4 font-serif text-3xl font-semibold">{copy.success.title}</h3>
          <p className="mx-auto mt-3 max-w-md text-muted-foreground">{copy.success.body}</p>
          <button type="button" onClick={onDone} className={buttonVariants({ className: "mt-6" })}>
            Close
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" noValidate name={FORM_NAME} onSubmit={handleSubmit(onSubmit)} exit={{ opacity: 0 }} className="space-y-5">
          <p id="donation-intro" className="text-muted-foreground">
            {copy.intro}
          </p>

          <div className="rounded-xl border border-inverse-foreground/10 bg-inverse px-5 py-3 text-inverse-foreground">
            <p className="pt-1 pb-1 text-sm font-semibold text-inverse-accent">{copy.bankHeading}</p>
            <div className="divide-y divide-inverse-foreground/10">
              <BankRow label="Bank" value={bank.bankName} />
              <BankRow label="Account title" value={bank.accountTitle} />
              <BankRow label="Account number" value={bank.accountNumber} />
              <BankRow label="IBAN" value={bank.iban} />
            </div>
          </div>

          <p hidden aria-hidden="true">
            <label>
              Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" value={botField} onChange={(e) => setBotField(e.target.value)} />
            </label>
          </p>

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">{copy.labels.name}</span>
              <input {...register("name")} autoComplete="name" className={field} />
              <Err msg={errors.name?.message} />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">{copy.labels.phone}</span>
              <input {...register("phone")} type="tel" autoComplete="tel" inputMode="tel" placeholder="03XX XXXXXXX" className={field} />
              <Err msg={errors.phone?.message} />
            </label>
            <label className="block sm:col-span-2">
              <span className="mb-1.5 block text-sm font-semibold">{copy.labels.email}</span>
              <input {...register("email")} type="email" autoComplete="email" className={field} />
              <Err msg={errors.email?.message} />
            </label>
          </div>

          <fieldset>
            <legend className="mb-2 block text-sm font-semibold">{copy.labels.amount}</legend>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {presetAmounts.map((n) => {
                const active = amount === String(n);
                return (
                  <motion.button
                    key={n}
                    type="button"
                    whileTap={{ scale: 0.96 }}
                    onClick={() => pickAmount(n)}
                    aria-pressed={active}
                    className={cn(
                      "rounded-lg border px-3 py-2.5 text-sm font-semibold transition-colors",
                      active
                        ? "border-primary bg-primary text-primary-foreground dark:border-accent dark:bg-accent dark:text-accent-foreground"
                        : "border-border bg-background hover:border-accent"
                    )}
                  >
                    {n.toLocaleString("en-PK")}
                  </motion.button>
                );
              })}
            </div>
            <label className="mt-3 block">
              <span className="sr-only">{copy.labels.amountCustom}</span>
              <div className="relative">
                <span className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-sm font-semibold text-muted-foreground">{currency}</span>
                <input {...register("amount")} inputMode="decimal" placeholder={copy.labels.amountCustom} className={cn(field, "pl-14")} />
              </div>
            </label>
            <Err msg={errors.amount?.message} />
          </fieldset>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">{copy.labels.bankDetails}</span>
            <textarea {...register("bankDetails")} rows={2} placeholder={copy.labels.bankDetailsHint} className={cn(field, "resize-y")} />
            <Err msg={errors.bankDetails?.message} />
          </label>

          <div>
            <span className="mb-1.5 block text-sm font-semibold">{copy.labels.screenshot}</span>
            <Controller
              control={control}
              name="screenshot"
              render={({ field: f }) => <ScreenshotDrop value={f.value} onChange={f.onChange} invalid={!!errors.screenshot} />}
            />
            <Err msg={errors.screenshot?.message} />
          </div>

          {sendError && (
            <p role="alert" className="text-sm text-danger">
              {copy.error}
            </p>
          )}

          <button type="submit" disabled={isSubmitting} className={buttonVariants({ variant: "accent", className: "w-full" })}>
            {isSubmitting && <Loader2 size={18} className="animate-spin" />}
            {isSubmitting ? "Submitting…" : copy.submit}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
