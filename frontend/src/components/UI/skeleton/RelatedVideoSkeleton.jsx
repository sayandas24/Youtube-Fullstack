import React, { useContext } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { UseDarkModeContext } from "../../../contexts/darkModeContext/UseDarkMode";

function RelatedVideoSkeleton({ number }) {

  const {darkMode} = useContext(UseDarkModeContext);
  const baseColor = darkMode ? "#c7cbd1" : "#202020";
  const highlightColor = darkMode ? "#d3d6db" : "#2b2b2b75"; 

  return (
    Array(number)
    .fill(0)
    .map((_, index) => (
      <SkeletonTheme key={index} baseColor={baseColor} highlightColor={highlightColor}>
        <div className="card-skeleton rounded-xl flex gap-2 w-[26rem]">
          <div className="up-row ">
            <Skeleton 
              borderRadius={15}
              count={1}
              height={"8rem"}
              width={"13rem"}
            />
          </div>

          <div className="down-row mt-1 flex flex-col w-full ">
            <Skeleton
              count={1}
              borderRadius={15}
              height={20}
            //   containerClassName="flex-1"
              width={"100%"}
            />
            <Skeleton
              count={1}
              borderRadius={10}
              containerClassName=" mt-2"
              height={16} 
              width={"100%"}
              style={{marginTop:"0.3rem"}}
            />
            <Skeleton
              count={1}
              borderRadius={10}
              containerClassName=" mt-2"
              height={16} 
              width={"50%"}
              style={{marginTop:"0.3rem"}}
            />
          </div>
        </div>
      </SkeletonTheme>
    ))
  )
}

export default RelatedVideoSkeleton;
