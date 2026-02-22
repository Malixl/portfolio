import { usePortfolioData } from "../context/PortfolioContext";
import PageHero from "../components/layout/PageHero";
import AboutSection from "../components/home/About";
import Skills from "../components/home/Skills";
import Education from "../components/home/Education";
import Blog from "../components/home/Blog";
import LoadingScreen from "../components/ui/LoadingScreen";

import { User } from "lucide-react";

export default function About() {
  const { profile, skills, education, blogs, loading } = usePortfolioData();

  if (loading) return <LoadingScreen />;

  return (
    <>
      <PageHero
        title="About Me"
        description="I'm a passionate developer with a love for creating beautiful, functional, and user-friendly applications. Here's a glimpse into my bio, skills, and education."
        image={
          <User size={32} className="text-purple-600 dark:text-purple-400" />
        }
        color="purple"
      />

      <div className="space-y-20">
        <AboutSection profile={profile} />
        <Skills data={skills} />
        <Education data={education} />
        <Blog data={blogs} />
      </div>
    </>
  );
}
