import React from "react";
import Link from "next/link";
import { Phone, MapPin, Flame } from "lucide-react";
import {
  BUSINESS_INFO,
  SERVICE_PAGES,
  LOCATION_PAGES,
  BLOG_PAGES,
  HOME_PAGE,
} from "@/data/siteData";

export default function Footer() {
  return (
    <footer className="bg-[#11182c] text-slate-300 relative overflow-hidden">
      {/* Subtle decorative starburst lines in footer matching Clenoz template */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 100%, #ffffff 1px, transparent 1px), repeating-conic-gradient(from 0deg at 50% 110%, rgba(255,255,255,0.2) 0deg 2deg, transparent 2deg 12deg)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Column 1: Brand & Verified Business Info */}
          <div className="lg:col-span-3 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[#f5d020] flex items-center justify-center text-[#11182c]">
                <Flame className="w-5 h-5 fill-[#11182c]" />
              </span>
              <span className="text-lg font-extrabold text-white tracking-tight">
                {BUSINESS_INFO.name}
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              {HOME_PAGE.metaDescription}
            </p>
            <div className="space-y-2.5 pt-2 text-xs">
              <div className="flex items-start gap-2.5 text-slate-300">
                <MapPin className="w-4 h-4 text-[#2285f5] shrink-0 mt-0.5" />
                <span>{BUSINESS_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-[#2285f5] shrink-0" />
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="hover:text-[#f5d020] font-semibold transition-colors"
                >
                  {BUSINESS_INFO.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="pt-2">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center gap-2 bg-[#f5d020] hover:bg-[#eab308] text-[#11182c] font-bold text-xs px-5 py-2.5 rounded-full transition-colors"
              >
                <Phone className="w-3.5 h-3.5 fill-[#11182c]" />
                <span>{BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Column 2: Chimney Services */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-2 text-xs">
              {SERVICE_PAGES.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={s.slug}
                    className="text-slate-400 hover:text-[#f5d020] transition-colors"
                  >
                    {s.pageTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Service Areas */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Locations
            </h3>
            <ul className="space-y-2 text-xs">
              {LOCATION_PAGES.map((loc) => (
                <li key={loc.slug}>
                  <Link
                    href={loc.slug}
                    className="text-slate-400 hover:text-[#f5d020] transition-colors"
                  >
                    {loc.pageTitle.replace("Chimney Sweep in ", "")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Visible Google Map Embed */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              {BUSINESS_INFO.address}
            </h3>
            <div className="rounded-xl overflow-hidden border-2 border-slate-700/80 shadow-lg bg-slate-900">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4015.428245425579!2d-96.4725696!3d32.7482916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x82c3c29391a05659%3A0xd5b1ec655768c2f4!2sBlackridge%20Chimney%20Sweep%20Forney!5e1!3m2!1sen!2sph!4v1792393195569!5m2!1sen!2sph"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Blackridge Chimney Sweep Forney Map"
                className="w-full h-56 sm:h-64"
              />
            </div>
          </div>
        </div>

        {/* Blog Links Strip */}
        <div className="py-6 border-b border-slate-800/80">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400">
            <Link href="/blog/" className="text-white font-bold hover:text-[#f5d020]">
              Blogs:
            </Link>
            {BLOG_PAGES.map((b) => (
              <Link
                key={b.slug}
                href={b.slug}
                className="hover:text-[#f5d020] transition-colors"
              >
                {b.pageTitle}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 text-center text-xs text-slate-500">
          © {BUSINESS_INFO.name} • {BUSINESS_INFO.address} •{" "}
          <a href={BUSINESS_INFO.phoneHref} className="text-slate-400 hover:text-[#f5d020]">
            {BUSINESS_INFO.phoneDisplay}
          </a>
        </div>
      </div>
    </footer>
  );
}
