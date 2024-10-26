"use client";
import { useMyContext } from "@/app/context/MyContext";
import { getFromLocalStorage, removeFromLocalStorage } from "@/utils";
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { LuPlus } from "react-icons/lu";
import { PiArrowElbowDownLeftBold } from "react-icons/pi";
export const getinitialQuery = () => {
  return typeof window !== "undefined"
    ? typeof getFromLocalStorage("initialQuery") === "string"
      ? getFromLocalStorage("initialQuery")!
      : null
    : null;
};
const ChatBox = ({
  setQuery,
  query,
  handleSubmit,
}: {
  setQuery: Dispatch<SetStateAction<string>>;
  query: string;
  handleSubmit: () => void;
}) => {
  const { fullWidth } = useMyContext();
  const initialQuery = getinitialQuery();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = () => {
    if (textareaRef.current) {
      // Reset height to recalculate properly
      textareaRef.current.style.height = "auto";

      // Get line height and set a fallback value if parsing fails
      const lineHeight = parseFloat(
        getComputedStyle(textareaRef.current).lineHeight || "20"
      );

      // Check for NaN and set a fallback
      const maxLineHeight = isNaN(lineHeight) ? 20 : lineHeight;

      // Set the height with a maximum of 5 rows' worth of height
      textareaRef.current.style.height = `${Math.min(
        textareaRef.current.scrollHeight,
        5 * maxLineHeight
      )}px`;
    }
  };

  useEffect(() => {
    autoResize(); // Initial resize on mount
  }, [query]);
  useEffect(() => {
    const handleEnter = (event: KeyboardEvent) => {
      if (event.key === "Enter" && query?.length > 0) {
        handleSubmit();
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", handleEnter);
    return () => {
      document.removeEventListener("keydown", handleEnter);
    };
  }, [query, handleSubmit]);
  useEffect(() => {
    if (initialQuery) {
      setQuery(initialQuery);
      handleSubmit();
    }
  }, [initialQuery, handleSubmit, setQuery]);
  return (
    <>
      <div
        className={`${fullWidth ? `` : `pl-80`} backdrop-blur-md duration-300 fixed left-0 bottom-0 z-0 w-full h-fit lg:flex hidden items-center justify-center`}
      >
        <div className=" w-1/2 h-fit border dark:border-[#272729] border-[#D7D7D7] px-3 pt-3 rounded-t-xl flex justify-center items-start">
          <div className=" w-full relative h-fit p-3 border rounded-[10px] flex items-center justify-between dark:border-[#272729] border-[#D7D7D7]">
            <div className="w-full flex items-center gap-1">
              <span className="size-8 cursor-pointer flex items-center justify-center bg-[#D7D7D7] dark:bg-darkSidebarBackground dark:border-[#272729] border-[#D7D7D7] border rounded-full">
                <LuPlus className="dark:text-white text-gray-700" />
              </span>
              <textarea
                ref={textareaRef}
                className=" bg-transparent outline-none w-full p-2 placeholder:text-sm placeholder:tracking-wider dark:text-white  text-gray-700 font-medium placeholder:font-medium placeholder:text-gray-400"
                name=""
                id=""
                placeholder="Start the thread"
                autoFocus
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  autoResize();
                }}
                style={{
                  maxHeight: `calc(5 * ${parseFloat(getComputedStyle(textareaRef.current || document.body).lineHeight || "20px")}px)`,
                }}
                rows={1}
              />
            </div>
            <button
              type="submit"
              onClick={() => {
                if (query?.length > 0) {
                  return handleSubmit();
                }
              }}
              className={`size-10 absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center border  cursor-pointer  rounded-[5px]
                ${
                  query?.length > 0
                    ? `dark:bg-white bg-gray-400 dark:text-gray-800 text-white`
                    : `dark:border-[#272729] border-[#D7D7D7] dark:text-white text-gray-600`
                }
                `}
            >
              <PiArrowElbowDownLeftBold className="text-lg" />
            </button>
          </div>
          <div className="h-24"></div>
        </div>
      </div>
      <div className=" fixed left-0 bottom-0 dark:bg-darkMainBackground bg-[#F4F4F4] w-full h-fit p-3 border-t flex lg:hidden items-center justify-between border-[#D7D7D7] dark:border-[#272729]">
        <div className=" flex w-full items-center gap-2">
          <span className="size-8 cursor-pointer flex items-center justify-center  dark:border-[#272729] border-[#D7D7D7] border rounded-full">
            <LuPlus className="dark:text-white text-gray-500" />
          </span>
          <input
            type="text"
            className=" bg-transparent outline-none w-full p-2 placeholder:text-sm placeholder:tracking-wider dark:text-white text-gray-800 font-medium placeholder:font-medium placeholder:text-gray-400"
            name=""
            id=""
            placeholder="Start the thread"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <button
          type="submit"
          onClick={() => {
            if (query?.length > 0) {
              return handleSubmit();
            }
          }}
          className={`size-10 flex items-center justify-center border dark:border-[#272729] border-[#D7D7D7] cursor-pointer  rounded-[10px]
          ${
            query?.length > 0
              ? `dark:bg-white bg-gray-400 dark:text-gray-800 text-white`
              : `dark:border-[#272729] border-[#D7D7D7] dark:text-white text-gray-700`
          }
          `}
        >
          <PiArrowElbowDownLeftBold className=" text-lg" />
        </button>
      </div>
    </>
  );
};

export default ChatBox;
