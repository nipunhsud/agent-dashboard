import React from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import Applications from "../components/Applications";
import Technology from "../components/Technology";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <Applications />
      <Technology />
      <Footer />
    </div>
  );
};

export default Home;
