import React from "react";
import GreenLogo from "../assets/logohijau.png";

const AboutSehati = () => {
  return (
    <>
      <section className="bg-[#F3FFF4] p-10">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="flex flex-col md:w-1/2 space-y-4">
            <div>
              <h1 className="text-4xl md:text-2xl xl:text-4xl font-bold text-[#1C9509] text-center md:text-left">
                About Sehati.id
              </h1>
              <p className="text-black text-justify mt-6">
                Kami hadir untuk memberikan solusi yang tepat bagi Anda dalam
                mengelola status gizi dan mencapai gaya hidup sehat. Dengan
                dukungan ahli gizi terbaik di Indonesia, kami menyediakan
                layanan konsultasi online yang personal dan rekomendasi diet
                yang sesuai dengan kebutuhan Anda.
                <br />
                Temukan artikel-artikel informatif tentang gizi kesehatan,
                nutrisi, dan tips hidup sehat di blog kami. Kami juga
                menyediakan kuis interaktif yang akan menguji pengetahuan Anda
                seputar gizi dan membantu Anda memahami pentingnya pola makan
                yang seimbang.
              </p>
            </div>
          </div>
          <div className="flex justify-center md:w-1/2">
            <img src={GreenLogo} alt="" className="w-64" />
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSehati;