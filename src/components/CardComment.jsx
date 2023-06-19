import React from "react";

const CardComment = ({ photoURL, name, comment }) => {
  return (
    <div className="border-b-[#00985B] border-b p-4">
      <div className="flex">
        <img src={photoURL} alt="" className="w-16 h-16 rounded-full" />
        <div>
          <h5 className="font-semibold text-base px-4">{name}</h5>
          <p className="text-base py-2 px-4">{comment}</p>
        </div>
      </div>
    </div>
  );
};

export default CardComment;