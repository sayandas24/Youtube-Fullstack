import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import NProgress from "nprogress";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { ClipLoader } from "react-spinners";

function ProfileDashboardDP({ user }) {
  const [avatar, setAvatar] = useState(null);
  const [loadingIcon, setLoadingIcon] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [fullName, setFullName] = useState(user?.fullName);
  const [username, setUsername] = useState(user?.username);
  const [editOpen, setEditOpen] = useState(true);
  const [usernameError, setUsernameError] = useState(false);

  const fullNameRef = useRef(null);
  const usernameRef = useRef(null);
  const fullNameSpanRef = useRef(null);
  const usernameSpanRef = useRef(null);

  // Adjust input width based on text
  useEffect(() => {
    if (fullNameSpanRef.current && fullNameRef.current) {
      fullNameRef.current.style.width = `${fullNameSpanRef.current.offsetWidth}px`;
    }
  }, [fullName]);

  useEffect(() => {
    if (usernameSpanRef.current && usernameRef.current) {
      usernameRef.current.style.width = `${usernameSpanRef.current.offsetWidth}px`;
    }
  }, [username]);

  const handleAvatarSubmit = (e) => {
    NProgress.start();
    setLoadingIcon(true);
    e.preventDefault();
    axiosInstance
      .patch(
        "/user/avatar-new",
        { avatar },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        window.location.reload();
        setLoadingIcon(false);
        NProgress.done();
      })
      .catch((err) => {
        console.log(err);
        setLoadingIcon(false);
        NProgress.done();
      });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleUserDetails = (e) => {
    e.preventDefault();
    axiosInstance
      .patch("/user/update-account", { fullName, username })
      .then((res) => {
        console.log(res);
        setUsernameError(false);
        setEditOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setUsernameError(true);
      });
  };

  const onEditClick = () => {
    setEditOpen(false);
  };

  return (
    <section className="my-5  ">
      <div className="flex gap-3">
        <form
          encType="multipart/form-data"
          onSubmit={handleAvatarSubmit}
          className="group relative left w-[10rem] h-[10rem] rounded-full overflow-hidden max-[500px]:w-[7rem] max-[500px]:h-[7rem] flex-shrink-0"
        >
          <img
            className="w-full h-full object-cover"
            src={avatarPreview ? avatarPreview : user?.avatar}
            alt=""
          />
          {!loadingIcon && (
            <label
              htmlFor="avatar"
              className={`${avatarPreview? "max-[500px]:mt-5 max-[500px]:p-2": ""} invisible opacity-0 group-hover:visible group-hover:opacity-100 cursor-pointer duration-300 ease-in-out absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-800 text-white p-3 rounded-full`}
            >
              <AddAPhotoIcon className=""/>
            </label>
          )}
          {loadingIcon && (
            <div className="flex z-[99] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <ClipLoader
                color="#fff"
                speedMultiplier={1.5}
                loading={true}
                size={37}
              />
            </div>
          )}
          {avatarPreview && !loadingIcon && (
            <div className="absolute z-10 top-2 left-1/2 -translate-x-1/2 w-fit h-fit flex items-center border border-zinc-500 bg-zinc-800/80 rounded-full justify-center ">
              <button
                type="submit"
                className="bg-zinc-900/60s text-white p-2 rounded-full hover:bg-zinc-600"
              >
                <CheckIcon className="!fill-green-500" />
              </button>
              <button
                onClick={() => setAvatarPreview(null)}
                type="button"
                className="bg-zinc-900/60s text-white p-2 rounded-full hover:bg-zinc-600"
              >
                <CloseIcon className="!fill-red-500" />
              </button>
            </div>
          )}
          <input
            id="avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
            name="avatar"
          />
        </form>

        <form
          onSubmit={handleUserDetails}
          className="right flex flex-col justify-center"
        >
          {/* Full Name Input */}
          <span
            ref={fullNameSpanRef}
            className="invisible absolute whitespace-pre font-semibold text-xl "
          >
            {fullName || " "}
          </span>
          <input
            type="text"
            ref={fullNameRef}
            disabled={editOpen}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={`${!editOpen ? "border-b-zinc-500" : ""} bg-transparent border-b border-b-transparent outline-none text-xl font-semibold`}
          />

          {/* Username Input */}
          <p className="text-lg font-semibold">
            <span
              ref={usernameSpanRef}
              className="invisible absolute whitespace-pre text-zinc-300 dark:text-zinc-800"
            >
              {username || " "}
            </span>
            <input
              type="text"
              ref={usernameRef}
              disabled={editOpen}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`${!editOpen ? "border-b-zinc-500" : ""} bg-transparent border-b border-b-transparent outline-none text-zinc-300 dark:text-zinc-600`}
            />
            <span className="max-[400px]:hidden mx-2 text-zinc-500 font-[400]">
              | &nbsp; {user?.subscribersCount} subscribers
            </span>
            <div className={`min-[400px]:hidden text-zinc-500 font-[400]`}>{user?.subscribersCount} subscribers </div>
          </p>

          {/* Buttons */}
          <div className="flex gap-2 items-center mt-3">
            {editOpen && (
              <div
                onClick={onEditClick}
                className="basicButton2 p-3 rounded-full"
              >
                Edit Profile
              </div>
            )}
            {!editOpen && (
              <div className="h-fit flex items-center bg-[#2e2e2e] rounded-full justify-evenly overflow-hidden">
                <button
                  type="submit"
                  className="bg-zinc-900/60s text-white p-[6.5px] px-[13.2px] hover:bg-zinc-600"
                >
                  <CheckIcon className="!fill-green-500" />
                </button>
                <button
                  onClick={() => setEditOpen(true)}
                  type="button"
                  className="bg-zinc-900/60s text-white p-[6.5px] px-[13.2px] hover:bg-zinc-600"
                >
                  <CloseIcon className="!fill-red-500" />
                </button>
              </div>
            )}
          </div>

          <p
            className={`${
              usernameError ? "visible motion-preset-confetti" : "invisible"
            } text-red-500`}
          >
            username already exists
          </p>
        </form>
      </div>
    </section>
  );
}

export default ProfileDashboardDP;
