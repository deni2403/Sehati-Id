import React from "react";
import { Link } from "react-router-dom";

const CardMeal = ({ index, data }) => {
  return (
    <>
      <div
        key={index + 1}
        className="flex flex-col items-center justify-center w-full p-3 space-y-2 rounded-lg shadow"
      >
        <img src={data.strMealThumb} alt="" className="w-72" />
        <Link
          to={`/meal/${data.idMeal}`}
          className="text-2xl font-bold text-center"
        >
          {data.strMeal}
        </Link>
      </div>
    </>
  );
};

export default CardMeal;
