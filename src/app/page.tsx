import Hero from "@/components/home/Hero";
import MeetPups from "@/components/home/MeetPups";
import Paths from "@/components/home/Paths";
import Journey from "@/components/home/Journey";
import Passport from "@/components/home/Passport";
import Families from "@/components/home/Families";
import NightFaq from "@/components/home/NightFaq";
import WelcomeHome from "@/components/home/WelcomeHome";

// The home page is one scrolling story that moves from morning to night.
export default function Home() {
  return (
    <>
      <Hero />
      <MeetPups />
      <Paths />
      <Journey />
      <Passport />
      <Families />
      <NightFaq />
      <WelcomeHome />
    </>
  );
}
