import React, { useContext, useEffect, useState } from "react";
import { FaImages } from "react-icons/fa6";
import axiosInstance from "../../utils/axiosInstance";
import nProgress, { set } from "nprogress";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { FeatureSoonContext } from "../../contexts/featureSoonContext/UseFeatureSoon";
import LoginErrorWarn from "../../utils/LoginErrorWarn";
import { BsThreeDots } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";

function Tweets({ userDetail, currUser }) {
  const [tweetImage, setTweetImage] = useState(null);
  const [tweetPreview, setTweetPreview] = useState(null);
  const [tweetContent, setTweetContent] = useState("");
  const [showTweetForm, setShowTweetForm] = useState(false);
  const [allTweets, setAllTweets] = useState([]);
  const [error, setError] = useState(false);
  const [showDeleteBtn, setShowDeleteBtn] = useState(false);
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);

  const [hoveredTweetId, setHoveredTweetId] = useState(null);

  const { setIsLoginUser } = useContext(FeatureSoonContext);

  // console.log(tweetImage);

  const handleTweetImageChange = (e) => {
    const file = e.target.files[0];
    setTweetImage(file);
    setTweetPreview(URL.createObjectURL(file));
  };

  const handleForm = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("content", tweetContent);
    if (tweetImage) {
      formData.append("tweetImage", tweetImage);
    }
    console.log(tweetImage);

    if (!tweetContent == " ") {
      nProgress.start();
      axiosInstance
        .post("/tweet", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          const newTweet = {
            ...res.data.data,
            likesCount: 0,
            isCurrentUserLiked: false,
          };
          setTweetContent("");
          setTweetImage(null);
          setTweetPreview(null);
          nProgress.done();
          setAllTweets((prev) => [...prev, newTweet]);
        })
        .catch((err) => {
          console.log(err);
          setTweetContent("");
          setTweetImage(null);
          nProgress.done();
        });
    }
  };

  useEffect(() => {
    if (currUser._id && userDetail._id === currUser._id) {
      setShowDeleteBtn(true);
    }
    if (userDetail._id) {
      axiosInstance
        .get(`/tweet/${userDetail._id}`)
        .then((res) => {
          setAllTweets(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });

      if (currUser) {
        if (currUser._id === userDetail._id) {
          setShowTweetForm(true);
        }
      }
    }
  }, []);

  const handleDeleteTweet = (id) => {
    axiosInstance
      .get("/user/current-user")
      .then((res) => {
        setIsLoginUser(true);
      })
      .catch((err) => {
        setIsLoginUser(false);
      });

    nProgress.start();
    axiosInstance
      .delete(`/tweet/delete-tweet/${id}`)
      .then((res) => {
        nProgress.done();
        setAllTweets((prev) => prev.filter((tweet) => tweet._id !== id));
      })
      .catch((err) => {
        console.log(err);
        nProgress.done();
      });
  };

  const handleLikeTweet = (id, currUserLiked) => {
    axiosInstance
      .get("/user/current-user")
      .then((res) => {
        setIsLoginUser(true);
      })
      .catch((err) => {
        setIsLoginUser(false);
      });
    if (!currUser._id) {
      console.log("not logged in");
      setError(true);
      return;
    }

    if (currUserLiked === true) {
      axiosInstance.get(`/like/dislike-tweet/${id}`).then((res) => {
        setAllTweets((prev) =>
          prev.map((tweet) => {
            if (tweet._id === id) {
              return {
                ...tweet,
                isCurrentUserLiked: false,
                likesCount: tweet.likesCount - 1,
              };
            }
            return tweet;
          })
        );
      });
    }

    if (currUserLiked === false) {
      axiosInstance.get(`/like/like-tweet/${id}`).then((res) => {
        setAllTweets((prev) =>
          prev.map((tweet) => {
            if (tweet._id === id) {
              return {
                ...tweet,
                isCurrentUserLiked: true,
                likesCount: tweet.likesCount + 1,
              };
            }
            return tweet;
          })
        );
      });
    }
  };

  // TODO: like count in tweets
  return (
    <main className="p-3 max-[500px]:p-2">
      {showTweetForm && (
        <form
          onSubmit={handleForm}
          className="border border-zinc-700 rounded-xl max-[500px]:p-2 p-5 min-h-[10rem] w-[55rem] mt-10 max-[1000px]:w-[100%]"
        >
          <section className="flex justify-between items-center">
            <div className="flex gap-3 items-center">
              <div className="rounded-full w-[3rem] h-[3rem] overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={userDetail?.avatar}
                  alt=""
                />
              </div>
              <h2>{userDetail?.username}</h2>
            </div>

            <div className="text-zinc-500">Visibility: Public</div>
          </section>

          <section>
            <textarea
              type="text"
              onChange={(e) => setTweetContent(e.target.value)}
              value={tweetContent}
              placeholder="What's happening?"
              className="mt-2  w-full min-h-[5rem] py-5 bg-transparent outline-none"
              required
            />
          </section>

          <section className="flex justify-between items-center max-[360px]:flex-wrap">
            <label
              htmlFor="tweetImage"
              className="flex gap-3 items-center cursor-pointer hover:bg-zinc-800 p-2 px-4 rounded-full"
            >
              <FaImages className="text-xl" />
              <span>Image</span>
              <input
                type="file"
                className="hidden"
                id="tweetImage"
                onChange={handleTweetImageChange}
              />
            </label>

            <div className="flex gap-3 text-[13px] font-semibold">
              <div
                onClick={() => {
                  setTweetContent("");
                  setTweetImage(null);
                  setTweetPreview(null);
                }}
                className="p-2 px-5 hover:bg-zinc-800 active:bg-zinc-700 rounded-full cursor-pointer"
              >
                Cancel
              </div>
              <button className="p-2 px-6 bg-blue-500 hover:bg-blue-700 active:bg-blue-800 rounded-full cursor-pointer">
                Tweet
              </button>
            </div>
          </section>

          <section className="max-[500px]:p-2">
            {tweetPreview && (
              <div className="mt-2 max-w-[45rem] h-[20rem] rounded-xl overflow-hidden max-[350px]:mt-5 ">
                <img
                  className="w-full h-full object-cover"
                  src={tweetPreview}
                  alt=""
                />
              </div>
            )}
          </section>
        </form>
      )}

      <section className="max-[500px]:mb-[3rem] flex flex-col gap-2 mt-10">
        {allTweets &&
          allTweets.map((tweet, index) => {
            return (
              <div
                key={tweet._id}
                className="border border-zinc-700 rounded-xl p-5 min-h-[10rem] w-[55rem] max-[1000px]:w-[100%]"
              >
                <section className="flex justify-between">
                  <div className="flex gap-3 ">
                    <div className="rounded-full w-[3rem] h-[3rem] overflow-hidden">
                      <img
                        className="w-full h-full object-cover"
                        src={userDetail?.avatar}
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col flex-1">
                      <h1>{userDetail?.username}</h1>
                      <h2 className="text-lg mt-3">{tweet?.content}</h2>
                      <div className="mt-1 max-w-[40rem] rounded-xl overflow-hidden">
                        {tweet?.contentImage && (
                          <img
                            className="w-full h-full object-cover"
                            src={tweet?.contentImage || ""}
                            alt=""
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  {showDeleteBtn && (
                    <div
                      onClick={() => {
                        setHoveredTweetId(tweet._id);
                        setShowDeleteIcon(!showDeleteIcon);
                      }}
                      className="text-2xl border cursor-pointer relative hover:bg-zinc-800 active:bg-transparent active:border-zinc-800 border-transparent duration-100  rounded-full h-fit w-fit p-2"
                    >
                      <BsThreeDots />
                      {hoveredTweetId === tweet._id && showDeleteIcon && (
                        <div
                          onClick={() => handleDeleteTweet(tweet._id)}
                          className="border bg-[#410101] rounded-xl absolute top-14 right-0 border-red-800 overflow-hidden py-2"
                        >
                          <div className="text-xl  px-10 py-1 flex gap-2 items-center">
                            <MdDeleteOutline className="text-2xl text-red-500" />
                            <span className="text-lg font-semibold">
                              Delete
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </section>

                <section className="flex justify-between w-full mt-5">
                  <div
                    onClick={() =>
                      handleLikeTweet(tweet._id, tweet.isCurrentUserLiked)
                    }
                    className="flex gap-3 items-center hover:bg-zinc-800 cursor-pointer rounded-full p-5 py-2"
                  >
                    {tweet.isCurrentUserLiked ? (
                      <ThumbUpIcon />
                    ) : (
                      <ThumbUpOutlinedIcon />
                    )}{" "}
                    <span className="font-semibold w-3">
                      {tweet?.likesCount || 0}
                    </span>
                  </div>
                </section>
              </div>
            );
          })}
      </section>

      <LoginErrorWarn />
    </main>
  );
}

export default Tweets;
