import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function RelatedVideoSkeleton({ number }) {
  return (
    Array(number)
    .fill(0)
    .map((_, index) => (
      <SkeletonTheme key={index} baseColor="#202020" highlightColor="#333">
        <div className="card-skeleton rounded-xl flex gap-2 w-[26rem]">
          <div className="up-row ">
            <Skeleton
              baseColor="#202020"
              borderRadius={15}
              count={1}
              height={"8rem"}
              width={"13rem"}
            />
          </div>

          <div className="down-row mt-1 flex flex-col w-full ">
            <Skeleton
              count={1}
              borderRadius={5}
              height={20}
            //   containerClassName="flex-1"
              width={"100%"}
            />
            <Skeleton
              count={3}
              borderRadius={5}
              containerClassName=" mt-2"
              height={16} 
              style={{marginTop:"0.3rem"}}
            />
          </div>
        </div>
      </SkeletonTheme>
    ))
  )
}

export default RelatedVideoSkeleton;
