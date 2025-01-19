import React, { useContext } from "react";
import { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import axiosInstance from "../../utils/axiosInstance";
import { NavLink } from "react-router";
import NProgress from "nprogress";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import LoginErrorWarn from "../../utils/LoginErrorWarn";
import { FeatureSoonContext } from "../../contexts/featureSoonContext/UseFeatureSoon";

function Comments({ getVideo }) {
  const [content, setContent] = useState("");
  const [commentNumber, setCommentNumber] = useState(null);
  const [OwnerOfComment, setOwnerOfComment] = useState([]);
  const [loginUser, setLoginUser] = useState({});

  const { setIsLoginUser } = useContext(FeatureSoonContext);

  useEffect(() => {
    if (getVideo?.comments) {
      setOwnerOfComment(getVideo.comments);
      setCommentNumber(getVideo.commentCount);
    }
  }, [getVideo]);

  useEffect(() => {
    axiosInstance.get("/user/current-user").then((res) => {
      setLoginUser(res.data.data);
    });
  }, []);

  // Function to add a new comment
  const formSubmit = async (e) => {
    NProgress.start();
    e.preventDefault();
    try {
      // Post the new comment to the server
      const response = await axiosInstance
        .post(`/comment/comment-video/${getVideo._id}`, { content })
        .finally(() => {
          NProgress.done();
        });

      // Assuming the server returns the newly created comment with its `_id`
      const newComment = response.data.data;

      // Update the state to include the new comment
      setOwnerOfComment((prevComments) => [
        ...prevComments,
        {
          ...newComment, // Include the `_id` from the server response
          commentOwner: loginUser,
          timestamp: "Just now", // Optional: you can use the server's timestamp
        },
      ]);

      setCommentNumber((prevCount) => prevCount + 1);

      // Clear the input field
      setContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
      NProgress.done();
    }
  };

  // Function to delete a comment
  const handleCommentDelete = async (commentOwnerId, commentId) => {
    if (loginUser._id === commentOwnerId) {
      NProgress.start();
      try {
        // Send the delete request to the server
        await axiosInstance
          .delete(`/comment/delete-comment-video/${commentId}`)
          .finally(() => {
            NProgress.done();
          });

        // Update the state by filtering out the deleted comment
        setOwnerOfComment(
          (prevComments) =>
            prevComments.filter((comment) => comment._id !== commentId) // Correct filter logic
        );

        // Decrement the comment count
        setCommentNumber((prevCount) => prevCount - 1);
      } catch (error) {
        console.error("Error deleting comment:", error);
        NProgress.done();
      }
    }
  };

  // handleCommentLike
  const handleCommentLike = async (commentId, ownerLiked) => {
    axiosInstance
      .get("/user/current-user")
      .then((res) => {
        setIsLoginUser(true);
      })
      .catch((err) => {
        setIsLoginUser(false);
      });
    if (loginUser._id) {
      if (ownerLiked === false) {
        axiosInstance
          .get(`/like/video-comment-like/${commentId}`)
          .then((res) => {
            setOwnerOfComment((prevComments) =>
              prevComments.map((comment) => {
                if (comment._id === commentId) {
                  return {
                    ...comment,
                    isCurrentUserLiked: true,
                    commentLikesCount: comment.commentLikesCount + 1,
                  };
                }
                return comment;
              })
            );
          })
          .catch((err) => {
            console.error(err);
          });
      }

      if (ownerLiked === true) {
        axiosInstance
          .get(`/like/video-comment-dislike/${commentId}`)
          .then((res) => {
            setOwnerOfComment((prevComments) =>
              prevComments.map((comment) => {
                if (comment._id === commentId) {
                  return {
                    ...comment,
                    isCurrentUserLiked: false,
                    commentLikesCount: comment.commentLikesCount - 1,
                  };
                }
                return comment;
              })
            );
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  };

  return (
    <div className="flex gap-2 w-full h-full  border-zinc-600 p-2 py-5  flex-col max-[1000px]:border-b">
      <LoginErrorWarn />
      {/* video description */}
      <div className="flex flex-col gap-2">
        <h1 className="text-[1.2rem] font-semibold">
          {getVideo ? commentNumber : 0} Comments
        </h1>

        {/* profile and input */}
        {loginUser?.username ? (
          <section className="flex gap-5 ">
            <div className="w-[3rem]">
              <div className="w-[50px] h-[50px] overflow-hidden rounded-full">
                <img
                  className="bg-zinc-600 w-full h-full object-cover scale-105"
                  src={loginUser?.avatar}
                />
              </div>
            </div>
            {/* input, cancel, comment */}

            <form
              method="post"
              action=""
              className="flex flex-col w-full gap-2"
            >
              <div className="  ">
                {/* make an underlined input */}
                <input
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  type="text"
                  className="w-full bg-transparent focus:outline-none border-b border-zinc-600 focus:border-zinc-400"
                  placeholder="Add a comment..."
                />
              </div>
              <div className="flex gap-2 justify-end">
                <div
                  disabled={content === ""}
                  onClick={() => setContent("")}
                  className={`${
                    content === "" ? "opacity-50 pointer-events-none" : ""
                  } p-[.4rem] px-5 border border-zinc-600 rounded-full text-sm font-semibold hover:bg-[#3a3a3a] cursor-pointer`}
                >
                  Cancel
                </div>
                <button
                  type="submit"
                  disabled={content === ""}
                  onClick={(e) => formSubmit(e)}
                  className={`${
                    content === "" ? "opacity-50 pointer-events-none" : ""
                  } p-[.4rem] px-5 bg-blue-600 active:bg-blue-800 border-zinc-600 rounded-full text-sm font-semibold`}
                >
                  Comment
                </button>
              </div>
            </form>
          </section>
        ) : (
          <h2>
            <NavLink to="/login" className="text-blue-400 font-semibold">
              Login here
            </NavLink>{" "}
            to comment
          </h2>
        )}
        <hr className="border-zinc-600 my-3" />

        {/* comments by user */}
        <section className="flex gap-5 flex-col">
          {/* Set the owner length :TODO */}
          {OwnerOfComment.length > 0 ? (
            OwnerOfComment.map((user, idx) => (
              <div key={user._id || idx} className="flex gap-2">
                {/* Profile pic */}
                <NavLink
                  to={`/channel/${user.commentOwner.username}`}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="w-[3rem]"
                >
                  <div className="w-[45px] h-[45px] overflow-hidden rounded-full">
                    <img
                      className="w-full h-full object-cover"
                      src={user.commentOwner.avatar || ""}
                      alt="Profile"
                    />
                  </div>
                </NavLink>
                {/* Profile name, comment */}
                <div className="flex flex-col gap-1">
                  <h1 className="text-[1rem] flex gap-2 items-center">
                    <NavLink
                      to={`/channel/${user.commentOwner.username}`}
                      onClick={() =>
                        window.scrollTo({ top: 0, behavior: "smooth" })
                      }
                      className="cursor-pointer"
                    >
                      @{user.commentOwner.username || "Anonymous"}
                    </NavLink>
                    <span className="text-zinc-500 text-[.7rem]">
                      {user.timestamp || "Just now"}
                    </span>
                  </h1>
                  <p className="text-[.85rem] ml-1">
                    {user.content || "No comment provided."}
                  </p>
                  <div className="flex gap-2 text-[.8rem]">
                    <span className="flex items-center gap-1 font-light">
                      <div
                        onClick={() =>
                          handleCommentLike(user._id, user.isCurrentUserLiked)
                        }
                      >
                        {user.isCurrentUserLiked ? (
                          <ThumbUpIcon className="cursor-pointer text-zinc-300 !text-[2rem] hover:bg-zinc-700 p-1 rounded-full" />
                        ) : (
                          <ThumbUpOutlinedIcon className="cursor-pointer text-zinc-300 !text-[2rem] hover:bg-zinc-700 p-1 rounded-full" />
                        )}
                      </div>

                      <span className="w-4">{user.commentLikesCount || 0}</span>
                    </span>

                    <span className="font-semibold hover:bg-zinc-700 p-1 rounded-full px-2 cursor-pointer my-auto">
                      Reply
                    </span>
                  </div>
                </div>
                {/* More button */}
                <div className="self-center ml-auto">
                  <BsThreeDotsVertical
                    onClick={() => handleCommentDelete(user.owner, user._id)}
                    className="text-[1.8rem] rounded-full border-zinc-600 active:border p-1 cursor-pointer"
                  />
                </div>
              </div>
            ))
          ) : (
            <p>No comments yet. Be the first to comment!</p>
          )}
        </section>
      </div>
    </div>
  );
}

export default Comments;
