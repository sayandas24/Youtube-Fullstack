import React, { useContext } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { UseDarkModeContext } from "../../../contexts/darkModeContext/UseDarkMode";

function VideoDetailSkeleton({ number = 3 }) {

  const {darkMode} = useContext(UseDarkModeContext);
    const baseColor = darkMode ? "#c7cbd1" : "#202020";
    const highlightColor = darkMode ? "#d3d6db" : "#2b2b2b75";


  return Array(number)
    .fill(0)
    .map((_, index) => (
      <SkeletonTheme key={index} baseColor={baseColor} highlightColor={highlightColor}>
        <div className="card-skeleton rounded-xl w-full mb-2 px-[2rem] pt-[1.5rem]">
        <Skeleton 
            borderRadius={10}
            count={1}
            height={"1.8rem"}
          />
          <Skeleton 
            borderRadius={10}
            count={1}
            height={"1.8rem"}
          />

        </div>
      </SkeletonTheme>
    ));
}

export default VideoDetailSkeleton;
