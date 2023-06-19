import React from "react";
import { Link } from "react-router-dom";

const CardCategory = ({ index, data }) => {
  return (
    <div className="max-w-xs mx-auto my-4">
      <div className="bg-white rounded-lg shadow-lg">
        <img src={data.strCategoryThumb} alt="" className="w-full h-56 object-cover rounded-t-lg" />
        <div className="p-4">
          <Link
            to={`/meals/${data.strCategory}`}
            className="block mb-2 text-2xl font-bold text-center text-gray-900 hover:text-blue-500"
          >
            {data.strCategory}
          </Link>
          <p className="text-sm text-gray-700">{data.strCategoryDescription?.slice(0, 200)}...</p>
        </div>
      </div>
    </div>
  );
};

export default CardCategory;