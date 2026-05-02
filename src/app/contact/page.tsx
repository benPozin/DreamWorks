"use client";

import { motion } from "motion/react";
import { Phone, Mail, MapPin, Siren, Clock, ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/site/page-header";
import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/contact";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        compact
        eyebrow="Contact"
        title={
          <>
            Get in touch: <span className="blue-text font-serif italic font-light">we move fast.</span>
          </>
        }
        description="Routine inquiry or urgent rush case, you'll hear back in minutes, not days."
      />

      {/* Rush banner */}
      <div className="mx-auto -mt-1 max-w-6xl px-6 sm:-mt-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-2xl border border-red-200 bg-linear-to-r from-red-50 via-orange-50 to-red-50 p-5 sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-700">
                <Siren className="size-5" />
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-red-700 font-bold">
                  Rush case line
                </div>
                <p className="mt-0.5 text-sm text-fg leading-snug">
                  Patient in the chair? Anterior fracture? Call directly. We triage in seconds.
                </p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {CONTACT.emergencyPhones.map((p) => (
                <a
                  key={p.tel}
                  href={`tel:${p.tel}`}
                  className="inline-flex items-center gap-2 rounded-full bg-red-700 hover:bg-red-800 text-white px-4 py-2.5 text-sm font-semibold transition-colors"
                >
                  <Phone className="size-4" />
                  {p.display}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <Section className="py-8! sm:py-10!">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <form
            className="rounded-2xl border border-border bg-white p-7 sm:p-9"
            onSubmit={(e) => e.preventDefault()}
          >
            <h2 className="font-display text-2xl font-semibold tracking-tight">Send an inquiry</h2>
            <p className="mt-1 text-sm text-fg-muted">
              For new accounts, case questions, or partnership inquiries.
            </p>

            <div className="mt-7 grid gap-5 sm:grid-cols-2">
              <Field label="Your name" placeholder="Dr. Jane Smith" />
              <Field label="Practice name" placeholder="Smith Family Dental" />
              <Field label="Email" type="email" placeholder="jane@practice.com" />
              <Field label="Phone" type="tel" placeholder="(555) 555-5555" />
            </div>

            <div className="mt-5">
              <Label>Inquiry type</Label>
              <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {["New account", "Case question", "Partnership", "Other"].map((opt, i) => (
                  <label
                    key={opt}
                    className="cursor-pointer rounded-lg border border-border bg-white px-3 py-2 text-sm text-fg hover:border-blue has-[:checked]:border-blue has-[:checked]:bg-blue-haze has-[:checked]:text-blue-deep transition-colors flex items-center gap-2"
                  >
                    <input type="radio" name="inquiry" defaultChecked={i === 0} className="sr-only peer" />
                    <span className="size-3 rounded-full border border-border-strong peer-checked:border-blue peer-checked:bg-blue peer-checked:ring-4 peer-checked:ring-blue/20" />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <Label>How can we help?</Label>
              <textarea
                rows={5}
                placeholder="Tell us about your case, practice, or question…"
                className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm placeholder:text-fg-subtle focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/15 resize-none"
              />
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Button type="submit" variant="primary" size="lg">
                Send message
                <ArrowUpRight className="size-4" />
              </Button>
              <span className="text-xs text-fg-subtle">Typical reply within 1 business hour.</span>
            </div>
          </form>

          <div className="space-y-4">
            {CONTACT.emergencyPhones.map((p, i) => (
              <ContactCard
                key={p.tel}
                icon={Phone}
                title={i === 0 ? "Rush line" : "Alternate line"}
                value={p.display}
                href={`tel:${p.tel}`}
                note={i === 0 ? "Mon–Fri · 7am–7pm ET" : "After-hours / overflow"}
              />
            ))}
            <ContactCard
              icon={Mail}
              title="Email"
              value={CONTACT.email}
              href={`mailto:${CONTACT.email}`}
              note="Reply within 1 business hour"
            />
            <ContactCard
              icon={MapPin}
              title="Workshop"
              value={CONTACT.addressLine1}
              note={CONTACT.addressLine2}
            />
            <div className="rounded-2xl border border-border bg-white p-5">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-blue font-semibold">
                <Clock className="size-3.5" />
                Hours
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-fg">
                <li className="flex justify-between"><span className="text-fg-muted">Mon–Fri</span><span>7:00 – 7:00 ET</span></li>
                <li className="flex justify-between"><span className="text-fg-muted">Saturday</span><span>By rush appt.</span></li>
                <li className="flex justify-between"><span className="text-fg-muted">Sunday</span><span>Closed</span></li>
              </ul>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label className="text-xs uppercase tracking-[0.18em] text-fg-subtle font-semibold">
      {children}
    </label>
  );
}

function Field({
  label,
  type = "text",
  placeholder,
}: {
  label: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-border bg-white px-4 py-3 text-sm placeholder:text-fg-subtle focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/15"
      />
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  value,
  note,
  href,
}: {
  icon: React.ElementType;
  title: string;
  value: string;
  note?: string;
  href?: string;
}) {
  const content = (
    <>
      <div className="flex size-10 items-center justify-center rounded-xl bg-blue-haze text-blue">
        <Icon className="size-5" strokeWidth={1.7} />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase tracking-[0.22em] text-fg-subtle font-semibold">
          {title}
        </div>
        <div className="mt-0.5 font-medium text-fg truncate">{value}</div>
        {note && <div className="text-xs text-fg-subtle mt-0.5">{note}</div>}
      </div>
    </>
  );
  const cls = "flex items-start gap-4 rounded-2xl border border-border bg-white p-5 transition-colors hover:border-blue/40";
  if (href) {
    return (
      <a href={href} className={cls}>
        {content}
      </a>
    );
  }
  return <div className={cls}>{content}</div>;
}
