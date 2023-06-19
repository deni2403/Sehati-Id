import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { createUserDocument } from "../config/index";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const auth = getAuth();

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Handle successful login
      console.log("Logged in user:", user);

      // Reset the form
      setEmail("");
      setPassword("");
      setError(null);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-[#0C8C59] to-[#F3FFF4] p-4 lg:p-10 grid lg:grid-cols-2">
        <div className="p-4 flex flex-col justify-between">
          <div>
            <h1 className="text-2xl lg:text-4xl font-bold text-white">
              Create a New Account
            </h1>
            <h3 className="text-xl lg:text-2xl font-light text-white">
              Already Registered?{" "}
              <Link to="/login" className="font-bold">
                Login
              </Link>
            </h3>
          </div>
          <img src={Logo} alt="Logo" className="mt-4" />
        </div>
        <div className="relative p-4 lg:p-12 flex items-center">
          <div className="bg-[#111827] bg-opacity-70 w-full rounded-xl">
            <div className="p-4">
              <form onSubmit={handleLogin}>
                <h2 className="text-xl lg:text-3xl font-bold text-white text-center mb-4">
                  Sign In
                </h2>
                <div className="flex flex-col space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm lg:text-base font-light text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="py-2 px-4 rounded-lg bg-[#D9D9D9B8] text-white font-light"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="flex flex-col mt-2 lg:mt-4 space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm lg:text-base font-light text-white"
                  >
                    Kata Sandi
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="py-2 px-4 rounded-lg bg-[#D9D9D9B8] text-white font-light"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error && (
                  <p className="text-red-500 mt-2 lg:mt-4">{error}</p>
                )}
                <button className="bg-[#00985B] py-3 text-white mt-4 w-full rounded-lg hover:bg-green-600">
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;