import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function VideoDetailSkeleton({ number = 3 }) {
  return Array(number)
    .fill(0)
    .map((_, index) => (
      <SkeletonTheme key={index} baseColor="#202020" highlightColor="#333">
        <div className="card-skeleton rounded-xl w-full mb-2 px-[2rem] pt-[1.5rem]">
          <Skeleton 
            borderRadius={5}
            count={2}
            height={"2rem"}
          />
        </div>
      </SkeletonTheme>
    ));
}

export default VideoDetailSkeleton;
