// src/components/RegisterForm.js
import React, { useState, useEffect } from "react";
import { TbLogin2 } from "react-icons/tb";
import { NavLink, useNavigate } from "react-router";
import GoogleLogin from "../googleLogin/GoogleLogin";
import axiosInstance from "../../../utils/axiosInstance";
import { ClipLoader } from "react-spinners"; // Example of a spinner component
import { MdArrowBackIos } from "react-icons/md";

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

  const [coverImagePreview, setCoverImagePreview] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);

  const navigate = useNavigate();

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
        }
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
    setButtonDisabled(!fullName || !username || !email || !password);
  }, [fullName, username, email, password]);

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
    <div id="registerPage" className="flex">
      <div
        id="right-section"
        className="w-1/2 fixed left-0 top-0 z-[99999] bg-white h-screen flex flex-col justify-center items-center"
      >
        <NavLink
          id="home-btn"
          className="flex gap-1 items-center font-semibold justify-center hidden"
          to="/"
        >
          <MdArrowBackIos />
          <span>Home</span>
        </NavLink>
        <h1 id="register-title" className="text-[2.5rem] text-center font-semibold mb-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Create An Account
        </h1>
        <form
          className="w-[30rem] mx-auto rounded-xl flex flex-col gap-3 p-5 shadow-lg bg-white"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            value={fullName}
            onChange={(event) => setFullname(event.target.value)}
            className="w-full p-2 border text-gray-700 rounded-xl bg-[#f3f7f9] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-md"
            placeholder="Full Name"
          />
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full p-2 border text-gray-700 rounded-xl bg-[#f3f7f9] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-md"
            placeholder="Username"
          />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full p-2 border text-gray-700 rounded-xl bg-[#f3f7f9] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-md"
            placeholder="Email"
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
            className="w-full p-2 border text-gray-700 rounded-xl bg-[#f3f7f9] focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-md"
          />
          <div className="flex flex-col items-center gap-3">
            <label className="w-24 h-24 border rounded-full bg-[#f3f7f9] flex items-center justify-center cursor-pointer shadow-md">
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
                <span className="text-gray-700">Upload Avatar</span>
              )}
            </label>
            <label className="w-full h-24 border rounded-xl bg-[#f3f7f9] flex items-center justify-center cursor-pointer shadow-md">
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
                <span className="text-gray-700">Upload Cover Image</span>
              )}
            </label>
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" name="terms" id="terms" />
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
        <div className="flex items-center justify-center gap-4 mt-[2rem]">
          Already have an account?
          <NavLink to="/login">
            <span className="flex items-center gap-2 text-xl cursor-pointer text-blue-500 hover:text-blue-700 transition duration-300">
              <TbLogin2 />
              <b>Login</b>
            </span>
          </NavLink>
        </div>
      </div>

      <div
        id="left-section"
        className="w-1/2 fixed right-0 top-0 z-[99999] h-screen bg-gradient-to-r from-blue-500 to-purple-600"
      >
        <NavLink to="/">
          <button className="text-white font-bold py-2 px-4 rounded-xl mt-5 ml-5 hover:bg-blue-700 transition duration-300">
            Home
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default Register;
