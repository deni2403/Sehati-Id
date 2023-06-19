import React from "react";
import Hero from "../components/Hero";
import AboutSehati from "../components/AboutSehati";
import Calculator from "../components/Calculator";
import Footer from "../components/Footer";
import OurTeam from "../components/OurTeam";

const HomePage = () => {
  return (
    <>
      <Hero />
      <main>
        <AboutSehati />
        <Calculator />
        <OurTeam />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
