import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import Reveal from "@/components/Reveal";
import ProductGrid from "@/components/ProductGrid";

export default function Home() {
  return (
    <>
      {/* ================== HERO ================== */}
      <section
        className="
          relative
          h-[calc(100vh-var(--nav-h))]  /* exact viewport height minus navbar */
          w-full overflow-hidden
          flex items-center
        "
      >
        {/* Background image */}
        <Image
          src="/banner.png"                // export at 2560x1440 (16:9)
          alt="DreamWorks Resin banner"
          fill
          priority
          className="object-cover object-center md:object-right"
        />

        {/* Dark left-to-right overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent" />

        {/* Subtle bottom vignette to blend into next section */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/25 to-transparent" />

        {/* Content */}
        <div className="relative z-10 max-w-[72ch] px-6 md:px-16 -mt-48">
          <p className="text-sm font-medium text-brand-200 mb-3">
            Trusted dental products for labs &amp; doctors
          </p>

          <h1
            className="text-white font-bold tracking-tight leading-[1.05]
                       text-[clamp(2.5rem,6vw,4.5rem)]"
          >
            Premium Resins for Dental Labs
          </h1>

          <p className="mt-5 text-slate-200 text-lg leading-relaxed">
            Powered by 20+ years of dental lab expertise.
          </p>

          <div className="mt-8 flex gap-4">
            <Link href="/shop" className="btn btn-primary">
              Shop Resins
            </Link>
            <Link
              href="/about"
              className="btn btn-ghost border-white text-white hover:bg-white/10"
            >
              Learn more
            </Link>
          </div>
        </div>

        {/* Scroll GIF (bottom center → links to Featured) */}
        <a
          href="#featured"
          aria-label="Scroll to featured"
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20"
        >
          <Image
            src="/scroll.gif"
            alt="Scroll down"
            width={40}
            height={40}
            unoptimized     // keep GIF animation intact
            className="drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]"
          />
        </a>
      </section>

      {/* ================== MAIN CONTENT ================== */}
      <main className="space-y-24">
        {/* Featured products */}
        <Reveal>
          <section
            id="featured"
            className="px-6 md:px-16 scroll-mt-[var(--nav-h)]"
          >
            <div className="flex flex-col items-center">
              {/* Spacer box that centers heading */}
              <div
                className="flex flex-col justify-center items-center w-full"
                style={{ minHeight: "120px" }}
              >
                <h2 className="text-2xl md:text-3xl font-semibold text-center">
                  Featured
                </h2>
              </div>

              <ProductGrid />
            </div>
          </section>
        </Reveal>

        {/* Trust section */}
        <Reveal>
          <section className="px-6 md:px-16 rounded-2xl border p-8 md:p-12 bg-[var(--color-surface)] shadow-[0_10px_25px_-12px_rgba(0,0,0,0.08)]">
            <h3 className="text-xl md:text-2xl font-semibold mb-3">
              Trusted by a Working Dental Lab
            </h3>
            <p className="text-slate-700 leading-relaxed">
              At Dreamworks Dental, our products are backed by the expertise of
              a full-service dental lab with over 20 years of experience
              producing high-quality cases for doctors and patients. The same
              commitment to precision and reliability that has earned us the
              trust of dentists across North America is built into every product
              we offer.
            </p>
          </section>
        </Reveal>
      </main>
    </>
  );
}
