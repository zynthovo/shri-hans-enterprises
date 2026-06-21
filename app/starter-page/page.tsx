import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { SectionTitle } from "@/components/SectionTitle";
import { Reveal } from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Starter Page - Zynthovo Digital",
};

export default function StarterPage() {
  return (
    <>
      <PageHeader title="Starter Page" crumb="Starter Page" />

      <section className="py-20">
        <div className="site-container px-4 sm:px-0">
          <SectionTitle
            eyebrow="Starter Section"
            title="Starter Section"
            description="A blank starting point — duplicate this page and drop in your own content to build a new page quickly."
          />
          <Reveal animation="fade-up">
            <p className="text-center text-muted">
              Use this page as a starter for your own custom pages.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
