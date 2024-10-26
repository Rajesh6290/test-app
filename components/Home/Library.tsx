"use client";
import useSwr from "@/hooks/useSwr";
import { CHATDATA, PROJECTDATA } from "@/utils/types";
import { useUser } from "@clerk/nextjs";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import CreateProject from "./CreateProject";
import Librarychat from "./Librarychat";
import LibraryProject from "./LibraryProject";
const Library = () => {
  const [projectOpen, setProjectOpen] = useState<boolean>(false);
  const { isLoaded, user } = useUser();
  const { data, mutate, isValidating } = useSwr(
    isLoaded ? `conversation/user_sessions/${user?.id}` : ``
  );
  const {
    data: projectData,
    mutate: projectMutate,
    isValidating: projectValidating,
  } = useSwr(isLoaded ? `projects/get_projects/${user?.id}` : ``);
  const [type, setType] = useState("CHATS");
  return (
    <>
      <CreateProject
        open={projectOpen}
        setOpen={() => setProjectOpen(!projectOpen)}
        projectMutate={projectMutate}
        userId={user?.id as string}
      />
      <div className="size-full lg:flex hidden items-start gap-10 p-10">
        <div className="h-full w-[65%] ">
          <div className="w-full h-fit flex flex-col gap-2 items-start">
            <p className="text-black dark:text-white font-medium text-2xl">
              Chats
            </p>
            <span className="w-full border-b dark:border-[#272727] border-[#D7D7D7]"></span>
            {isValidating ? (
              <div className="flex w-full flex-col gap-3">
                <ChatLoader />
                <span className="w-full border-b border-[#272727]"></span>
                <ChatLoader />
                <span className="w-full border-b border-[#272727]"></span>
                <ChatLoader />
                <span className="w-full border-b border-[#272727]"></span>
                <ChatLoader />
                <span className="w-full border-b border-[#272727]"></span>
                <ChatLoader />
                <span className="w-full border-b border-[#272727]"></span>
                <ChatLoader />
              </div>
            ) : (
              data?.sessions?.map((item: CHATDATA, index: number) => (
                <>
                  <Librarychat
                    item={item}
                    key={item?.session_id}
                    mutate={mutate}
                    projectMutate={projectMutate}
                    userId={user?.id as string}
                    projectData={projectData?.projects}
                    index={index}
                  />
                  <span className="w-full border-b dark:border-[#272727] border-[#D7D7D7]"></span>
                </>
              ))
            )}
          </div>
        </div>
        <div className="h-full w-[35%]">
          <div className="w-full h-fit flex flex-col gap-2 items-start">
            <ul className="w-full flex items-center justify-between">
              <p className="text-black dark:text-white font-medium text-2xl">
                Project
              </p>
              <span
                onClick={() => setProjectOpen(true)}
                className="px-4 py-1 rounded hover:bg-gray-500 dark:hover:bg-[#272727] duration-300 cursor-pointer"
              >
                <Tooltip placement="top" title="New Project">
                  <NoteAddOutlinedIcon
                    style={{ fontSize: "1.5rem" }}
                    className="text-gray-700 dark:text-white"
                  />
                </Tooltip>
              </span>
            </ul>
            <span className="w-full border-b dark:border-[#272727] border-[#D7D7D7]"></span>
          </div>
          {projectValidating ? (
            <div className="flex pt-5 w-full flex-col gap-5">
              <ProjectLoader />
              <ProjectLoader />
              <ProjectLoader />
              <ProjectLoader />
            </div>
          ) : (
            projectData?.projects?.map((item: PROJECTDATA, index: number) => (
              <LibraryProject item={item} key={index + 1} index={index} />
            ))
          )}
        </div>
      </div>
      <div className="w-full lg:hidden flex h-fit flex-col gap-5 p-2">
        <div className="w-full flex items-center gap-5 p-3 rounded-[10px] dark:bg-darkSidebarBackground bg-[#D7D7D7]">
          <p
            onClick={() => setType("CHATS")}
            className={`${type === "CHATS" ? `dark:bg-darkMainBackground bg-[#F4F4F4]` : `dark:hover:bg-darkMainBackground hover:bg-[#F4F4F4]`} duration-200 font-medium w-full text-center p-2 rounded-[8px]  text-xl dark:text-white text-gray-700 tracking-wider cursor-pointer`}
          >
            Chats
          </p>
          <p
            onClick={() => setType("PROJECT")}
            className={` ${type === "PROJECT" ? `dark:bg-darkMainBackground bg-[#F4F4F4]` : `dark:hover:bg-darkMainBackground hover:bg-[#F4F4F4]`} duration-200 font-medium w-full text-center p-2 rounded-[8px]  text-xl dark:text-white text-gray-700 tracking-wider cursor-pointer`}
          >
            Projects
          </p>
        </div>
        {type === "CHATS" ? (
          <div className="w-full h-fit flex flex-col gap-2 items-start p-2">
            <p className="text-black dark:text-white font-medium text-2xl">
              Chats
            </p>
            <span className="w-full border-b dark:border-[#272727] border-[#D7D7D7] "></span>
            {isValidating ? (
              <div className="flex w-full flex-col gap-3">
                <ChatLoader />
                <span className="w-full border-b border-[#272727]"></span>
                <ChatLoader />
                <span className="w-full border-b border-[#272727]"></span>
                <ChatLoader />
                <span className="w-full border-b border-[#272727]"></span>
                <ChatLoader />
                <span className="w-full border-b border-[#272727]"></span>
                <ChatLoader />
                <span className="w-full border-b border-[#272727]"></span>
                <ChatLoader />
              </div>
            ) : (
              data?.sessions?.map((item: CHATDATA, index: number) => (
                <>
                  <Librarychat
                    item={item}
                    key={item?.session_id}
                    mutate={mutate}
                    projectMutate={projectMutate}
                    userId={user?.id as string}
                    projectData={projectData?.projects}
                    index={index}
                  />
                  <span className="w-full border-b dark:border-[#272727] border-[#D7D7D7] "></span>
                </>
              ))
            )}
          </div>
        ) : (
          <>
            <div className="w-full h-fit flex flex-col gap-2 items-start">
              <ul className="w-full flex items-center justify-between">
                <p className="text-black dark:text-white font-medium text-2xl">
                  Project
                </p>
                <span
                  onClick={() => setProjectOpen(true)}
                  className="px-4 py-1 rounded hover:bg-gray-500 dark:hover:bg-[#272727] duration-300 cursor-pointer"
                >
                  <Tooltip placement="top" title="New Project">
                    <NoteAddOutlinedIcon
                      style={{ fontSize: "1.5rem" }}
                      className="text-gray-700 dark:text-white"
                    />
                  </Tooltip>
                </span>
              </ul>
              <span className="w-full border-b dark:border-[#272727] border-[#D7D7D7] "></span>
            </div>
            {projectValidating ? (
              <div className="flex pt-5 w-full flex-col gap-5">
                <ProjectLoader />
                <ProjectLoader />
                <ProjectLoader />
                <ProjectLoader />
              </div>
            ) : (
              projectData?.projects?.map((item: PROJECTDATA, index: number) => (
                <LibraryProject item={item} key={index + 1} index={index} />
              ))
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Library;

const ChatLoader = () => {
  return (
    <div className="w-full rounded-[8px] p-4 dark:bg-[#333333] bg-[#F4F4F4] flex items-center justify-between">
      <p className="w-40 h-5 rounded dark:bg-[#1f1f1f] bg-[#D7D7D7] animate-pulse"></p>
      <div className="flex items-center gap-5">
        <p className="w-10 h-5 rounded dark:bg-[#1f1f1f] bg-[#D7D7D7] animate-pulse"></p>
      </div>
    </div>
  );
};
const ProjectLoader = () => {
  return (
    <div className="w-full rounded-[8px] p-7 dark:bg-[#27272A] bg-[#F4F4F4] flex flex-col gap-2">
      <p className="w-[70%] h-3 rounded dark:bg-[#525151] bg-[#D7D7D7] animate-pulse"></p>
      <p className="w-1/2 h-2 rounded dark:bg-[#525151] bg-[#D7D7D7] animate-pulse"></p>
    </div>
  );
};
