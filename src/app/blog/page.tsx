import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Phone, ArrowRight, FileText } from "lucide-react";
import {
  BUSINESS_INFO,
  BLOG_PAGES,
  CHIMNEY_IMAGES,
  HOME_PAGE,
} from "@/data/siteData";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: `${BUSINESS_INFO.name} | Blogs`,
  description: HOME_PAGE.metaDescription,
  alternates: {
    canonical: "/blog/",
  },
};

export default function BlogIndexPage() {
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Dark Navy Hero matching Clenoz template */}
      <section className="relative bg-[#11182c] text-white py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={CHIMNEY_IMAGES[4]}
            alt={BUSINESS_INFO.name}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-20"
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
              Blogs & Articles
            </h1>
            <p className="text-slate-300 text-base sm:text-lg">
              {HOME_PAGE.metaDescription}
            </p>
            <div className="pt-2">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center gap-2.5 bg-[#f5d020] hover:bg-[#eab308] text-[#11182c] font-extrabold text-sm px-7 py-3.5 rounded-full shadow-lg transition-all"
              >
                <Phone className="w-4 h-4 fill-[#11182c]" />
                <span>Call {BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BLOG_PAGES.map((blog, idx) => (
              <Reveal
                key={blog.slug}
                delay={(idx % 3) * 80}
                className="group bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col"
              >
                <div className="relative h-52 bg-[#11182c] overflow-hidden">
                  <Image
                    src={CHIMNEY_IMAGES[(idx + 5) % CHIMNEY_IMAGES.length]}
                    alt={blog.pageTitle}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 pt-8 relative flex-1 flex flex-col">
                  <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-[#f5d020] text-[#11182c] flex items-center justify-center shadow-md">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h2 className="text-lg font-extrabold text-[#11182c] group-hover:text-[#2285f5] transition-colors mb-2.5">
                    <Link href={blog.slug}>{blog.pageTitle}</Link>
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5 flex-1">
                    {blog.metaDescription}
                  </p>
                  <div className="pt-4 border-t border-slate-100">
                    <Link
                      href={blog.slug}
                      className="inline-flex items-center gap-1.5 text-xs font-extrabold text-[#2285f5] hover:text-[#11182c] transition-colors"
                    >
                      <span>{blog.pageTitle}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
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
