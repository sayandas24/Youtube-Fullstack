import React from "react";
import {  NavLink } from "react-router"; 

function Navbar() {
  return (
    <nav className="">
      <ul className="flex text-md text-white  gap-5 bg-blue-800">
        <NavLink to="/" className={({isActive}) => `${isActive? "bg-gray-500": "bg-blue-800"} rounded-full p-4 py-1` }>
          <li>Home</li>
        </NavLink>
        <NavLink to="/v" className={({isActive}) => `${isActive? "bg-gray-500": "bg-blue-800"} rounded-full p-4 py-1` }>
          <li>Video</li>
        </NavLink> 
      </ul>
    </nav>
  );
}

export default Navbar;
