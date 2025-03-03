import React, { useContext, useEffect, useState } from "react";
import { TbLogin2 } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router";
import GoogleLogin from "../googleLogin/GoogleLogin";
import axiosInstance from "../../../utils/axiosInstance";
import { ClipLoader } from "react-spinners"; // Example of a spinner component
import { MdArrowBackIos } from "react-icons/md";
import { ShineBorder } from "@/components/magicui/shine-border";

import { useTheme } from "next-themes";

import { MagicCard } from "@/components/magicui/magic-card";
import { Meteors } from "@/components/magicui/meteors";
import { toast } from "react-toastify";

const Login = () => {
  const { theme } = useTheme(); 

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [checkInput, setCheckInput] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    setProcessing(true); // spinner

    axiosInstance
      .post("/user/login", { email, password }, { timeout: 5000 }) // Set timeout to 5 seconds
      .then((res) => {
        const token = res.data.data.accessToken; // Get the token from the response
        toast.success("Login successful!");

        localStorage.setItem("accessToken", token);
        navigate("/");
        window.location.reload();
      })
      .catch((err) => {
        // if err, then show user not found in frontend ui
        console.log("Error in login", err);
        toast.error("Login failed!");
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
    <div id="loginPage" className="flex dark">
      {/* <RetroGridDemo /> */}

      <div
        id="right-section"
        className="w-full fixed right-0 top-0 z-[99999] bg-transparent h-screen flex flex-col justify-center items-center text-white"
      >
        <NavLink
          id="home-btn"
          className="gap-1 min-[1000px]:bg-zinc-800 rounded-full py-2  text-white min-[1000px]:text-zinc-400 items-center font-semibold justify-center mr-auto flex px-[20px] min-[1000px]:ml-10 min-[1000px]:hover:bg-zinc-700 transition duration-300 min-[1000px]:hover:text-zinc-200 "
          to="/"
        >
          <MdArrowBackIos />
          <span>Home</span>
        </NavLink>

        <span
          id="login-title"
          className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b  bg-clip-text text-center text-5xl font-semibold  mb-5 leading-none text-transparent   from-white to-slate-900/10"
        >
          Login to your account
        </span>

        {/* Before 1000px */}
        <MagicCard
          className="cursor-pointer flex-col items-center justify-center whitespace-nowrap shadow-2xl text-white w-[30rem] py-16 !h-fit max-[500px]:w-[90%] max-[1000px]:hidden"
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
          <form className=" mx-auto rounded flex flex-col gap-3  w-[90%]">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full p-2 border text-gray-200 rounded-xl bg-[#292929] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="email"
              required
            />

            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(event) => setPassword(event.target.value)}
              className="w-full p-2 border text-gray-200 rounded-xl bg-[#292929] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required={true}
            />

            <div className="flex gap-2 items-center cursor-pointer">
              <input
                onChange={(e) => setCheckInput(e.target.checked)}
                type="checkbox"
                name="terms"
                id="terms"
              />
              <label id="terms" htmlFor="terms" className="cursor-pointer">
                I accept the <b>Terms and Condition</b>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              disabled={buttonDisabled || processing || !checkInput}
              // disabled={!checkInput && !buttonDisabled && !processing }
              className={`${
                !checkInput || buttonDisabled || processing
                  ? "bg-gray-600 hover:bg-gray-600"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded-xl transition duration-300 max-[500px]:text-[0.9rem]`}
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
              } mt-3 rounded-xl mx-auto w-full flex items-center justify-center p-2 text-red-600 border border-red-600 transition duration-300`}
            >
              user not found
            </h1>
          </form>
        </MagicCard>

        {/* After 1000px */}
        <ShineBorder
          className="loginForm cursor-pointer flex-col items-center justify-center whitespace-nowrap shadow-2xl text-white w-[30rem] py-16 !h-fit max-[500px]:w-[90%] min-[1000px]:hidden"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          <form className=" mx-auto rounded flex flex-col gap-3  w-[90%]">
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full p-2 border text-gray-200 rounded-xl bg-[#343434] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="email"
              required
            />

            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(event) => setPassword(event.target.value)}
              className="w-full p-2 border text-gray-200 rounded-xl bg-[#343434] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              required={true}
            />

            <div className="flex gap-2 items-center">
              <input
                onChange={(e) => setCheckInput(e.target.checked)}
                type="checkbox"
                name="term"
                id="term"
              />
              <label id="terms" htmlFor="term">
                I accept the <b>Terms and Condition</b>
              </label>
            </div>

            <button
              onClick={handleSubmit}
              type="submit"
              disabled={buttonDisabled || processing || !checkInput}
              className={`${
                !checkInput || buttonDisabled || processing
                  ? "bg-gray-600 hover:bg-gray-600"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded-xl transition duration-300 max-[500px]:text-[0.9rem]`}
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
              } mt-3 rounded-xl mx-auto w-full flex items-center justify-center p-2 text-red-600 border border-red-600 transition duration-300`}
            >
              user not found
            </h1>
          </form>
        </ShineBorder>

        <div className="flex items-center justify-center gap-4 mt-[10rem] max-[500px]:mt-5">
          Don`t have an account?
          <NavLink to="/register">
            <span className="flex items-center gap-2 text-xl cursor-pointer text-blue-500 hover:text-blue-700 transition duration-300">
              <TbLogin2 />
              <b>Register</b>
            </span>
          </NavLink>
        </div>
      </div>

      <div className="w-[100vw] min-h-screen fixed top-0 left-0 z-[99] text-4xl bg-[#141313]">
        <Meteors number={30} />
      </div>
    </div>
  );
};

export default Login;
