import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";
import { createUserDocument } from "../config/index";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const auth = getAuth();

const RegisterPage = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState(null);
  let navigate = useNavigate("");

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      await createUserDocument(user, {
        displayName: fullName,
        email,
        password,
        photoFile: file,
      });

      e.target.reset();
      navigate("/");
    } catch (error) {
      console.log("Error in registration", error);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div>
      <section className="bg-gradient-to-r from-[#0C8C59] to-[#F3FFF4] p-10 grid grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold text-white">Create a New Account</h1>
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
            <form onSubmit={handleRegistration}>
              <h2 className="text-3xl font-bold text-center text-white">Sign Up</h2>
              <div className="flex flex-col mt-4 space-y-2">
                <label htmlFor="fullName" className="text-sm font-light text-white">Nama Lengkap</label>
                <input
                  type="text"
                  name="displayName"
                  id="fullName"
                  className="py-2 px-4 rounded-3xl bg-[#D9D9D9B8] text-white font-light"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-4 space-y-2">
                <label htmlFor="email" className="text-sm font-light text-white">Email</label>
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
                <label htmlFor="password" className="text-sm font-light text-white">Kata Sandi</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  className="py-2 px-4 rounded-3xl bg-[#D9D9D9B8] text-white font-light"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col mt-4 space-y-2">
                <label htmlFor="photo" className="text-sm font-light text-white">Foto Profil</label>
                <input
                  type="file"
                  name="photo"
                  id="photo"
                  onChange={handleFileChange}
                  className="py-2 px-4 rounded-3xl bg-[#D9D9D9B8] text-white font-light"
                />
              </div>
              <button className="bg-[#00985B] py-3 text-white mt-6 w-full rounded-3xl">Daftar</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RegisterPage;