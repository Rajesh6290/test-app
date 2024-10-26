import * as React from "react";
import { UserOrLogin } from "../Home/UserOrLogin";
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b border-[#ebe8e8] dark:border-[#272727] shrink-0 bg-gradient-to-b from-background/10 via-background/10 to-background/10 backdrop-blur-xl">
      <div className="flex items-center gap-1 ">
        <UserOrLogin />
      </div>
      <div className="flex items-center justify-end space-x-2"></div>
    </header>
  );
}
