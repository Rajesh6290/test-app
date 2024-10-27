"use client";
import Link from "next/link";
import Image from "next/image";
import { UserButton, useUser } from "@clerk/nextjs";
import { BsReverseLayoutSidebarReverse } from "react-icons/bs";
import { TbSlash } from "react-icons/tb";
import { useMyContext } from "@/app/context/MyContext";
export function UserOrLogin() {
  const { user } = useUser();
  const { fullWidth, sliderOpen, setFullWidth, setSliderOpen } = useMyContext();
  const handleIconClick = () => {
    if (window.innerWidth >= 1024) {
      setFullWidth(!fullWidth);
    } else {
      setSliderOpen(!sliderOpen);
    }
  };
  return (
    <>
      {user ? (
        <>
          <BsReverseLayoutSidebarReverse
            onClick={handleIconClick}
            className="text-2xl cursor-pointer text-gray-500 dark:text-gray-400"
          />
          <TbSlash className="text-2xl  -rotate-12  text-gray-500 dark:text-gray-400" />
          <div className="flex items-center gap-2">
            <UserButton />
            <span className="text-gray-700 dark:text-gray-300">Hi, {user.firstName}</span>
          </div>
        </>
      ) : (
        <Link href="/new" rel="nofollow">
          <Image
            src="/images/logo.webp"
            width="50"
            height="40"
            alt="cognitive view"
          />
        </Link>
      )}
      <div className="flex items-center">
        {!user && <Link href="/sign-in">Login</Link>}
      </div>
    </>
  );
}
