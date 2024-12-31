import "./App.css";
import "./script.js";
import Home from "./components/Home/Home.jsx";
import Video from "./components/Video/Video.jsx";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router";
import Layout from "./components/Layout/Layout.jsx";
import Login from "./components/auth/login/Login.jsx";
import Register from "./components/auth/register/Register.jsx";
import NotSignPopupMenu from "./components/ProfileMenuPopup/NotSignPopupMenu.jsx";
import SignPopupMenu from "./components/ProfileMenuPopup/SignPopupMenu.jsx";
import VideoPost from "./components/videoPost/VideoPost.jsx";
import VideoUpload from "./components/videoPost/VideoUpload.jsx";
import ProfilePage from "./components/profile/ProfilePage.jsx";
import UpdateVideo from "./components/videoPost/UpdateVideo.jsx";
import { SkeletonTheme } from "react-loading-skeleton";
import ProfileDashboard from "./components/profile/ProfileDashboard.jsx"; 
import "nprogress/nprogress.css"; // Default styles 

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "p/:videoId",
          element: <Video />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
        {
          path: "menu",
          element: <SignPopupMenu />,
        },
        {
          path: "notsignmenu",
          element: <NotSignPopupMenu />,
        },
        {
          path: "upload",
          element: <VideoUpload />,
        },
        {
          path: "video-upload",
          element: <VideoPost />,
        },
        {
          path: "profile",
          element: <ProfilePage />,
        },
        {
          path: "video-update/:id",
          element: <UpdateVideo />,
        },
        {
          path: "dashboard",
          element: <ProfileDashboard />,
        },
      ],
    },
  ]);

  return (
    <>
      <SkeletonTheme color="#202020" highlightColor="#444">
        <RouterProvider router={router}>
          <Login />
        </RouterProvider>
      </SkeletonTheme>
    </>
  );

 
}

export default App;
