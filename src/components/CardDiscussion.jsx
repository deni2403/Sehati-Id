import React from "react";
import { Link } from "react-router-dom";

const CardDiscussion = ({ id, question, img, name, countComment }) => {
  return (
    <Link
      to={`/detail-forum/${id}`}
      className="border-b-[#00985B] border-b p-2 md:p-4 flex flex-col space-y-4"
    >
      <div className="flex items-center space-x-4">
        <img src={img} alt="" className="rounded-full w-14 h-14" />
        <div>
          <h6 className="font-semibold text-base">{name}</h6>
          <p className="text-xs text-gray-500">{countComment} Komentar</p>
        </div>
      </div>
      <h5 className="text-xl font-semibold">{question}</h5>
    </Link>
  );
};

export default CardDiscussion;