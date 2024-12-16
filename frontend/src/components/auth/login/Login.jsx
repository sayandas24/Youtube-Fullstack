// src/components/RegisterForm.js
import React, { useState } from "react";
import { TbLogin2 } from "react-icons/tb";
import { NavLink } from "react-router";
import GoogleLogin from "../login/GoogleLogin";
import axiosInstance from "../../../utils/axiosInstance";

const Login = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 
  const [googleData, setGoogleData] = useState({})

  // axiosInstance({
  //   method: "post",
  //   url: "/user/login",
  //   body: googleData,
  //   headers: { "Content-Type": "multipart/form-data" },
  // })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the form data to your backend API for registration
  };

  return (
    <div className="flex">
      <div className="w-1/2"></div>
      <div className="w-1/2   bg-white   h-screen flex flex-col justify-center items-center">
        <h1 className="text-[2.5rem] text-center font-semibold mb-5">
          Login to your account
        </h1>
        <form className="  w-[30rem] mx-auto rounded flex flex-col gap-3 p-5">

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full p-2 border text-gray-700 rounded-xl bg-[#f3f7f9]"
            placeholder="email"
          />

          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
            className="w-full p-2 border text-gray-700 rounded-xl bg-[#f3f7f9]"
          />

          <div className="flex gap-2 items-center">
            <input type="checkbox" name="terms" id="terms" />
            <label htmlFor="terms">
              I accept the <b>Terms and Condition</b>
            </label>
          </div>

          <button
          onClick={handleSubmit}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
          >
            Login
          </button>
          {/* Google button */}
          <GoogleLogin/>
        </form>
        <div className="flex items-center justify-center gap-4 mt-[10rem]">
          Don`t have an account?
          <NavLink to="/register">
            <span className="flex items-center gap-2 text-xl cursor-pointer">
              <TbLogin2 />
              <b>Register</b>
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Login;
