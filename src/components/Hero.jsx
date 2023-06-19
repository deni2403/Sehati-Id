import React from "react";
import ImageHero from "../assets/gambarhero.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-[#0C8C59] to-[#F3FFF4] p-10">
      <div className="flex flex-col md:flex-row items-center justify-center">
        <div className="flex flex-col space-y-4 md:space-y-8">
          <div>
            <h1 className="text-4xl md:text-2xl xl:text-4xl font-bold text-white">
              NUTRITION IS THE KEY TO UNLOCKING YOUR FULL POTENTIAL
            </h1>
            <p className="text-white xl:mt-10">
              Empowering individuals to unlock their full potential through the power of nutrition
            </p>
          </div>
          <div className="xl:mt-16">
            <Link
              to="/recipe"
              className="bg-white text-[#1C9509] px-8 py-3 text-lg font-semibold rounded-full shadow-lg hover:bg-[#1C9509] hover:text-white transition duration-300 transform hover:scale-105"
            >
              Explore
            </Link>
          </div>
        </div>
        <div className="flex justify-center mt-8 md:mt-0">
          <img src={ImageHero} alt="" className="w-full max-w-lg" />
        </div>
      </div>
    </section>
  );
};

export default Hero;