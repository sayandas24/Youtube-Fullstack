// src/components/RegisterForm.js
import React, { useState } from "react";
import { TbLogin2 } from "react-icons/tb";
import { NavLink } from "react-router";
import GoogleLogin from "../login/GoogleLogin";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); 

  const handleSubmit = (event) => {
    event.preventDefault();
    // Send the form data to your backend API for registration
  };

  return (
    <div className="flex">
      <div className="w-1/2"></div>
      <div className="w-1/2   bg-white   h-screen flex flex-col justify-center items-center">
        <h1 className="text-[2.5rem] text-center font-semibold mb-5">
          Create An Account
        </h1>
        <form className="  w-[30rem] mx-auto rounded flex flex-col gap-3 p-5">
          <input
            type="text"
            value={email}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full p-2 border text-gray-700 rounded-xl bg-[#f3f7f9]"
            placeholder="username"
          />

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
            Register
          </button>
          {/* Google button */}
          <GoogleLogin/>
        </form>
        <div className="flex items-center justify-center gap-4 mt-[10rem]">
          Already have an account?
          <NavLink to="/login">
            <span className="flex items-center gap-2 text-xl cursor-pointer">
              <TbLogin2 />
              <b>Login</b>
            </span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Register;
