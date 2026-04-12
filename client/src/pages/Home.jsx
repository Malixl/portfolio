import { usePortfolioData } from "../context/PortfolioContext";
import Hero from "../components/home/Hero";

export default function Home() {
  const { profile } = usePortfolioData();

  return (
    <>
      {/* Landing Hero */}
      <Hero profile={profile} />
    </>
  );
}
