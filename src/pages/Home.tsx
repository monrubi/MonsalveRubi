import Credentials from "@/components/Credentials";
import Hero from "@/components/Hero";
import IntroStrip from "@/components/IntroStrip";
import PracticeAreas from "@/components/Practiceareas";

export default function Home() {
  return (
    <>
      <Hero />
      <IntroStrip />
      <Credentials />
      <PracticeAreas />
    </>
  );
}