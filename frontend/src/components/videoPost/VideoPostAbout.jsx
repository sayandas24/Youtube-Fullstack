import React, { useEffect, useState } from "react";
import { LuImageDown } from "react-icons/lu";
import { RiGeminiFill } from "react-icons/ri";
import VideoPostFooter from "./VideoPostFooter";
import "../../script.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import VideoPostRight from "./VideoPostPlayer.jsx";

// FIXME: bottom right upload button is not allign

function VideoPostAbout({
  file,
  existingVideo = null,
  videoUrl,
  fileSizeReadable,
  removeVideo,
}) {
  const [title, setTitle] = useState(existingVideo?.title || "");
  const [description, setDescription] = useState(
    existingVideo?.description || ""
  );
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [thumbnailPreview, setThumbnailPreview] = useState(
    existingVideo?.thumbnail
  );
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      // Check if file size is greater than 5MB
      setError("Thumbnail size should be less than 5MB");
      setThumbnail(null);
      setThumbnailPreview(null);
    } else {
      setError("");
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    } else if (existingVideo) {
      formData.append("thumbnail", existingVideo.thumbnail);
    }

    if (existingVideo === null) {
      formData.append("videoFile", file);

      axiosInstance
        .post("/video/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          navigate("/");
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    } else {
      axiosInstance
        .patch(`/video/update/${existingVideo._id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          navigate("/profile");
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (existingVideo) {
      setTitle(existingVideo.title);
      setDescription(existingVideo.description);
      setThumbnailPreview(existingVideo.thumbnail);
      setThumbnail(existingVideo.thumbnail);
    }
  }, [existingVideo]);

  return (
    <form
      id="upload-video-details-small-form"
      onSubmit={handleSubmit}
      className="relative min-h-[80%] rounded-xl flex flex-col gap-2 max-[720px]:w-full"
    >
      <main className="flex  px-[2rem] gap-5 max-[720px]:flex-col-reverse max-[720px]:items-center max-[720px]:gap-3 max-[720px]:px-[1rem] max-[500px]:px-1">
        <section className="w-[65%] h-full rounded-xl flex flex-col gap-2 max-[720px]:w-full">
          <h1 className="text-2xl font-semibold ">Details</h1>
          {/* title */}
          <div className="input-box ">
            <input
              required=" "
              type="text"
              className="input border border-zinc-500"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <label className="label text--flicking">
              Title<sup>*</sup>
            </label>
          </div>
          {/* description */}
          <div className="input-box">
            <textarea
              required=" "
              rows="8"
              className="input w-full resize-none bg-transparent rounded-lg border border-zinc-500"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
            ></textarea>
            <label className="label text--flicking">
              Description<sup>*</sup>
            </label>
          </div>

          {/* Thumbnail */}
          <div className="flex flex-col leading-5">
            <h1 className="text-[15px] ">Thumbnail</h1>
            <p className="text-[12px] text-zinc-400">
              Set a thumbnail that stands out and draws viewers attention
            </p>
          </div>

          <div className="flex gap-5 max-[720px]:gap-2">
            <section>
              <label
                htmlFor="thumbnail"
                className="cursor-pointer  border w-[10rem] h-[5rem] border-zinc-400 rounded-lg border-dashed gap-1 flex-col items-center justify-center flex max-[360px]:w-[45vw]"
              >
                {thumbnailPreview ? (
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="w-full h-full object-cover rounded-lg"
                  />
                ) : (
                  <>
                    <LuImageDown className="text-xl text-zinc-300" />
                    <h1 className="text-[11px] text-zinc-300">
                      Upload Thumbnail
                    </h1>
                  </>
                )}
              </label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleThumbnailChange}
                name="thumbnail"
              />
            </section>

            <section>
              <label
                htmlFor="none"
                className="max-[360px]:w-[45vw]   border w-[10rem]  h-[5rem] border-zinc-400 rounded-lg border-dashed gap-1 flex-col items-center justify-center flex cursor-not-allowed"
              >
                <RiGeminiFill className="text-xl text-zinc-300" />
                <div className="leading-[12px]">
                  <h1 className="text-[11px] text-zinc-300 ">
                    Generate with Ai
                  </h1>
                  <h2 className="text-[9px] text-zinc-300 ">
                    (under development)
                  </h2>
                </div>
              </label>
              <input id="" type="file" accept="image/*" className="hidden" />
            </section>
          </div>

          {/* Tags */}
          <div className="flex flex-col mt-3">
            <h1 className="text-[15px] ">Tags</h1>
            <p className="text-[12px] text-zinc-400">
              Add tags to help viewers discover your video
            </p>
          </div>
        </section>

        <section className="max-[720px]:w-full">
          <VideoPostRight
            file={file}
            videoUrl={videoUrl}
            fileSizeReadable={fileSizeReadable}
            removeVideo={true}
          />
        </section>
      </main>

      {error && <p className="text-red-500">{error}</p>}

      <div className="w-full left-0 -bottom-20 absolute px-1">
        <VideoPostFooter loading={loading} />
      </div>
    </form>
  );
}

export default VideoPostAbout;
