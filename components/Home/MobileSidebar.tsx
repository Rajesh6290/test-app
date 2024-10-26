import { Drawer } from "@mui/material";
import React from "react";
import SideBar from "./SideBar";

const MobileSidebar = ({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) => {
  return (
    <Drawer
      open={isSidebarOpen}
      onClose={toggleSidebar}
      aria-label="Mobile sidebar"
    >
      <SideBar />
    </Drawer>
  );
};

export default MobileSidebar;
