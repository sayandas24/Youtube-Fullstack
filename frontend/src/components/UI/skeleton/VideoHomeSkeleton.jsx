import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function VideoHomeSkeleton({number}) {
  return ( 
    Array(number).fill(0).map((_, index) => (

        <SkeletonTheme key={index} baseColor="#202020" highlightColor="#333">
        <div className="card-skeleton rounded-xl min-w-[16rem] mb-2">

          <div className="up-row ">
            <Skeleton baseColor="#202020" borderRadius={15} count={1} height={"18rem"} />
          </div>

          <div className="down-row flex mt-1 items-center">
            <Skeleton circle height={50} width={50} containerClassName="flex-[.2]"/>
            <Skeleton count={2} borderRadius={15} containerClassName="flex-1 "/>
          </div>
        </div>
      </SkeletonTheme>
    ))
  );
}

export default VideoHomeSkeleton;
