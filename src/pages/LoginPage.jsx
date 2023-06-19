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
      <section className="bg-gradient-to-r from-[#0C8C59] to-[#F3FFF4] p-10 grid grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold text-white">
            Create a New Account
          </h1>
          <h3 className="text-2xl font-light text-white">
            Already Registered?{" "}
            <Link to="/login" className="font-bold">
              Login
            </Link>
          </h3>
          <img src={Logo} alt="Logo" />
        </div>
        <div className="relative p-12">
          <div className="bg__blur" />
          <div className="h-full p-12 bg-black bg__container__auth rounded-xl">
            <form onSubmit={handleLogin}>
              <h2 className="text-3xl font-bold text-center text-white mb-6">
                Sign In
              </h2>
              <div className="flex flex-col space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-light text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="py-2 px-4 rounded-3xl bg-[#D9D9D9B8] text-white font-light"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-4 space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-light text-white"
                >
                  Kata Sandi
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="py-2 px-4 rounded-3xl bg-[#D9D9D9B8] text-white font-light"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 mt-4">{error}</p>}
              <button className="bg-[#00985B] py-3 text-white mt-6 w-full rounded-3xl hover:bg-green-600">
                Login
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;