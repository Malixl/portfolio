import { usePortfolioData } from "../context/PortfolioContext";
import PageHero from "../components/layout/PageHero";
import ContactSection from "../components/home/Contact";

import { Mail } from "lucide-react";

export default function Contact() {
  const { profile } = usePortfolioData();

  return (
    <>
      <PageHero
        title="Get in Touch"
        description="I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions. Let's connect!"
        image={
          <Mail size={32} className="text-green-600 dark:text-green-400" />
        }
        color="green"
      />

      <div className="space-y-20">
        <ContactSection />
      </div>
    </>
  );
}
