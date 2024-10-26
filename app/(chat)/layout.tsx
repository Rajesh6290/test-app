// app/chat/layout.tsx
"use client";

import MobileSidebar from "@/components/Home/MobileSidebar";
import SideBar from "@/components/Home/SideBar";
import { useTheme } from "next-themes";
import { ReactNode, useEffect } from "react";
import { useMyContext } from "../context/MyContext"; // Import your context if needed
import { useUser } from "@clerk/nextjs";
import { useRouter } from "nextjs-toploader/app";

interface ChatLayoutProps {
  children: ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  const { fullWidth, sliderOpen, setSliderOpen } = useMyContext();
  const { theme, setTheme } = useTheme();
  const { user, isLoaded } = useUser()
  const router = useRouter()
  useEffect(() => {
    setTheme("system");
  }, [theme, setTheme]);
  useEffect(() => {
    if (isLoaded) {
      if (!user?.id) {
        router?.push(`/sign-in`)
      }
    }
  }, [user, isLoaded])
  return (
    <div className="flex size-full">
      <div
        className={`${fullWidth ? `w-0` : `lg:w-[15%] w-0`} h-full transition-all ease-out duration-300`}
      >
        <SideBar />
      </div>
      <div
        className={`${fullWidth ? `w-full` : `lg:w-[85%] w-full`} bg-lightMainBackground dark:bg-darkMainBackground h-full transition-all ease-out duration-300`}
      >
        <MobileSidebar
          isSidebarOpen={sliderOpen}
          toggleSidebar={() => setSliderOpen(!sliderOpen)}
        />
        {children}
      </div>
    </div>
  );
}
