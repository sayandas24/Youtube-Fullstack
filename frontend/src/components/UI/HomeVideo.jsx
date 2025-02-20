import { BlurFade } from "@/components/magicui/blur-fade";
import { NavLink } from "react-router";
import axiosInstance from "../../utils/axiosInstance";
import timeSince from "../../utils/timeSince";

export function HomeVideo({ videos }) {
  const formSubmit = (e, videoLink) => {
    e.preventDefault();
    axiosInstance
      .get(`/video/p/${videoLink}`)
      .then((res) => {
        // pass to context
        console.log("passed video");
      })
      .catch((err) => console.log(err));
  };

  return (
    // <section id="photos">
    videos.map((file) => (
      <section id="photos" key={file._id} className="h-fit ">
        <form onSubmit={(e) => formSubmit(e, file._id)}>
          <main
            onClick={(e) => {
              e.currentTarget.closest("form").requestSubmit();
            }}
            id="eachVideo"
            className="flex overflow-hidden cursor-pointer flex-col gap-1 mb-5 "
          >
            <NavLink
              to={`/p/${file._id}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="videoParent relative border h-[18rem]   border-black bg-zinc-600 rounded-3xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-transparent duration-200 hover:bg-[#f0f0f010]"></div>
              <BlurFade className="w-full h-full">
                <img
                  className="w-full h-full object-cover"
                  src={file.thumbnail}
                  alt="video"
                />
              </BlurFade>
            </NavLink>

            <NavLink
              to={`/channel/${file.owner.username}`}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex gap-2"
            >
              {/* Avatar */}
              <div className="w-[2.8rem] h-[2.8rem] max-sm:ml-2">
                <div className="w-[2.8rem] h-[2.8rem] overflow-hidden rounded-full">
                  <img
                    className="w-full h-full object-cover"
                    src={file.owner.avatar}
                    alt="avatar"
                  />
                </div>
              </div>
              {/* Avatar name, description */}
              <div className="flex flex-col text-white w-[95%] dark:!text-black">
                <h1 className="text-[1rem] leading-5">{file.title}</h1>
                <p className="text-[.8rem] text-zinc-400 dark:text-zinc-800">
                  {file.owner.fullName}
                </p>
                <p className="text-[.8rem] text-zinc-400 dark:text-zinc-800">
                  {file.viewsCount} views | posted {timeSince(file.createdAt)}
                </p>
              </div>
            </NavLink>
          </main>
        </form>
      </section>
    ))
  );
}
