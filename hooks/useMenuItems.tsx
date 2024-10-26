import React from "react";
import { AiOutlineFileUnknown } from "react-icons/ai";
import { LiaToolsSolid } from "react-icons/lia";
import {
  LuLayoutDashboard,
  LuAlignHorizontalDistributeStart,
} from "react-icons/lu";
import { MdOutlinePolicy, MdOutlineAssessment } from "react-icons/md";
import { PiAirTrafficControl } from "react-icons/pi";
import { SlBookOpen } from "react-icons/sl";
import { TiFlowSwitch } from "react-icons/ti";

const UseMenuItems = () => [
  {
    id: 1,
    name: "Chats+",
    icon: <LuLayoutDashboard className="text-xl" />,
    menus: false,
    route: "/",
  },
  {
    id: 2,
    name: "Library",
    icon: <SlBookOpen className="text-xl" />,
    menus: false,
    route: "/library",
  },
  {
    id: 3,
    name: "Tests",
    icon: <LuAlignHorizontalDistributeStart className="text-xl" />,
    menus: false,
    route: "/tests",
  },
  {
    id: 4,
    name: "Compliance",
    menus: true,
    item: [
      {
        id: 1,
        name: "Controls",
        icon: <PiAirTrafficControl className="text-2xl" />,
        route: "/controls",
      },
      {
        id: 2,
        name: "Policies",
        icon: <MdOutlinePolicy className="text-2xl" />,
        route: "/policies",
      },
      {
        id: 3,
        name: "Assessments",
        icon: <MdOutlineAssessment className="text-2xl" />,
        route: "/assessments",
      },
    ],
  },
  {
    id: 5,
    name: "Automation",
    menus: true,
    item: [
      {
        id: 1,
        name: "Workflows",
        icon: <TiFlowSwitch className="text-2xl" />,
        route: "/workflow",
      },
      {
        id: 2,
        name: "Tools",
        icon: <LiaToolsSolid className="text-2xl" />,
        route: "/tools",
      },
      {
        id: 3,
        name: "Knowledge",
        icon: <AiOutlineFileUnknown className="text-2xl" />,
        route: "/knowledge",
      },
    ],
  },
];

export default UseMenuItems;
