import type { ReactElement } from "react";
import { FaqSection } from "@/components/landing/FaqSection";
import { FinalCta } from "@/components/landing/FinalCta";
import { FloatingCta } from "@/components/landing/FloatingCta";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { LegalFooter } from "@/components/landing/LegalFooter";
import { OffersSection } from "@/components/landing/OffersSection";
import { ReviewsSection } from "@/components/landing/ReviewsSection";
import { ServiceArea } from "@/components/landing/ServiceArea";
import { ServicesSection } from "@/components/landing/ServicesSection";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { TrustBar } from "@/components/landing/TrustBar";
import { WhyTommies } from "@/components/landing/WhyTommies";

// Section order: #hero #trust-bar #how-it-works #services #offers #why-tommies #reviews #service-area #faq #form
export default function LandingPage(): ReactElement {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <TrustBar />
        <HowItWorks />
        <ServicesSection />
        <OffersSection />
        <WhyTommies />
        <ReviewsSection />
        <ServiceArea />
        <FaqSection />
        <FinalCta />
      </main>
      <LegalFooter />
      <FloatingCta />
    </>
  );
}
