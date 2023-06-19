import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../config";
import { MdOutlineLogout } from "react-icons/md";

export const ProfileLogout = () => {
  const handleLogout = (e) => {
    e.preventDefault();
    auth
      .signOut()
      .then(() => {
        console.log("User logged out successfully.");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div className="flex flex-col py-2 mx-8 space-y-2 font-semibold text-black bg-white lg:text-center">
      <Link to="/profile" className="px-4 py-2 text-start">
        Profile
      </Link>
      <div className="flex items-center px-4 py-2 space-x-2">
        <MdOutlineLogout />
        <button
          onClick={handleLogout}
          className="text-red-500 hover:text-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ProfileLogout;