import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-16">
      <div className="mx-auto max-w-6xl px-4 py-10 grid gap-6 md:grid-cols-3 text-sm">
        <div>
          <div className="font-semibold text-slate-800">DreamWorks</div>
          <p className="text-slate-600 mt-1">
            Trusted dental products for labs &amp; doctors.
          </p>
        </div>

        <div className="space-y-1">
          <Link href="/legal/privacy" className="block hover:text-brand-600">
            Privacy
          </Link>
          <Link href="/legal/terms" className="block hover:text-brand-600">
            Terms
          </Link>
          <Link href="/legal/returns" className="block hover:text-brand-600">
            Shipping &amp; Returns
          </Link>
        </div>

        <div className="space-y-1">
          <a
            href="mailto:dreamworksdr@gmail.com"
            className="hover:text-brand-600"
          >
            dreamworksdr@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}