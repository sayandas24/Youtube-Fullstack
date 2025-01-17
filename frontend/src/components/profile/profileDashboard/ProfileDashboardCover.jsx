import React, { useState } from "react"; 
import NProgress from "nprogress";
import { ClipLoader } from "react-spinners";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import BasicButton from "../../UI/BasicButton";
import axiosInstance from "../../../utils/axiosInstance";


function ProfileDashboardCover({ user }) {
  const [banner, setBanner] = useState(null);
  const [bannerPreview, setBannerPreview] = useState(null);
  const [bannerLoading, setBannerLoading] = useState(false);

  // banner
  const handleBannerSubmit = (e) => {
    NProgress.start();
    setBannerLoading(true);
    e.preventDefault();
    axiosInstance
      .patch(
        "/user/cover-new",
        { coverImage: banner },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        window.location.reload();
        setBannerLoading(false);
        NProgress.done();
      })
      .catch((err) => {
        console.log(err);
        setBannerLoading(false);
        NProgress.done();
      });
  };
  const handleBannerChange = (e) => {
    const file = e.target.files[0];
    setBanner(file);
    setBannerPreview(URL.createObjectURL(file));
  };
  return (
    <section className="w-full my-5 max-[500px]:mb-0">
          {/* banner pending work */}
          <form
            encType="multipart/form-data"
            onSubmit={handleBannerSubmit}
            className="w-full relative rounded-xl group border-blue-500 h-[13rem] overflow-hidden max-[500px]:h-[10rem]"
          >
            <img
              className="w-full h-full object-cover"
              src={bannerPreview ? bannerPreview : user?.coverImage}
              alt=""
            />
            {!bannerLoading && (
              <label
                // type="submit"
                htmlFor="banner"
                className="invisible opacity-0 group-hover:visible group-hover:opacity-100 cursor-pointer duration-300 ease-in-out absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-800 text-white p-3 rounded-full"
              >
                <AddAPhotoIcon />
              </label>
            )}
            {bannerLoading && (
              <div className="flex z-[99] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <ClipLoader
                  color="#fff"
                  speedMultiplier={1.5}
                  loading={true}
                  size={37}
                />
              </div>
            )}

            {bannerPreview && !bannerLoading && (
              <div className="absolute z-10 top-2 left-1/2 -translate-x-1/2 w-fit h-fit flex items-center border border-zinc-500 bg-zinc-800/80 rounded-full justify-center ">
                <button
                  type="submit"
                  className="   bg-zinc-900/60s text-white p-2 rounded-full hover:bg-zinc-600 "
                >
                  <CheckIcon className="!fill-green-500 " />
                </button>
                <button
                  onClick={() => setBannerPreview(null)}
                  type="button"
                  className="   bg-zinc-900/60s text-white p-2 rounded-full hover:bg-zinc-600"
                >
                  <CloseIcon className="!fill-red-500 " />
                </button>
              </div>
            )}

            <input
              id="banner"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleBannerChange}
              name="banner"
            />
          </form>
        </section>
  );
}

export default ProfileDashboardCover;
