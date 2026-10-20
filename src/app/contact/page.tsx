import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, Flame } from "lucide-react";
import {
  BUSINESS_INFO,
  CHIMNEY_IMAGES,
  HOME_PAGE,
  SERVICE_PAGES,
  LOCATION_PAGES,
} from "@/data/siteData";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: `Contact | ${BUSINESS_INFO.name}`,
  description: HOME_PAGE.metaDescription,
  alternates: {
    canonical: "/contact/",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Dark Navy Hero matching Clenoz reference design */}
      <section className="relative bg-[#11182c] text-white py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={CHIMNEY_IMAGES[0]}
            alt={BUSINESS_INFO.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#11182c] via-[#11182c]/90 to-[#11182c]/70" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="max-w-3xl space-y-5">
            <div className="flex items-center gap-3">
              <span className="w-10 h-1 bg-[#f5d020] rounded-full" />
              <span className="text-xs font-bold uppercase tracking-widest text-[#f5d020]">
                {BUSINESS_INFO.name}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              {BUSINESS_INFO.name}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg">
              {HOME_PAGE.metaDescription}
            </p>
            <div className="pt-2">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center gap-3 bg-[#f5d020] hover:bg-[#eab308] text-[#11182c] font-extrabold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg transition-all animate-pulse-glow"
              >
                <Phone className="w-5 h-5 fill-[#11182c]" />
                <span>Call Now: {BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Address, Phone & Google Map Section (No Contact Form) */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left Column: Address & Phone Details */}
            <Reveal className="lg:col-span-5 bg-white rounded-2xl shadow-lg border border-slate-200/80 p-8 sm:p-10 flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2.5 bg-[#f8fafc] border border-slate-200 px-3.5 py-1.5 rounded-md">
                  <Flame className="w-4 h-4 text-[#2285f5]" />
                  <span className="text-xs font-bold text-[#2285f5] uppercase tracking-wider">
                    {BUSINESS_INFO.name}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#11182c]">
                  {HOME_PAGE.sections[5]?.title || BUSINESS_INFO.name}
                </h2>

                {/* Phone Card */}
                <div className="flex items-start gap-4 p-5 rounded-xl bg-[#f8fafc] border border-slate-200/80">
                  <div className="w-12 h-12 rounded-xl bg-[#f5d020] text-[#11182c] flex items-center justify-center shrink-0 shadow-xs">
                    <Phone className="w-6 h-6 fill-[#11182c]" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      Phone
                    </span>
                    <a
                      href={BUSINESS_INFO.phoneHref}
                      className="text-xl sm:text-2xl font-extrabold text-[#11182c] hover:text-[#2285f5] transition-colors mt-0.5 block"
                    >
                      {BUSINESS_INFO.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Address Card */}
                <div className="flex items-start gap-4 p-5 rounded-xl bg-[#f8fafc] border border-slate-200/80">
                  <div className="w-12 h-12 rounded-xl bg-[#11182c] text-[#f5d020] flex items-center justify-center shrink-0 shadow-xs">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                      Address
                    </span>
                    <p className="text-base sm:text-lg font-bold text-[#11182c] mt-0.5 leading-snug">
                      {BUSINESS_INFO.address}
                    </p>
                  </div>
                </div>

                {/* Service Areas */}
                <div className="pt-2 space-y-2.5">
                  <span className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Locations
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {LOCATION_PAGES.map((loc) => (
                      <Link
                        key={loc.slug}
                        href={loc.slug}
                        className="text-xs font-semibold bg-[#f8fafc] hover:bg-[#2285f5] text-slate-700 hover:text-white border border-slate-200 px-3 py-1.5 rounded-lg transition-colors"
                      >
                        {loc.pageTitle.replace("Chimney Sweep in ", "")}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* Direct Call CTA Button */}
              <div className="pt-4">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="w-full inline-flex items-center justify-center gap-3 bg-[#f5d020] hover:bg-[#eab308] text-[#11182c] font-extrabold text-base px-8 py-4 rounded-full shadow-md transition-all"
                >
                  <Phone className="w-5 h-5 fill-[#11182c]" />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>
            </Reveal>

            {/* Right Column: Visible Google Map Embed */}
            <Reveal
              delay={120}
              className="lg:col-span-7 bg-white rounded-2xl shadow-lg border border-slate-200/80 overflow-hidden min-h-[450px] flex flex-col"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4015.428245425579!2d-96.4725696!3d32.7482916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x82c3c29391a05659%3A0xd5b1ec655768c2f4!2sBlackridge%20Chimney%20Sweep%20Forney!5e1!3m2!1sen!2sph!4v1792393195569!5m2!1sen!2sph"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Blackridge Chimney Sweep Forney Location Map"
                className="w-full flex-1 min-h-[450px]"
              />
            </Reveal>
          </div>

          {/* Core Services Strip */}
          <div className="mt-14 bg-white rounded-2xl p-8 border border-slate-200/80 shadow-xs">
            <h2 className="text-lg font-extrabold text-[#11182c] mb-4">
              {HOME_PAGE.sections[0]?.title}
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {SERVICE_PAGES.map((s) => (
                <Link
                  key={s.slug}
                  href={s.slug}
                  className="text-xs font-bold bg-[#f8fafc] hover:bg-[#11182c] text-[#11182c] hover:text-[#f5d020] border border-slate-200 px-4 py-2 rounded-lg transition-colors"
                >
                  {s.pageTitle}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pre-Footer Yellow CTA Bar */}
      <section className="bg-[#f5d020] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#11182c]">
              {BUSINESS_INFO.name}
            </h2>
            <p className="text-sm font-medium text-[#11182c]/85 mt-1">
              {BUSINESS_INFO.address}
            </p>
          </div>
          <a
            href={BUSINESS_INFO.phoneHref}
            className="inline-flex items-center gap-2.5 bg-[#11182c] hover:bg-slate-800 text-white font-extrabold text-sm px-8 py-4 rounded-full shadow-lg transition-all shrink-0"
          >
            <Phone className="w-4 h-4 text-[#f5d020]" />
            <span>Call {BUSINESS_INFO.phoneDisplay}</span>
          </a>
        </div>
      </section>
    </div>
  );
}
