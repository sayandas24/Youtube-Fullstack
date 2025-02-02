import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function VideoHomeSkeleton({number}) {
  return ( 
    Array(number).fill(0).map((_, index) => (

        <SkeletonTheme key={index} baseColor="#202020" highlightColor="#2b2b2b75">
        <div className="card-skeleton rounded-xl min-w-[16rem] mb-2">

          <div className="up-row ">
            <Skeleton containerClassName="max-[500px]:hidden" baseColor="#202020" borderRadius={15} count={1} height={"18rem"} />
            <Skeleton containerClassName="max-[500px]:block min-[500px]:hidden" baseColor="#202020" count={1} height={"13rem"} />
          </div>

          <div className=" down-row flex mt-1 items-center ml-2">
            <Skeleton circle height={50} width={50} containerClassName="flex-[0]"/>
            <div className="flex flex-col flex-[1] ml-2"> 
              <Skeleton count={1} borderRadius={15}  containerClassName="w-[90%]"/>
              <Skeleton count={1} borderRadius={15} containerClassName="w-[75%]"/>
            </div>
          </div>
        </div>
      </SkeletonTheme>
    ))
  );
}

export default VideoHomeSkeleton;
