import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Phone, MapPin, ArrowRight } from "lucide-react";
import {
  BLOG_PAGES,
  SERVICE_PAGES,
  LOCATION_PAGES,
  BUSINESS_INFO,
  CHIMNEY_IMAGES,
} from "@/data/siteData";
import Reveal from "@/components/Reveal";

function normalizeBlogSlug(slug: string) {
  return `/blog/${slug.replace(/^\/+|\/+$/g, "")}/`;
}

export function generateStaticParams() {
  return BLOG_PAGES.map((b) => ({
    slug: b.slug.replace(/^\/blog\/|\/+$/g, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const target = normalizeBlogSlug(slug);
  const post = BLOG_PAGES.find((b) => b.slug === target);
  if (!post) return {};
  return {
    title: post.seoTitle,
    description: post.metaDescription,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const target = normalizeBlogSlug(slug);
  const idx = BLOG_PAGES.findIndex((b) => b.slug === target);
  if (idx === -1) {
    notFound();
  }
  const post = BLOG_PAGES[idx];
  const heroImg = CHIMNEY_IMAGES[(idx + 6) % CHIMNEY_IMAGES.length];
  const secondaryImg = CHIMNEY_IMAGES[(idx + 11) % CHIMNEY_IMAGES.length];

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero Section */}
      <section className="relative bg-[#11182c] text-white py-20 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImg}
            alt={post.h1}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#11182c] via-[#11182c]/90 to-[#11182c]/70" />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          <div className="flex items-center gap-3">
            <span className="w-10 h-1 bg-[#f5d020] rounded-full" />
            <Link
              href="/blog/"
              className="text-xs font-bold uppercase tracking-widest text-[#f5d020] hover:underline"
            >
              {BUSINESS_INFO.name} • {post.pageType}
            </Link>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white leading-tight">
            {post.h1}
          </h1>
          <div className="pt-2">
            <a
              href={BUSINESS_INFO.phoneHref}
              className="inline-flex items-center gap-2.5 bg-[#f5d020] hover:bg-[#eab308] text-[#11182c] font-extrabold text-sm px-7 py-3.5 rounded-full shadow-lg transition-all"
            >
              <Phone className="w-4 h-4 fill-[#11182c]" />
              <span>Call {BUSINESS_INFO.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Article Content + Sidebar */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Main Article Column rendering exact HTML from the Google Sheet */}
            <Reveal className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
              <div className="relative h-72 sm:h-96 bg-[#11182c]">
                <Image
                  src={heroImg}
                  alt={post.h1}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
              </div>
              <div className="p-7 sm:p-10 lg:p-12">
                <div
                  className="sheet-html text-slate-700 text-base leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: post.rawHtml.replace(/<h1[^>]*>[\s\S]*?<\/h1>/i, ""),
                  }}
                />
              </div>
            </Reveal>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              {/* Call CTA Card */}
              <div className="bg-[#11182c] text-white rounded-2xl p-7 shadow-lg space-y-5">
                <div className="relative h-44 rounded-xl overflow-hidden">
                  <Image
                    src={secondaryImg}
                    alt={BUSINESS_INFO.name}
                    fill
                    sizes="350px"
                    className="object-cover"
                  />
                </div>
                <h2 className="text-xl font-extrabold text-white">
                  {BUSINESS_INFO.name}
                </h2>
                <p className="text-xs text-slate-300 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#f5d020] shrink-0 mt-0.5" />
                  <span>{BUSINESS_INFO.address}</span>
                </p>
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#f5d020] hover:bg-[#eab308] text-[#11182c] font-extrabold text-sm px-6 py-3.5 rounded-full shadow-md transition-all"
                >
                  <Phone className="w-4 h-4 fill-[#11182c]" />
                  <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>

              {/* Services List */}
              <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs space-y-4">
                <h2 className="text-base font-extrabold text-[#11182c] uppercase tracking-wider">
                  Services
                </h2>
                <ul className="space-y-2.5 text-xs font-semibold">
                  {SERVICE_PAGES.map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={s.slug}
                        className="flex items-center justify-between py-1.5 text-slate-700 hover:text-[#2285f5] transition-colors"
                      >
                        <span>{s.pageTitle}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#2285f5] shrink-0" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Locations List */}
              <div className="bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs space-y-4">
                <h2 className="text-base font-extrabold text-[#11182c] uppercase tracking-wider">
                  Locations
                </h2>
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
