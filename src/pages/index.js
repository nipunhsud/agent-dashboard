import Applications from "@/components/Applications";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import Technology from "@/components/Technology";
export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <Applications />
      <Technology />
      <Footer/>
    </>
  );
}
