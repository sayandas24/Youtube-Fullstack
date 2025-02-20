import React, { useContext } from "react";
import "./darkModeSwitch.css";
import { UseDarkModeContext } from "../../contexts/darkModeContext/UseDarkMode";

export default function DarkModeSwitch() {
  const { darkMode, setDarkMode } = useContext(UseDarkModeContext);

  return ( 
      <label
        htmlFor="themeToggle"
        className="themeToggle st-sunMoonThemeToggleBtn"
        type="checkbox"
      >
        <input
          onChange={() => setDarkMode(!darkMode)}
          type="checkbox"
          id="themeToggle"
          className="themeToggleInput"
        />
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="none"
        >
          <mask id="moon-mask">
            <rect x="0" y="0" width="20" height="20" fill="white" />
            <circle cx="11" cy="3" r="8" fill="black" />
          </mask>
          <circle
            className="sunMoon"
            cx="10"
            cy="10"
            r="8"
            mask="url(#moon-mask)"
          />
          <g>
            <circle className="sunRay sunRay1" cx="18" cy="10" r="1.5" />
            <circle className="sunRay sunRay2" cx="14" cy="16.928" r="1.5" />
            <circle className="sunRay sunRay3" cx="6" cy="16.928" r="1.5" />
            <circle className="sunRay sunRay4" cx="2" cy="10" r="1.5" />
            <circle className="sunRay sunRay5" cx="6" cy="3.1718" r="1.5" />
            <circle className="sunRay sunRay6" cx="14" cy="3.1718" r="1.5" />
          </g>
        </svg>
      </label> 
  );
}
