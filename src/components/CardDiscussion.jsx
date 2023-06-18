import React from "react";
import { Link } from "react-router-dom";

const CardDiscussion = ({ id, question, img, name, countComment }) => {
  return (
    <>
      <Link
        to={`/detail-forum/${id}`}
        className="border-b-[#00985B] border-b p-4"
      >
        <h5>{question}</h5>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src={img} alt="" className="rounded-full w-14 h-14" />
            <h6 className="font-semibold">{name}</h6>
          </div>
          <div>
            <p className="text-sm font-semibold">{countComment} Komentar</p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CardDiscussion;
