// src/components/RegisterForm.js
import React, { useEffect, useState } from "react";
import { TbLogin2 } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router";
import GoogleLogin from "../googleLogin/GoogleLogin";
import axiosInstance from "../../../utils/axiosInstance";
import { ClipLoader } from "react-spinners"; // Example of a spinner component
import { useQueryClient } from "@tanstack/react-query";

const Login = () => {
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [googleData, setGoogleData] = useState({});
  const [buttonDisabled, setButtonDisabled] = useState(true);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleSubmit = (event) => {
    event.preventDefault();
    setProcessing(true); // spinner
    // setTimeout(() => {
    //   setProcessing(false);
    // }, 10000);

    axiosInstance
      .post("/user/login", { email, password })
      .then((res) => {
        const token = res.data.data.accessToken; // Get the token from the response

        localStorage.setItem("accessToken", token);
        navigate("/");
        window.location.reload();


        console.log(res);
      })
      .catch((err) => {
        // if err, then show user not found in frontend ui
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setProcessing(false);
      });

    // Send the form data to your backend API for registration
  };

  useEffect(() => {
    setButtonDisabled(!email || !password);
  }, [email, password]);

  return (
    <div className="flex">
      <div className="w-1/2 fixed left-0 top-0 z-[99999] h-screen bg-blue-600">
        <NavLink to="/">
          <button>Home</button>
        </NavLink>
      </div>
      <div className="w-1/2 fixed right-0 top-0 z-[99999] bg-white  h-screen flex flex-col justify-center items-center">
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
            required
          />

          <input
            type="password"
            value={password}
            placeholder="password"
            onChange={(event) => setPassword(event.target.value)}
            className="w-full p-2 border text-gray-700 rounded-xl bg-[#f3f7f9]"
            required={true}
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
            disabled={buttonDisabled || processing}
            className={`${
              buttonDisabled || processing
                ? "bg-gray-600 hover:bg-gray-600"
                : "bg-blue-500 hover:bg-blue-700"
            } text-white font-bold py-2 px-4 rounded-xl`}
          >
            {processing ? (
              <ClipLoader color="#ffffff" loading={true} size={16} />
            ) : (
              "Login"
            )}
          </button>

          {/* Google button */}
          <GoogleLogin />

          <h1
            className={`${
              error ? "visible" : "invisible"
            } mt-3 rounded-xl mx-auto  w-full flex items-center justify-center p-2 text-red-600 border border-red-600`}
          >
            user not found
          </h1>
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
