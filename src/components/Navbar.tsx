import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[var(--color-brand-500)] backdrop-blur shadow-md">
      {/* Full-width bar with thinner height */}
      <nav className="w-full h-16 flex items-center justify-between px-4 md:px-6">
        
        {/* Left: logo + name */}
        <Link href="/" className="flex items-center gap-2 text-white">
          <Image
            src="/logo.png"
            alt="DreamWorks Resin"
            width={36}
            height={36}
            priority
          />
          <span className="font-semibold tracking-tight text-base md:text-lg">
            DreamWorks Resin
          </span>
        </Link>

        {/* Right: nav links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-medium">
          {["Resins", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="relative text-white transition after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-white after:transition-all hover:after:w-full"
            >
              {item}
            </Link>
          ))}

          {/* CTA */}
          <Link
            href="/shop"
            className="ml-4 rounded-lg px-4 py-2 bg-white text-[var(--color-brand-600)] font-semibold shadow hover:bg-slate-100 transition"
          >
            Shop Now
          </Link>
        </div>
      </nav>
    </header>
  );
}