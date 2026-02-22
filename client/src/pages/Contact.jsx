import { usePortfolioData } from "../context/PortfolioContext";
import PageHero from "../components/layout/PageHero";
import ContactSection from "../components/home/Contact";
import LoadingScreen from "../components/ui/LoadingScreen";

import { Mail } from "lucide-react";

export default function Contact() {
  const { profile, loading } = usePortfolioData();

  if (loading) return <LoadingScreen />;

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
