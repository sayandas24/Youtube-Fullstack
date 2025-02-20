import React, { useContext } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { UseDarkModeContext } from "../../../contexts/darkModeContext/UseDarkMode";

function UserChannelSkeleton({ number }) {
  const { darkMode } = useContext(UseDarkModeContext);
  const baseColor = darkMode ? "#c7cbd1" : "#202020";
  const highlightColor = darkMode ? "#d3d6db" : "#2b2b2b75";

  return (
    <SkeletonTheme baseColor={baseColor} highlightColor={highlightColor}>
      {Array(number)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="card-skeleton flex flex-col gap-3 rounded-xl mb-2 w-[100%] p-2 max-[485px]:flex-row max-[485px]:py-0 max-[485px]:gap-2"
          >
            <div className="up-row h-[16rem] max-[700px]:h-[12rem] max-[485px]:w-[30rem] max-[485px]:h-[8rem]">
              <Skeleton 
                borderRadius={15}
                count={1}
                height={"100%"}
                containerClassName="w-[100%]"
              />
            </div>

            <div className="down-row flex flex-col gap-0 w-full ml-2 max-[485px]:ml-0 max-[485px]:mt-2">
              <Skeleton
                count={1}
                borderRadius={15}
                containerClassName="  w-[80%] max-[485px]:w-[90%]"
              />
              <Skeleton
                count={1}
                borderRadius={15}
                containerClassName="  w-[50%]"
              />
              <Skeleton
                count={1}
                borderRadius={5}
                containerClassName="w-[40%] min-[485px]:hidden"
              />
            </div>
          </div>
        ))}
    </SkeletonTheme>
  );
}

export default UserChannelSkeleton;
