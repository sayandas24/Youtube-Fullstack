import React, { useEffect, useState } from "react";
import { FaImages } from "react-icons/fa6";
import axiosInstance from "../../utils/axiosInstance";
import nProgress from "nprogress";

function Tweets({ userDetail, currUser }) {
  const [tweetImage, setTweetImage] = useState(null);
  const [tweetPreview, setTweetPreview] = useState(null);
  const [tweetContent, setTweetContent] = useState("");
  const [showTweetForm, setShowTweetForm] = useState(false);
  const [allTweets, setAllTweets] = useState([]);

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
          setTweetContent("");
          setTweetImage(null);
          setTweetPreview(null);
          nProgress.done();
          setAllTweets((prev) => [...prev, res.data.data]);
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
  }, []);

  const handleDeleteTweet = (id) => {
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
  console.log(allTweets);

  // TODO: like count in tweets
  return (
    <main>
      {showTweetForm && (
        <form
          onSubmit={handleForm}
          className="border border-zinc-700 rounded-xl p-5 min-h-[10rem] w-[55rem] mt-10"
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
            />
          </section>

          <section className="flex justify-between items-center">
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

          <section>
            {tweetPreview && (
              <div className="mt-2 w-[45rem] h-[20rem] rounded-xl overflow-hidden">
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

      {allTweets &&
        allTweets.map((tweet) => {
          return (
            <div
              key={tweet._id}
              className="border border-zinc-700 rounded-xl p-5 min-h-[10rem] w-[55rem] mt-10"
            >
              <section className="flex justify-between ">
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
                    <div className="mt-1 w-[40rem] rounded-xl overflow-hidden">
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

                <div
                  onClick={() => handleDeleteTweet(tweet._id)}
                  className="text-zinc-500 cursor-pointer"
                >
                  Delete
                </div>
              </section>
            </div>
          );
        })}
    </main>
  );
}

export default Tweets;
