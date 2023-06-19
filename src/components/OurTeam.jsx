import React from "react";
import Aini from "../assets/aini.png";
import Alan from "../assets/alan.jpg";
import Hafids from "../assets/hafidz.png";
import Deni from "../assets/deni.png";

const OurTeam = () => {
  return (
    <>
      <div className="p-4 bg-[#F3FFF4]">
        <h2 className="text-center font-bold text-[#00985B] text-xl">
          Meet Our
        </h2>
        <h3 className="font-bold text-center text-[#00985B] text-2xl">
          Sehati.id Team
        </h3>
        <div className="grid grid-cols-1 gap-4 mt-4 place-content-center place-items-center sm:grid-cols-2 xl:grid-cols-4">
          <div className="shadow rounded-2xl w-72">
            <div className="h-72 overflow-hidden rounded-t-2xl">
              <img src={Alan} alt="Alan" className="w-full h-full object-cover" />
            </div>
            <div className="bg-[#00985B] text-center text-white rounded-b-2xl p-4">
              <h5 className="font-semibold">Maulana Nadzif Adnan</h5>
              <p className="font-medium">Universitas Dian Nuswantoro</p>
            </div>
          </div>
          <div className="shadow rounded-2xl w-72">
            <div className="h-72 overflow-hidden rounded-t-2xl">
              <img src={Aini} alt="Aini" className="w-full h-full object-cover" />
            </div>
            <div className="bg-[#00985B] text-center text-white rounded-b-2xl p-4">
              <h5 className="font-semibold">Aini Nurpadilah</h5>
              <p className="font-medium">Universitas Krisnadwipayana</p>
            </div>
          </div>
          <div className="shadow rounded-2xl w-72">
            <div className="h-72 overflow-hidden rounded-t-2xl">
              <img src={Hafids} alt="Hafids" className="w-full h-full object-cover" />
            </div>
            <div className="bg-[#00985B] text-center text-white rounded-b-2xl p-4">
              <h5 className="font-semibold">Hafizh Muhammad Azhar</h5>
              <p className="font-medium">Universitas Budi Luhur</p>
            </div>
          </div>
          <div className="shadow rounded-2xl w-72">
            <div className="h-72 overflow-hidden rounded-t-2xl">
              <img src={Deni} alt="Deni" className="w-full h-full object-cover" />
            </div>
            <div className="bg-[#00985B] text-center text-white rounded-b-2xl p-4">
              <h5 className="font-semibold">Deni</h5>
              <p className="font-medium">Universitas Mikroskil</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurTeam;