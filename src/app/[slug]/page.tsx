import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ClenozPageTemplate from "@/components/ClenozPageTemplate";
import { ALL_ROOT_PAGES } from "@/data/siteData";

function normalizeSlug(slug: string) {
  return `/${slug.replace(/^\/+|\/+$/g, "")}/`;
}

export function generateStaticParams() {
  return ALL_ROOT_PAGES.map((p) => ({
    slug: p.slug.replace(/^\/+|\/+$/g, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const target = normalizeSlug(slug);
  const page = ALL_ROOT_PAGES.find((p) => p.slug === target);
  if (!page) return {};
  return {
    title: page.seoTitle,
    description: page.metaDescription,
  };
}

export default async function DynamicRootPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const target = normalizeSlug(slug);
  const idx = ALL_ROOT_PAGES.findIndex((p) => p.slug === target);
  if (idx === -1) {
    notFound();
  }
  const page = ALL_ROOT_PAGES[idx];
  return <ClenozPageTemplate page={page} imageOffset={(idx + 1) * 2} />;
}
