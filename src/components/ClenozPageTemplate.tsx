import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  CheckCircle2,
  Flame,
  ShieldCheck,
  Sparkles,
  Wrench,
  Search,
  ArrowRight,
  ChevronRight,
  MapPin,
  FileText,
} from "lucide-react";
import {
  BUSINESS_INFO,
  CHIMNEY_IMAGES,
  HOME_PAGE,
  BLOG_PAGES,
  SERVICE_PAGES,
  SheetPageData,
  PageSection,
} from "@/data/siteData";
import Reveal from "./Reveal";

interface Props {
  page: SheetPageData;
  imageOffset?: number;
}

function getImg(index: number) {
  return CHIMNEY_IMAGES[Math.abs(index) % CHIMNEY_IMAGES.length];
}

/**
 * Helper to ensure 100% of a section's content (introHtml, cards/h3Items/listItems/contentHtml, outroHtml) is rendered
 */
function SectionBodyRenderer({
  section,
  dark = false,
}: {
  section: PageSection;
  dark?: boolean;
}) {
  const htmlClass = dark
    ? "sheet-html sheet-html-dark text-slate-300 text-sm sm:text-base"
    : "sheet-html text-slate-600 text-sm sm:text-base";

  if (
    section.cards.length === 0 &&
    section.h3Items.length === 0 &&
    section.listItems.length === 0
  ) {
    return (
      <div
        className={htmlClass}
        dangerouslySetInnerHTML={{ __html: section.contentHtml }}
      />
    );
  }

  return (
    <div className="space-y-5">
      {section.introHtml && (
        <div
          className={htmlClass}
          dangerouslySetInnerHTML={{ __html: section.introHtml }}
        />
      )}

      {section.listItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
          {section.listItems.map((item, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 p-3.5 rounded-xl border ${
                dark
                  ? "bg-slate-800/70 border-slate-700 text-slate-200"
                  : "bg-slate-50/90 border-slate-200/80 text-slate-700"
              }`}
            >
              <span className="w-6 h-6 rounded-full bg-[#2285f5] text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {section.isOrderedList ? (
                  idx + 1
                ) : (
                  <CheckCircle2 className="w-3.5 h-3.5" />
                )}
              </span>
              <div
                className={`text-xs sm:text-sm leading-relaxed ${
                  dark ? "sheet-html-dark" : "sheet-html"
                }`}
                dangerouslySetInnerHTML={{ __html: item }}
              />
            </div>
          ))}
        </div>
      )}

      {section.h3Items.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          {section.h3Items.map((item, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl border ${
                dark
                  ? "bg-slate-800/80 border-slate-700"
                  : "bg-white border-slate-200/80 shadow-xs"
              }`}
            >
              <h3
                className={`text-base font-bold mb-2 ${
                  dark ? "text-[#f5d020]" : "text-[#11182c]"
                }`}
              >
                {item.title}
              </h3>
              <div
                className={htmlClass}
                dangerouslySetInnerHTML={{ __html: item.html }}
              />
            </div>
          ))}
        </div>
      )}

      {section.cards.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-1">
          {section.cards.map((card, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-xl border ${
                dark
                  ? "bg-slate-800/80 border-slate-700"
                  : "bg-white border-slate-200 shadow-xs"
              }`}
            >
              <h3
                className={`text-base font-bold mb-2 ${
                  dark ? "text-[#f5d020]" : "text-[#11182c]"
                }`}
              >
                {card.title}
              </h3>
              <div
                className={htmlClass}
                dangerouslySetInnerHTML={{ __html: card.html }}
              />
            </div>
          ))}
        </div>
      )}

      {section.outroHtml && (
        <div
          className={htmlClass}
          dangerouslySetInnerHTML={{ __html: section.outroHtml }}
        />
      )}
    </div>
  );
}

export default function ClenozPageTemplate({ page, imageOffset = 0 }: Props) {
  const sections = page.sections;
  const ctaSection =
    sections.length > 0 ? sections[sections.length - 1] : undefined;
  const bodySections = sections.slice(0, -1);

  // Organize bodySections into visual slots of the Clenoz design template without losing or duplicating any section
  let aboutSection: PageSection | undefined;
  let offeringSection: PageSection | undefined;
  let darkBannerSection: PageSection | undefined;
  let blueCardsSection: PageSection | undefined;
  let splitFeatureSection: PageSection | undefined;
  const extraSections: PageSection[] = [];

  if (page.category === "home") {
    // Homepage sections:
    // 0: Core Chimney Services in Forney (cards)
    // 1: Why Choose Blackridge Chimney Sweep Forney? (list)
    // 2: Our Chimney Cleaning Process (ordered list)
    // 3: Common Chimney Problems We Help Solve (h3Items)
    // 4: When Should You Schedule Chimney Service? (paragraphs + CSIA link)
    // 5: Serving Forney and Nearby Communities (paragraphs + location links)
    // 6: Frequently Asked Questions (h3Items)
    offeringSection = bodySections[0];
    aboutSection = bodySections[1];
    splitFeatureSection = bodySections[2];
    blueCardsSection = bodySections[3];
    darkBannerSection = bodySections[4];
    if (bodySections[5]) extraSections.push(bodySections[5]);
    if (bodySections[6]) extraSections.push(bodySections[6]);
  } else if (page.category === "location") {
    // Location pages have 5 bodySections + 1 ctaSection:
    // 0: Local focus (paragraphs)
    // 1: Core Chimney Services (3 cards)
    // 2: 5-step process (ordered list)
    // 3: Safety / CSIA or NFPA (paragraphs + external link)
    // 4: FAQs (h3Items)
    aboutSection = bodySections[0];
    offeringSection = bodySections[1];
    blueCardsSection = bodySections[2];
    darkBannerSection = bodySections[3];
    splitFeatureSection = bodySections[4];
  } else {
    // Service pages (2 to 9 bodySections):
    // Find if any section has .cards
    const usedIndices = new Set<number>();
    const cardIdx = bodySections.findIndex((s) => s.cards.length > 0);
    if (cardIdx !== -1) {
      offeringSection = bodySections[cardIdx];
      usedIndices.add(cardIdx);
    }

    const remaining = bodySections
      .map((s, idx) => ({ s, idx }))
      .filter((x) => !usedIndices.has(x.idx));

    if (remaining.length > 0) {
      aboutSection = remaining[0].s;
      usedIndices.add(remaining[0].idx);
    }
    if (!offeringSection && remaining.length > 2) {
      offeringSection = remaining[1].s;
      usedIndices.add(remaining[1].idx);
    }
    const afterOffering = bodySections
      .map((s, idx) => ({ s, idx }))
      .filter((x) => !usedIndices.has(x.idx));

    if (afterOffering.length > 0) {
      darkBannerSection = afterOffering[0].s;
      usedIndices.add(afterOffering[0].idx);
    }
    if (afterOffering.length > 1) {
      blueCardsSection = afterOffering[1].s;
      usedIndices.add(afterOffering[1].idx);
    }
    if (afterOffering.length > 2) {
      splitFeatureSection = afterOffering[2].s;
      usedIndices.add(afterOffering[2].idx);
    }
    for (let i = 3; i < afterOffering.length; i++) {
      extraSections.push(afterOffering[i].s);
    }
  }

  // Fallback visual cards from HOME_PAGE if a short service page has fewer than 5 sections
  const fallbackOfferingSection = HOME_PAGE.sections[0];
  const fallbackBlueSection = HOME_PAGE.sections[3];
  const fallbackSplitSection = HOME_PAGE.sections[2];

  const activeOffering = offeringSection || fallbackOfferingSection;
  const activeBlue = blueCardsSection || fallbackBlueSection;
  const activeSplit = splitFeatureSection || fallbackSplitSection;

  const cardIcons = [Flame, Search, Wrench, ShieldCheck];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* =====================================================================
          SECTION 1: DARK NAVY HERO (Clenoz Template Top Hero)
      ===================================================================== */}
      <section className="relative bg-[#11182c] text-white overflow-hidden pt-14 pb-24 lg:py-28">
        {/* Background WebP chimney photo with dark navy gradient overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={getImg(imageOffset)}
            alt={page.h1}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-25 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#11182c] via-[#11182c]/90 to-[#11182c]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <Reveal className="lg:col-span-8 space-y-6">
              {/* Yellow accent bar + tag */}
              <div className="flex items-center gap-3">
                <span className="w-10 h-1 bg-[#f5d020] rounded-full" />
                <span className="text-xs font-bold uppercase tracking-widest text-[#f5d020]">
                  {BUSINESS_INFO.name}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold tracking-tight text-white leading-[1.12]">
                {page.h1}
              </h1>

              {page.heroHtml && (
                <div
                  className="sheet-html sheet-html-dark text-slate-200 text-base sm:text-lg max-w-2xl leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: page.heroHtml }}
                />
              )}

              {/* Single Phone CTA Button as requested */}
              <div className="pt-2">
                <a
                  href={BUSINESS_INFO.phoneHref}
                  className="inline-flex items-center gap-3 bg-[#f5d020] hover:bg-[#eab308] text-[#11182c] font-extrabold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg hover:scale-[1.02] transition-all duration-200 animate-pulse-glow"
                >
                  <Phone className="w-5 h-5 fill-[#11182c]" />
                  <span>Call Now: {BUSINESS_INFO.phoneDisplay}</span>
                </a>
              </div>
            </Reveal>

            {/* Right decorative circular indicators & framed preview matching Clenoz hero */}
            <div className="hidden lg:flex lg:col-span-4 items-center justify-end gap-6">
              <div className="relative w-72 h-80 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
                <Image
                  src={getImg(imageOffset + 1)}
                  alt={page.pageTitle}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href="#about-section"
                  aria-label="Scroll to content"
                  className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:bg-[#f5d020] hover:text-[#11182c] hover:border-[#f5d020] transition-colors"
                >
                  <ChevronRight className="w-4 h-4 -rotate-90" />
                </a>
                <a
                  href="#offering-section"
                  aria-label="Scroll to services"
                  className="w-11 h-11 rounded-full border border-white/30 flex items-center justify-center text-white/80 hover:bg-[#f5d020] hover:text-[#11182c] hover:border-[#f5d020] transition-colors"
                >
                  <ChevronRight className="w-4 h-4 rotate-90" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 2: OVERLAPPING IMAGES + FEATURE SPLIT (Clenoz Section 2)
      ===================================================================== */}
      {aboutSection && (
        <section
          id="about-section"
          className="relative bg-white py-20 lg:py-28 overflow-visible"
        >
          {/* Subtle left gray backdrop block matching Clenoz template */}
          <div className="hidden lg:block absolute top-0 left-0 w-[30%] h-full bg-[#f8fafc] pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Top-right floating Yellow Square Badge overlapping the Hero boundary */}
            <div className="hidden md:flex lg:absolute lg:-top-36 lg:right-8 z-20 mb-10 lg:mb-0 justify-end">
              <div className="bg-[#f5d020] text-[#11182c] w-52 p-6 rounded-xl shadow-xl flex flex-col items-center text-center animate-float">
                <Flame className="w-10 h-10 stroke-[2.2] mb-2 text-[#11182c]" />
                <span className="text-xl font-black tracking-tight leading-tight">
                  {BUSINESS_INFO.phoneDisplay}
                </span>
                <span className="text-[11px] font-bold uppercase tracking-wider mt-1 opacity-85">
                  {BUSINESS_INFO.name}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              {/* Left Column: Two Overlapping Dark-Framed Chimney WebP Images + Yellow Callout Box */}
              <Reveal className="lg:col-span-6 relative">
                <div className="relative mx-auto max-w-md lg:max-w-none">
                  {/* Main Top-Left Image */}
                  <div className="relative w-[85%] h-80 sm:h-96 rounded-xl overflow-hidden bg-[#11182c] shadow-xl border-4 border-white">
                    <Image
                      src={getImg(imageOffset + 2)}
                      alt={aboutSection.title}
                      fill
                      sizes="(max-width: 1024px) 90vw, 45vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Secondary Bottom-Right Overlapping Image */}
                  <div className="relative -mt-28 ml-auto w-[68%] h-60 sm:h-64 rounded-xl overflow-hidden bg-[#11182c] shadow-2xl border-8 border-white z-10">
                    <Image
                      src={getImg(imageOffset + 3)}
                      alt={page.pageTitle}
                      fill
                      sizes="(max-width: 1024px) 70vw, 35vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Floating Yellow Badge on Bottom-Left */}
                  <div className="absolute bottom-6 left-2 sm:left-6 z-20 bg-[#f5d020] text-[#11182c] px-5 py-4 rounded-lg shadow-lg max-w-[230px]">
                    <p className="text-xs font-extrabold leading-snug">
                      {BUSINESS_INFO.address}
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Right Column: Section Heading, Content, Checkmarks & Yellow Phone Button */}
              <Reveal delay={120} className="lg:col-span-6 space-y-6">
                <div className="inline-flex items-center gap-2 bg-[#f8fafc] border border-slate-200 px-3.5 py-1.5 rounded-md">
                  <span className="w-2 h-2 rounded-full bg-[#2285f5]" />
                  <span className="text-xs font-bold text-[#2285f5] uppercase tracking-wider">
                    {BUSINESS_INFO.name}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-[#11182c] leading-tight">
                  {aboutSection.title}
                </h2>

                <SectionBodyRenderer section={aboutSection} />

                <div className="pt-2">
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex items-center gap-2.5 bg-[#f5d020] hover:bg-[#eab308] text-[#11182c] font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-full shadow-md transition-all duration-200"
                  >
                    <Phone className="w-4 h-4 fill-[#11182c]" />
                    <span>Call {BUSINESS_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 3: "WHAT WE'RE OFFERING" 3-COLUMN CARDS (Clenoz Section 3)
      ===================================================================== */}
      <section
        id="offering-section"
        className="bg-[#f8fafc] py-20 lg:py-24 border-y border-slate-200/60"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#2285f5]">
              {BUSINESS_INFO.name}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#11182c]">
              {activeOffering.title}
            </h2>
            {activeOffering.introHtml && (
              <div
                className="sheet-html text-slate-600 text-sm sm:text-base pt-1"
                dangerouslySetInnerHTML={{ __html: activeOffering.introHtml }}
              />
            )}
          </Reveal>

          {activeOffering.cards.length > 0 ? (
            <div
              className={`grid grid-cols-1 md:grid-cols-2 ${
                activeOffering.cards.length === 4
                  ? "lg:grid-cols-4"
                  : "lg:grid-cols-3"
              } gap-8`}
            >
              {activeOffering.cards.map((card, idx) => {
                const IconComp = cardIcons[idx % cardIcons.length];
                return (
                  <Reveal
                    key={idx}
                    delay={idx * 100}
                    className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col"
                  >
                    {/* Top Image Container with Hover Yellow CTA Button like Clenoz Middle Card */}
                    <div className="relative h-52 bg-[#11182c] overflow-hidden">
                      <Image
                        src={getImg(imageOffset + 4 + idx)}
                        alt={card.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-[#11182c]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <a
                          href={BUSINESS_INFO.phoneHref}
                          className="bg-[#f5d020] text-[#11182c] font-extrabold text-xs px-5 py-2.5 rounded-full shadow-md"
                        >
                          Call {BUSINESS_INFO.phoneDisplay}
                        </a>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="p-7 flex-1 flex flex-col">
                      <div className="w-12 h-12 rounded-lg bg-[#f5d020]/20 text-[#11182c] group-hover:bg-[#f5d020] transition-colors flex items-center justify-center mb-5">
                        <IconComp className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-extrabold text-[#11182c] mb-2.5">
                        {card.title}
                      </h3>
                      <div
                        className="sheet-html text-slate-600 text-sm leading-relaxed flex-1"
                        dangerouslySetInnerHTML={{ __html: card.html }}
                      />
                    </div>
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <Reveal className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/80">
              <SectionBodyRenderer section={activeOffering} />
            </Reveal>
          )}

          {activeOffering.outroHtml && activeOffering.cards.length > 0 && (
            <div
              className="sheet-html text-center text-slate-600 text-sm sm:text-base max-w-3xl mx-auto mt-8"
              dangerouslySetInnerHTML={{ __html: activeOffering.outroHtml }}
            />
          )}
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: DARK NAVY FULL-WIDTH FEATURE BANNER (Clenoz Section 4)
      ===================================================================== */}
      {darkBannerSection && (
        <section className="relative bg-[#11182c] text-white py-20 lg:py-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src={getImg(imageOffset + 7)}
              alt={darkBannerSection.title}
              fill
              sizes="100vw"
              className="object-cover opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#11182c] via-[#11182c]/95 to-[#11182c]/75" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              <Reveal className="lg:col-span-8 space-y-6">
                {/* Yellow Circular Badge Button matching Clenoz Dark Section */}
                <a
                  href={BUSINESS_INFO.phoneHref}
                  aria-label="Call Blackridge Chimney Sweep Forney"
                  className="w-14 h-14 rounded-full bg-[#f5d020] text-[#11182c] flex items-center justify-center shadow-lg hover:scale-105 transition-transform animate-pulse-glow"
                >
                  <Phone className="w-6 h-6 fill-[#11182c]" />
                </a>

                <h2 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                  {darkBannerSection.title}
                </h2>

                <SectionBodyRenderer section={darkBannerSection} dark />
              </Reveal>

              <Reveal delay={150} className="lg:col-span-4">
                <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden border-4 border-white/10 shadow-2xl">
                  <Image
                    src={getImg(imageOffset + 8)}
                    alt={darkBannerSection.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 5: VIBRANT BLUE CARDS SECTION (Clenoz Section 5)
      ===================================================================== */}
      <section className="relative bg-[#2285f5] py-20 lg:py-28 overflow-hidden text-white">
        {/* Radial Sunburst & Sparkle Pattern matching Clenoz Blue Section */}
        <div
          className="pointer-events-none absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "repeating-conic-gradient(from 0deg at 50% 0%, rgba(255,255,255,0.28) 0deg 3deg, transparent 3deg 15deg)",
          }}
        />
        <Sparkles className="pointer-events-none absolute right-10 bottom-10 w-24 h-24 text-white/15" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center max-w-3xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#f5d020]">
              {BUSINESS_INFO.name}
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              {activeBlue.title}
            </h2>
            {activeBlue.introHtml && (
              <div
                className="sheet-html sheet-html-dark text-white/90 text-sm sm:text-base"
                dangerouslySetInnerHTML={{ __html: activeBlue.introHtml }}
              />
            )}
          </Reveal>

          {/* Render h3Items or listItems as White Cards with Dark Square Top-Left Icon and Bottom Yellow Circle Badge */}
          {activeBlue.h3Items.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeBlue.h3Items.map((item, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 80}
                  className="relative bg-white text-slate-800 rounded-xl p-7 pb-10 shadow-xl flex flex-col"
                >
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-11 h-11 rounded-lg bg-[#11182c] text-[#f5d020] font-extrabold text-sm flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </div>
                    <h3 className="text-base font-extrabold text-[#11182c] leading-snug">
                      {item.title}
                    </h3>
                  </div>
                  <div
                    className="sheet-html text-slate-600 text-xs sm:text-sm leading-relaxed flex-1"
                    dangerouslySetInnerHTML={{ __html: item.html }}
                  />
                  {/* Bottom overlapping yellow circle badge matching Clenoz template */}
                  <div className="absolute -bottom-4 left-7 w-8 h-8 rounded-full bg-[#f5d020] text-[#11182c] flex items-center justify-center shadow-md font-bold text-xs">
                    ✓
                  </div>
                </Reveal>
              ))}
            </div>
          ) : activeBlue.listItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeBlue.listItems.map((li, idx) => (
                <Reveal
                  key={idx}
                  delay={idx * 80}
                  className="relative bg-white text-slate-800 rounded-xl p-7 pb-10 shadow-xl flex flex-col"
                >
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-11 h-11 rounded-lg bg-[#11182c] text-[#f5d020] font-extrabold text-sm flex items-center justify-center shrink-0">
                      0{idx + 1}
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2285f5]">
                      {BUSINESS_INFO.name}
                    </span>
                  </div>
                  <div
                    className="sheet-html text-slate-600 text-xs sm:text-sm leading-relaxed flex-1"
                    dangerouslySetInnerHTML={{ __html: li }}
                  />
                  <div className="absolute -bottom-4 left-7 w-8 h-8 rounded-full bg-[#f5d020] text-[#11182c] flex items-center justify-center shadow-md font-bold text-xs">
                    ✓
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal className="bg-white text-slate-800 rounded-2xl p-8 shadow-xl max-w-4xl mx-auto">
              <SectionBodyRenderer section={activeBlue} />
            </Reveal>
          )}

          {activeBlue.outroHtml &&
            (activeBlue.h3Items.length > 0 || activeBlue.listItems.length > 0) && (
              <div
                className="sheet-html sheet-html-dark text-center text-white/95 text-sm sm:text-base max-w-3xl mx-auto mt-10"
                dangerouslySetInnerHTML={{ __html: activeBlue.outroHtml }}
              />
            )}
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: WHITE SPLIT FEATURE + DARK NAVY 4-ICON STRIP (Clenoz Section 6 & 7)
      ===================================================================== */}
      <section className="relative bg-white pt-20 pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 sm:p-10 lg:p-12 -mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left Column: Dark-Framed Image with White Floating Card Overlay */}
              <Reveal className="lg:col-span-5">
                <div className="relative h-96 sm:h-[430px] rounded-xl overflow-hidden bg-[#11182c] shadow-lg">
                  <Image
                    src={getImg(imageOffset + 9)}
                    alt={activeSplit.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                  {/* Floating White Card at Bottom of Image matching Clenoz template */}
                  <div className="absolute bottom-5 left-5 right-5 bg-white rounded-xl p-4 shadow-lg flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-[#11182c] text-[#f5d020] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-extrabold text-[#11182c] truncate">
                        {BUSINESS_INFO.name}
                      </p>
                      <p className="text-[11px] text-slate-500 leading-snug">
                        {BUSINESS_INFO.address}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Right Column: Content + Blue Checkmark Pills + Yellow Rounded Call Box */}
              <Reveal delay={120} className="lg:col-span-7 space-y-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#2285f5]">
                  {BUSINESS_INFO.name}
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#11182c]">
                  {activeSplit.title}
                </h2>

                <SectionBodyRenderer section={activeSplit} />

                {/* Large Yellow Rounded Call Box matching Clenoz template */}
                <div className="pt-2">
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    className="inline-flex items-center gap-4 bg-[#f5d020] hover:bg-[#eab308] text-[#11182c] px-6 py-4 rounded-2xl shadow-md transition-all group"
                  >
                    <span className="w-11 h-11 rounded-xl bg-[#11182c] text-[#f5d020] flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Phone className="w-5 h-5" />
                    </span>
                    <div className="text-left">
                      <span className="block text-[11px] font-bold uppercase tracking-wider opacity-80">
                        {BUSINESS_INFO.name}
                      </span>
                      <span className="block text-base sm:text-lg font-black">
                        Call {BUSINESS_INFO.phoneDisplay}
                      </span>
                    </div>
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* Dark Navy 4-Icon Strip underneath the overlapping White Card */}
        <div className="bg-[#11182c] pt-24 pb-14 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              {SERVICE_PAGES.slice(0, 4).map((srv, idx) => {
                const IconComp = cardIcons[idx % cardIcons.length];
                return (
                  <Link
                    key={srv.slug}
                    href={srv.slug}
                    className="group flex flex-col items-center space-y-2.5 p-4 rounded-xl hover:bg-white/5 transition-colors"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#f5d020]/15 text-[#f5d020] flex items-center justify-center group-hover:bg-[#f5d020] group-hover:text-[#11182c] transition-colors">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-white group-hover:text-[#f5d020] transition-colors">
                      {srv.pageTitle.replace(" in Forney, TX", "")}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ADDITIONAL SECTIONS (FAQs, Service Areas, or Extra Sections on Long Pages)
          Ensures 100% of every section from the Google Sheet is rendered!
      ===================================================================== */}
      {extraSections.length > 0 && (
        <section className="bg-[#f8fafc] py-20 border-b border-slate-200/70">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {extraSections.map((sec, idx) => (
              <Reveal
                key={idx}
                className="bg-white rounded-2xl p-7 sm:p-10 shadow-sm border border-slate-200/80 space-y-5"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-1 bg-[#f5d020] rounded-full" />
                  <span className="text-xs font-bold uppercase tracking-widest text-[#2285f5]">
                    {BUSINESS_INFO.name}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#11182c]">
                  {sec.title}
                </h2>
                <SectionBodyRenderer section={sec} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* =====================================================================
          SECTION 7: NEWS & ARTICLES (BLOGS) + 5-IMAGE GALLERY STRIP (Clenoz Section 8)
      ===================================================================== */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#2285f5]">
                {BUSINESS_INFO.name}
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#11182c] mt-1">
                Blogs & Articles
              </h2>
            </div>
            <Link
              href="/blog/"
              className="inline-flex items-center gap-2 bg-[#f5d020] hover:bg-[#eab308] text-[#11182c] font-extrabold text-xs px-6 py-3 rounded-full shadow-xs transition-colors self-start sm:self-auto"
            >
              <span>Blogs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 3 Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {BLOG_PAGES.slice(0, 3).map((blog, idx) => (
              <Reveal
                key={blog.slug}
                delay={idx * 100}
                className="group bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl transition-all flex flex-col"
              >
                <div className="relative h-48 bg-[#11182c] overflow-hidden">
                  <Image
                    src={getImg(imageOffset + 10 + idx)}
                    alt={blog.pageTitle}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 pt-8 relative flex-1 flex flex-col">
                  {/* Overlapping Yellow Circle Badge matching Clenoz Blog Cards */}
                  <div className="absolute -top-5 left-6 w-10 h-10 rounded-full bg-[#f5d020] text-[#11182c] flex items-center justify-center shadow-md">
                    <FileText className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-extrabold text-[#11182c] group-hover:text-[#2285f5] transition-colors mb-2 line-clamp-2">
                    <Link href={blog.slug}>{blog.pageTitle}</Link>
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4 flex-1">
                    {blog.metaDescription}
                  </p>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#2285f5]">
                    <Link
                      href={blog.slug}
                      className="inline-flex items-center gap-1 hover:text-[#11182c]"
                    >
                      <span>{blog.pageTitle}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* 5-Column Image Gallery Strip matching Clenoz Template */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[0, 1, 2, 3, 4].map((gIdx) => (
              <div
                key={gIdx}
                className="group relative h-44 sm:h-52 rounded-xl overflow-hidden bg-[#11182c]"
              >
                <Image
                  src={getImg(imageOffset + 13 + gIdx)}
                  alt={`${BUSINESS_INFO.name} ${gIdx + 1}`}
                  fill
                  sizes="(max-width: 640px) 50vw, 20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-[#2285f5]/80 flex items-center justify-center transition-opacity duration-300 ${
                    gIdx === 2
                      ? "opacity-90 group-hover:opacity-100"
                      : "opacity-0 group-hover:opacity-90"
                  }`}
                >
                  <a
                    href={BUSINESS_INFO.phoneHref}
                    aria-label={`Call ${BUSINESS_INFO.phoneDisplay}`}
                    className="w-11 h-11 rounded-lg border-2 border-white text-white flex items-center justify-center"
                  >
                    <Phone className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 8: BRIGHT YELLOW PRE-FOOTER CTA BANNER (Clenoz Section 9)
      ===================================================================== */}
      <section className="relative bg-[#f5d020] py-12 lg:py-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="max-w-3xl space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#11182c]">
                {ctaSection ? ctaSection.title : page.pageTitle}
              </h2>
              {ctaSection && (
                <div
                  className="sheet-html sheet-html-yellow text-[#11182c]/90 text-sm sm:text-base font-medium"
                  dangerouslySetInnerHTML={{ __html: ctaSection.contentHtml }}
                />
              )}
            </div>

            {/* Only Phone Button on CTA as requested */}
            <div className="shrink-0">
              <a
                href={BUSINESS_INFO.phoneHref}
                className="inline-flex items-center gap-2.5 bg-[#11182c] hover:bg-slate-800 text-white font-extrabold text-sm sm:text-base px-8 py-4 rounded-full shadow-lg hover:scale-[1.02] transition-all"
              >
                <Phone className="w-4 h-4 text-[#f5d020]" />
                <span>Call {BUSINESS_INFO.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
