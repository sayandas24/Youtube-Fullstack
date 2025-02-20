// src/components/RegisterForm.js
import React, { useState, useEffect } from "react";
import { TbLogin2 } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router";
import GoogleLogin from "../googleLogin/GoogleLogin";
import axiosInstance from "../../../utils/axiosInstance";
import { ClipLoader } from "react-spinners"; // Example of a spinner component
import { MdArrowBackIos } from "react-icons/md";
import { useTheme } from "next-themes";
import { ShineBorder } from "@/components/magicui/shine-border";
import { MagicCard } from "@/components/magicui/magic-card";
import { Meteors } from "@/components/magicui/meteors";

const Register = () => {
  const [fullName, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(false);
  const [checkInput, setCheckInput] = useState(false);

  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const navigate = useNavigate();

  const { theme } = useTheme();

  const handleSubmit = (event) => {
    event.preventDefault();
    setProcessing(true); // spinner

    axiosInstance
      .post(
        "/user/register",
        { fullName, username, email, password, avatar, coverImage },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        { timeout: 5000 }
      )
      .then((res) => {
        const token = res.data.data.accessToken; // Get the token from the response

        localStorage.setItem("accessToken", token);
        navigate("/");
        window.location.reload();
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
    setButtonDisabled(
      !fullName ||
        !username ||
        !email ||
        !password ||
        !avatar ||
        !coverImage ||
        !checkInput
    );
  }, [fullName, username, email, password, avatar, coverImage, checkInput]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAvatar(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleCoverImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCoverImage(file);
      setCoverImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div id="registerPage" className="flex dark">
      <div
        id="right-section"
        className="w-full fixed left-0 top-0 z-[999] bg-transparent h-screen flex flex-col justify-center items-center"
      >
        <NavLink
          id="home-btn"
          className="gap-1 min-[1000px]:bg-zinc-800 rounded-full py-2 text-white min-[1000px]:text-zinc-400 items-center font-semibold justify-center mr-auto flex px-[20px] min-[1000px]:ml-10 min-[1000px]:hover:bg-zinc-700 transition duration-300 min-[1000px]:hover:text-zinc-200 "
          to="/"
        >
          <MdArrowBackIos />
          <span>Home</span>
        </NavLink>
        <span
          id="register-title"
          className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-5xl font-semibold  mb-5 leading-none text-transparent dark:from-white dark:to-slate-900/10 py-2"
        >
          Register Account
        </span>

        <MagicCard
          className=" cursor-pointer flex-col items-center justify-center whitespace-nowrap shadow-2xl text-white w-[30rem] py-16 !h-fit max-[500px]:w-[90%] max-[1000px]:hidden"
          gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"}
        >
          <form
            className="w-full mx-auto rounded-xl flex flex-col gap-3 p-5  "
            onSubmit={handleSubmit}
          >
            {/* Avatar and Full Name */}
            <div className="flex flex-row items-center gap-3">
              <label className="w-24 h-24  rounded-full bg-[#292929] flex items-center justify-center cursor-pointer shadow-md flex-shrink-0">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden "
                />
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-gray-400">Avatar</span>
                )}
              </label>

              <section className="flex flex-col gap-2 w-full">
                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullname(event.target.value)}
                  className="w- p-2 border text-gray-200 rounded-xl bg-[#292929] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-md"
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full p-2 border text-gray-200 rounded-xl bg-[#292929] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-md"
                  placeholder="Username"
                />
              </section>
            </div>
            {/* Avatar and Full Name end */}

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full p-2 border text-gray-200 rounded-xl bg-[#292929] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-md"
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              className="w-full p-2 border text-gray-200 rounded-xl bg-[#292929] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-md"
            />
            <label className="w-full h-20 border  rounded-xl bg-[#292929] flex items-center justify-center cursor-pointer shadow-md">
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
                className="hidden"
              />
              {coverImagePreview ? (
                <img
                  src={coverImagePreview}
                  alt="Cover Image Preview"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <span className="text-gray-400">Upload Cover Image</span>
              )}
            </label>

            <div className="flex gap-2 items-center">
              <input
                onChange={(event) => setCheckInput(event.target.checked)}
                type="checkbox"
                name="terms"
                id="terms"
              />
              <label htmlFor="terms">
                I accept the <b>Terms and Condition</b>
              </label>
            </div>

            <button
              type="submit"
              disabled={buttonDisabled || processing}
              className={`${
                buttonDisabled || processing
                  ? "bg-gray-600 hover:bg-gray-600"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded-xl transition duration-300 shadow-md`}
            >
              {processing ? (
                <ClipLoader color="#ffffff" loading={true} size={16} />
              ) : (
                "Register"
              )}
            </button>
            {/* Google button */}
            <GoogleLogin />
            <h1
              className={`${
                error ? "visible" : "invisible"
              } mt-3 rounded-xl mx-auto w-full flex items-center justify-center p-2 text-red-600 border border-red-600 transition duration-300`}
            >
              Registration failed
            </h1>
          </form>
        </MagicCard>

        <ShineBorder
          className="loginForm cursor-pointer flex-col items-center justify-center whitespace-nowrap shadow-2xl text-white w-[30rem] py-16 !h-fit max-[500px]:w-[90%] min-[1000px]:hidden"
          color={["#A07CFE", "#FE8FB5", "#FFBE7B"]}
        >
          <form
            className="w-full mx-auto rounded-xl flex flex-col gap-3 p-5  "
            onSubmit={handleSubmit}
          >
            {/* Avatar and Full Name */}
            <div className="flex flex-row items-center gap-3">
              <label className="w-24 h-24  rounded-full bg-[#292929] flex items-center justify-center cursor-pointer shadow-md flex-shrink-0">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt="Avatar Preview"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-gray-400">Avatar</span>
                )}
              </label>

              <section className="flex flex-col gap-2 w-full">
                <input
                  type="text"
                  value={fullName}
                  onChange={(event) => setFullname(event.target.value)}
                  className="w-full p-2 border text-gray-700 rounded-xl bg-[#292929] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-md"
                  placeholder="Full Name"
                />
                <input
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full p-2 border text-gray-700 rounded-xl bg-[#292929] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-md"
                  placeholder="Username"
                />
              </section>
            </div>
            {/* Avatar and Full Name end */}

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full p-2 border text-gray-700 rounded-xl bg-[#292929] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-md"
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              className="w-full p-2 border text-gray-700 rounded-xl bg-[#292929] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-md"
            />
            <label className="w-full h-24 border rounded-xl bg-[#292929] flex items-center justify-center cursor-pointer shadow-md">
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
                className="hidden"
              />
              {coverImagePreview ? (
                <img
                  src={coverImagePreview}
                  alt="Cover Image Preview"
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <span className="text-gray-400">Upload Cover Image</span>
              )}
            </label>

            <div className="flex gap-2 items-center cursor-pointer">
              <input type="checkbox" name="term" id="term" />
              <label htmlFor="term" className="cursor-pointer">
                I accept the <b>Terms and Condition</b>
              </label>
            </div>

            <button
              type="submit"
              disabled={buttonDisabled || processing}
              className={`${
                buttonDisabled || processing
                  ? "bg-gray-600 hover:bg-gray-600"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded-xl transition duration-300 shadow-md`}
            >
              {processing ? (
                <ClipLoader color="#ffffff" loading={true} size={16} />
              ) : (
                "Register"
              )}
            </button>
            {/* Google button */}
            <GoogleLogin />
            <h1
              className={`${
                error ? "visible" : "invisible"
              } mt-3 rounded-xl mx-auto w-full flex items-center justify-center p-2 text-red-600 border border-red-600 transition duration-300`}
            >
              Registration failed
            </h1>
          </form>
        </ShineBorder>

        <div className="flex text-white items-center justify-center gap-4 mt-[2rem]">
          Already have an account?
          <NavLink to="/login">
            <span className="flex items-center gap-2 text-xl cursor-pointer text-blue-500 hover:text-blue-700 transition duration-300">
              <TbLogin2 />
              <b>Login</b>
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

export default Register;
