import { ArrowRightIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { useNavigate } from "react-router";

export function AnimatedButton({ text }) {
    const navigate = useNavigate();
  return (
    <div className="z-10 flex items-center justify-center text-nowrap">
      <div
        className={cn(
          "group rounded-full border dark:border-[#9fa9b6]  text-base text-white transition-all ease-in hover:cursor-pointer border-white/20 bg-neutral-800 hover:bg-neutral-700 dark:bg-[#d0dbf1] dark:hover:bg-[#c0c8d3] ",
        )}
      >
        <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-2 transition ease-out  hover:duration-300 hover:text-neutral-200 dark:!text-black/50">
          <span>{text} </span>
          <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
        </AnimatedShinyText>
      </div>
    </div>
  );
}
