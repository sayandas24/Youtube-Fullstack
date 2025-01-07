import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function UserChannelSkeleton({ number }) {
  return (
    <div className="flex gap-5">
      {Array(4)
        .fill(0)
        .map((_, index) => (
          <SkeletonTheme key={index} baseColor="#202020" highlightColor="#333">
            <div className="card-skeleton rounded-xl min-w-[16rem] mb-2 w-[20rem]">
              <div className="up-row ">
                <Skeleton
                  baseColor="#202020"
                  borderRadius={15}
                  count={1}
                  height={"12rem"}
                />
              </div>

              <div className="down-row flex mt-1 items-center gap-2">
                <Skeleton
                  count={2}
                  borderRadius={5}
                  containerClassName="flex-[1] "
                />
              </div>
            </div>
          </SkeletonTheme>
        ))}
    </div>
  );
}

export default UserChannelSkeleton;
