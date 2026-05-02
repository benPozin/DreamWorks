import Link from "next/link";
import { Wordmark } from "@/components/site/wordmark";
import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import { CONTACT } from "@/lib/contact";

const cols = [
  {
    title: "Lab",
    links: [
      { href: "/about", label: "About" },
      { href: "/shop", label: "Shop" },
      { href: "/vip", label: "VIP Cases" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Account",
    links: [
      { href: "/login", label: "Sign in" },
      { href: "/signup", label: "Open account" },
      { href: "/checkout", label: "Submit case" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/contact", label: "Rush case line" },
      { href: "/Perscription-Form.pdf", label: "Prescription form" },
      { href: "/contact", label: "Shipping" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-border bg-bg-elevated/40 noise">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Wordmark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-fg-muted">
              A full-service dental laboratory based in Florida. Thirty years of precision craftsmanship,
              delivered to dental professionals who refuse to compromise.
            </p>
            <div className="mt-6 flex flex-col gap-2 text-sm text-fg-muted">
              {CONTACT.emergencyPhones.map((p, i) => (
                <a
                  key={p.tel}
                  href={`tel:${p.tel}`}
                  className="inline-flex items-center gap-2 hover:text-fg transition-colors"
                >
                  <Phone className="size-4 text-blue" />
                  <span>
                    {i === 0 ? "Rush line" : "Alt line"} · {p.display}
                  </span>
                </a>
              ))}
              <a
                href={`mailto:${CONTACT.email}`}
                className="inline-flex items-center gap-2 hover:text-fg transition-colors"
              >
                <Mail className="size-4 text-blue" />
                <span>{CONTACT.email}</span>
              </a>
              <div className="inline-flex items-start gap-2 text-fg-muted">
                <MapPin className="size-4 text-blue mt-0.5 shrink-0" />
                <span>
                  {CONTACT.addressLine1}
                  <br />
                  {CONTACT.addressLine2}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {cols.map((col) => (
              <div key={col.title}>
                <div className="text-xs uppercase tracking-[0.18em] text-fg-subtle font-medium">
                  {col.title}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link
                        href={l.href}
                        className="text-sm text-fg hover:text-blue transition-colors inline-flex items-center gap-1 group"
                      >
                        {l.label}
                        <ArrowUpRight className="size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs uppercase tracking-[0.18em] text-fg-subtle font-medium">
            {CONTACT.addressFull}
          </p>
          <p className="text-xs text-fg-subtle">
            © {new Date().getFullYear()} DreamWorks Dental Laboratories. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
