"use client";
import { useMutation } from "@/hooks";
import { saveToLocalStorage } from "@/utils";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { useRouter } from "nextjs-toploader/app";
import React, { useEffect, useRef, useState } from "react";
import { BiSolidImageAdd } from "react-icons/bi";
import { IoMdArrowRoundUp } from "react-icons/io";
import { IoDocumentTextOutline } from "react-icons/io5";
import { MdLink } from "react-icons/md";
import { RiGraduationCapFill } from "react-icons/ri";
import { toast } from "sonner";

interface RecommendProps {
  id: number;
  name: string;
  icon?: React.ReactNode;
}

const RECOMMEND: RecommendProps[] = [
  {
    id: 1,
    name: "Create image",
    icon: <BiSolidImageAdd className="text-base lg:text-xl text-green-500" />,
  },
  {
    id: 2,
    name: "Summarize text",
    icon: (
      <IoDocumentTextOutline className="text-base lg:text-xl text-orange-500" />
    ),
  },
  {
    id: 3,
    name: "Get advice",
    icon: (
      <RiGraduationCapFill className="text-base lg:text-xl text-cyan-500" />
    ),
  },
  {
    id: 4,
    name: "More",
  },
];

const Homechat = () => {
  const [searchString, setSearchString] = useState<string>("");
  const { isLoading, mutation } = useMutation();
  const { userId } = useAuth();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const handleGenerateSession = async () => {
    try {
      const res = await mutation(`conversation/chat_id`, {
        method: "POST",
        body: {
          user_id: userId,
        },
      });
      if (res?.status === 200) {
        saveToLocalStorage("initialQuery", searchString);
        router?.push(`/chat/${res?.results?.session_id}`);
      } else {
        toast.error("Failed to generate session");
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "An error occurred");
    }
  };

  useEffect(() => {
    const handleEnter = (event: KeyboardEvent) => {
      if (event.key === "Enter" && searchString?.length > 0) {
        handleGenerateSession();
        event.preventDefault();
      }
    };
    // Focus the input field when the component mounts
    if (inputRef.current) {
      inputRef.current.focus();
    }
    document.addEventListener("keydown", handleEnter);
    return () => {
      document.removeEventListener("keydown", handleEnter);
    };
  }, [searchString, handleGenerateSession]);

  return (
    <div className="size-full lg:px-0 px-5 flex flex-col items-center justify-center">
      <div className="flex flex-col gap-10 items-center w-full">
        <Image
          src="/images/logo.webp"
          alt="Product_logo"
          width={100}
          height={100}
          className=" rounded"
        />
        <h1 className="lg:text-3xl text-xl font-medium dark:text-white text-gray-700 tracking-wider">
          {/* <TypingText text="What can I help with?" typingSpeed={10} /> */}
          How can I help you today?
        </h1>
        <div className="lg:w-1/2 w-full  relative flex items-center gap-1 rounded-full p-3 dark:bg-[#2F2F2F] bg-[#F4F4F4] ">
          <span className="size-10 cursor-pointer  flex items-center justify-center">
            <MdLink className="text-3xl dark:text-white text-gray-600 -rotate-90" />
          </span>
          <input
            type="text"
            className="w-full font-medium outline-none tracking-widest bg-transparent dark:placeholder:opacity-45 dark:placeholder:text-white placeholder:tracking-widest dark:text-white text-gray-700 p-1"
            placeholder="Message Cognitiveview.ai"
            ref={inputRef}
            value={searchString}
            onChange={(e) => {
              setSearchString(e?.target?.value);
            }}
          />
          <span
            className={`size-10 absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer rounded-full flex items-center justify-center ${searchString?.length > 0
                ? `dark:bg-white bg-gray-700 dark:text-gray-800 text-white`
                : `dark:bg-[#676767] bg-[#D7D7D7] text-white`
              }`}
            onClick={() => {
              if (searchString?.length > 0) {
                handleGenerateSession();
              }
            }}
          >
            {isLoading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                className=" animate-spin"
                viewBox="0 0 16 16"
              >
                <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
                <path
                  fillRule="evenodd"
                  d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
                />
              </svg>
            ) : (
              <IoMdArrowRoundUp className="text-xl" />
            )}
          </span>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {RECOMMEND.map(({ id, name, icon }) => (
            <div
              key={id}
              className="flex items-center gap-2 rounded-full cursor-pointer p-3 border dark:border-[#272729] border-[#D7D7D7] dark:hover:bg-gray-700 hover:bg-[#D7D7D7] transition"
              aria-label={name}
            >
              {icon}
              <p className="lg:text-sm text-[0.4rem] text-nowrap dark:font-light dark:text-white dark:opacity-60  opacity-80 tracking-widest">
                {name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homechat;
