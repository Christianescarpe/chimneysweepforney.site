import type { Metadata } from "next";
import ClenozPageTemplate from "@/components/ClenozPageTemplate";
import { HOME_PAGE } from "@/data/siteData";

export const metadata: Metadata = {
  title: HOME_PAGE.seoTitle,
  description: HOME_PAGE.metaDescription,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <ClenozPageTemplate page={HOME_PAGE} imageOffset={0} />;
}
