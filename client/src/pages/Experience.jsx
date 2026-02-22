import { usePortfolioData } from "../context/PortfolioContext";
import PageHero from "../components/layout/PageHero";
import ExperienceSection from "../components/home/Experience";
import Projects from "../components/home/Projects";
import Certificates from "../components/home/Certificates";
import LoadingScreen from "../components/ui/LoadingScreen";

import { Briefcase } from "lucide-react";

export default function Experience() {
  const { profile, experience, projects, achievements, loading } =
    usePortfolioData();

  if (loading) return <LoadingScreen />;

  return (
    <>
      <PageHero
        title="My Experience"
        description="A showcase of my professional journey, including key projects I've built and certifications I've earned along the way."
        image={
          <Briefcase size={32} className="text-blue-600 dark:text-blue-400" />
        }
        color="blue"
      />

      <div className="space-y-20">
        <ExperienceSection data={experience} />
        <Projects data={projects} />
        <Certificates data={achievements} />
      </div>
    </>
  );
}
