import React from "react";
import Logo from "../assets/logo.png";
import Instagram from "../assets/ig.png";
import Linkedin from "../assets/linkedin.png";
import Whatsapp from "../assets/wa.png";
import Twitter from "../assets/twitter.png";

const Footer = () => {
  return (
    <footer className="bg__footer bg-cover text-white px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 place-content-center md:gap-y-6">
        <div className="flex justify-center items-center md:justify-start">
          <img src={Logo} alt="" className="w-20" />
        </div>
        <div className="text-center md:text-left mt-4 md:mt-0">
          <h6 className="font-bold text-lg">Sehati.id</h6>
          <ul className="flex flex-col space-y-2 mt-4">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Our Teams</li>
          </ul>
        </div>
        <div className="text-center md:text-left mt-4 md:mt-0">
          <h6 className="font-bold text-lg">Social Media</h6>
          <ul className="flex-col space-y-2 mt-4 grid grid-cols-2 place-content-center place-items-center">
            <li>
              <img src={Instagram} alt="" />
            </li>
            <li>
              <img src={Linkedin} alt="" />
            </li>
            <li>
              <img src={Whatsapp} alt="" />
            </li>
            <li>
              <img src={Twitter} alt="" />
            </li>
          </ul>
        </div>
      </div>
      <p className="text-center font-semibold mt-6">Copyright 2023 Sehati.id</p>
    </footer>
  );
};

export default Footer;