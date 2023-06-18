import React, { useState, useEffect } from "react";
import { Sling as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import PlaceHolder from "../assets/placeholder-image.png";
import { auth } from "../config/index";
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const [isOpen, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [photoURL, setPhotoURL] = useState(null);
  const [openProfileLogout, setOpenProfileLogout] = useState(false);



  useEffect(() => {
  }, []);
  return (
    <header className="bg-gradient-to-r from-green-800 to-[#1B1E23]  sticky top-0 left-0 w-full flex items-center z-50">
      <div className="container">
        <div className="relative flex items-center justify-between">
          <div className="px-4">
            <Link to="/">
              <img src={Logo} alt="Logo" className="w-14" />
            </Link>
          </div>
          <div className="flex items-center px-4">
            <div className="absolute block right-4 lg:hidden">
              <Hamburger
                toggled={isOpen}
                toggle={setOpen}
                color="#fafafa"
                onToggle={(toggled) => {
                  if (toggled) {
                    // open a menu
                    console.log(toggled);
                  } else {
                    // close a menu
                    console.log(toggled);
                  }
                }}
              />
            </div>
            <nav className={isOpen ? "navmenu-show" : "navmenu-hidden"}>
              <ul className="block text-white lg:flex lg:items-center">
                {isLogin ? (
                  <>
                    <li className="group md:hidden">
                      <img
                        src={photoURL}
                        alt=""
                        className="w-12 h-12 mx-8 rounded-full md:w-14 md:h-14"
                      />
                    </li>
                  </>
                ) : null}
                <li className="group">
                  <Link
                    to="/"
                    className="flex py-2 mx-8 text-base font-bold text-theme1 group-hover:text-theme2"
                  >
                    Home
                  </Link>
                </li>
                <li className="group">
                  <Link
                    to="/recipe"
                    className="flex py-2 mx-8 text-base font-bold text-theme1 group-hover:text-theme2"
                  >
                    Recipe
                  </Link>
                </li>
                <li className="group">
                  <Link
                    to="/forum"
                    className="flex py-2 mx-8 text-base font-bold text-theme1 group-hover:text-theme2"
                  >
                    Forum
                  </Link>
                </li>
                <li className="group">
                  <Link
                    to="/article"
                    className="flex py-2 mx-8 text-base font-bold text-theme1 group-hover:text-theme2"
                  >
                    Article
                  </Link>
                </li>
                {isLogin ? (
                  <>
                    <li className="hidden lg:block group">
                      <img
                        src={photoURL}
                        alt=""
                        onClick={() => setOpenProfileLogout(!openProfileLogout)}
                        className="w-12 h-12 mx-8 rounded-full cursor-pointer md:w-14 md:h-14"
                      />
                    </li>
                  </>
                ) : (
                  <>
                    <li className="group md:flex">
                      <Link
                        to="/register"
                        className="flex py-2 mx-8 text-base font-bold text-theme1 group-hover:text-theme2"
                      >
                        Register
                      </Link>
                      <Link
                        to="/login"
                        className="flex px-4 py-2 mx-8 text-base font-bold text-black bg-white text-theme1 group-hover:text-theme2"
                      >
                        Login
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </nav>
            {isLogin ? (
              <ul
                className={`${
                  openProfileLogout ? "navmenu-show" : "hidden"
                } absolute w-64 top-16`}
              >
                <li className="group">
                  {/* <ProfileLogout /> */}
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
