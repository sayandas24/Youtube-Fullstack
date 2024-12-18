
import "./App.css"; 
import Home from "./components/Home/Home.jsx";
import Video from "./components/Video/Video.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/Layout/Layout.jsx";
import Login from "./components/auth/login/Login.jsx";
import Register from "./components/auth/register/Register.jsx";
import PopupMenu from "./components/ProfileMenu/SignPopupMenu.jsx";
import NotSignPopupMenu from "./components/ProfileMenu/NotSignPopupMenu.jsx";
import SignPopupMenu from "./components/ProfileMenu/SignPopupMenu.jsx";

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
          path: "/login",
          element: <Login/>
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path: "menu",
          element: <SignPopupMenu/>
        },
        {
          path: "notsignmenu",
          element: <NotSignPopupMenu/>
        }
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router}>
        <Login/>
      </RouterProvider>
    </>
  );
}

export default App;
