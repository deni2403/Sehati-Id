import React from "react";
import { Link } from "react-router-dom";

const CardCategory = ({ index, data }) => {
  return (
    <>
      <div
        key={index + 1}
        className="flex flex-col items-center justify-center w-full p-3 space-y-2 rounded-lg shadow"
      >
        <img src={data.strCategoryThumb} alt="" className="w-72" />
        <Link
          to={`/meals/${data.strCategory}`}
          className="text-2xl font-bold text-center"
        >
          {data.strCategory}
        </Link>
        <p className="px-6 pb-6 text-justify">
          {data.strCategoryDescription?.slice(0, 200)}...
        </p>
      </div>
    </>
  );
};

export default CardCategory;
