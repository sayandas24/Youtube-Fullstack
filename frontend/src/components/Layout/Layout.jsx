import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Outlet, useParams } from "react-router";
import Sidebar from "./Sidebar";
import NewFeatureMSG from "../UI/NewFeatureMSG";
import axiosInstance from "../../utils/axiosInstance";
import SidebarMobile from "./SidebarMobile";

function Layout() { 

  return (
    <div className="flex h-screen flex-col">
       
      <NewFeatureMSG />
      <Navbar />
      <Outlet /> 
      <SidebarMobile/> 
    </div>
  );
}

export default Layout;
