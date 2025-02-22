"use client";

import { cn } from "@/lib/utils";

interface Avatar {
  imageUrl: string;
  avatar: string;
}
interface AvatarCirclesProps {
  className?: string;
  numPeople?: number;
  avatarUrls: Avatar[];
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      <img
        className="h-10 w-10 rounded-full border-2   border-black dark:border-gray-800"
        src={avatarUrls[0]?.avatar}
        width={40}
        height={40}
      />
      <img
        className="h-10 w-10 rounded-full border-2   border-black dark:border-gray-800"
        src={avatarUrls[3]?.avatar}
        width={40}
        height={40}
      />
      <img
        className="h-10 w-10 rounded-full border-2   border-black dark:border-gray-800"
        src={avatarUrls[4]?.avatar}
        width={40}
        height={40}
      />

      {(numPeople ?? 0) > 0 && (
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-black bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black cursor-pointer" 
        >
          +{numPeople}
        </div>
      )}
    </div>
  );
};
