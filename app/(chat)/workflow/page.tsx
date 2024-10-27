"use client";
import { useMyContext } from "@/app/context/MyContext";
import Empty from "@/components/core/Empty";
import useSwr from "@/hooks/useSwr";
import { Tooltip } from "@mui/material";
import { useRouter } from "nextjs-toploader/app";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { BsReverseLayoutSidebarReverse } from "react-icons/bs";
import { PiLightbulbFilament } from "react-icons/pi";

const tabs = [
  "Prospecting",
  "Deal Management",
  "Expansion & Retention",
  "Enablement & Training",
  "Operations",
  "Marketing",
  "Others",
];

const Skelton = () => {
  return (
    <div className="w-full flex flex-col gap-4 dark:bg-[#1f1f1f] bg-[#F4F4F4] rounded-[10px] p-4">
      <p className="w-full p-2.5 rounded-[4px] dark:bg-[#333333] bg-[#D7D7D7] animate-pulse"></p>
      <p className="w-full p-2.5 rounded-[4px] dark:bg-[#333333] bg-[#D7D7D7] animate-pulse"></p>
      <div className="flex items-center gap-3">
        <p className="w-[85%] p-2.5 rounded-[4px] dark:bg-[#333333] bg-[#D7D7D7] animate-pulse"></p>
        <p className="w-[15%] p-2.5 rounded-[4px] dark:bg-[#333333] bg-[#D7D7D7] animate-pulse"></p>
      </div>
    </div>
  )
}

const SearchInput = ({ searchText, setSearchText }: { searchText: string; setSearchText: Dispatch<SetStateAction<string>> }) => (
  <div className="relative w-full">
    <div className="absolute inset-y-0 start-0 flex items-center px-3 pointer-events-none">
      <svg
        className="w-4 h-4 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
    </div>
    <input
      type="search"
      className="block lg:w-[20rem] w-full p-3 ps-10 text-sm text-gray-900 border rounded-xl dark:bg-darkSidebarBackground dark:focus:border-[#282727] border-[#ebe8e8] dark:border-[#272727] dark:placeholder-gray-400 dark:text-gray-300 placeholder:tracking-wider tracking-wider"
      placeholder="Search Workflows"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
    />
  </div>
);

const WorkflowList = ({ workflows, router }: any) => (
  <div className="w-full grid 2xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 items-center gap-6">
    {workflows.map((item: any, index: number) => (
      <div key={index} className="w-full h-full border rounded-xl border-[#D7D7D7] dark:border-[#464545] flex flex-col justify-between gap-3 p-3">
        <div className="flex items-center gap-2">
          <span className="flex items-center cursor-pointer w-fit py-1 px-2 gap-0.5 rounded-full border border-[#D7D7D7] dark:border-[#464545]">
            <PiLightbulbFilament className="text-sm text-[#693EE0]" />
            <p className="text-xs uppercase font-semibold text-[#693EE0]">New</p>
          </span>
          <Tooltip title={item?.tags.length > 1 ? item?.tags.slice(1).join(", ") : ""} arrow placement="bottom">
            <p className="text-xs py-1 px-2 uppercase border tracking-wider font-semibold rounded-full text-gray-600 dark:text-gray-400 border-[#D7D7D7] dark:border-[#464545] cursor-pointer">
              {item?.tags.length > 1 ? `${item?.tags[0]} + ${item?.tags.length - 1}` : item?.tags[0]}
            </p>
          </Tooltip>
        </div>
        <p className="text-lg font-semibold text-gray-600 dark:text-gray-200">{item?.workflowName}</p>
        <p className="text-xs font-medium text-gray-500 dark:text-gray-300 line-clamp-4">{item?.workflowDescription}</p>
        <div className="w-full flex items-center justify-end">
          <p onClick={() => router?.push(`/workflow/${item?.workflowId}`)} className="text-sm cursor-pointer font-medium text-white rounded-[8px] bg-[#693EE0] px-2.5 py-0.5">Try this</p>
        </div>
      </div>
    ))}
  </div>
);

const Page = () => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState("Prospecting");
  const [searchText, setSearchText] = useState("");
  const [debouncedSearchText, setDebouncedSearchText] = useState("");
  const { sliderOpen, setSliderOpen, fullWidth, setFullWidth } = useMyContext()
  const { data, isValidating } = useSwr(`workflow/categories/${selectedTab}`, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchText(searchText), 300);
    if (searchText.length === 0) setSelectedTab("Prospecting");
    return () => clearTimeout(handler);
  }, [searchText]);

  const tabLabel = useMemo(() => {
    return selectedTab === "Search" ? `Search Result for "${searchText}"` : ``;
  }, [selectedTab, searchText]);

  return (
    <div className="size-full overflow-y-auto flex flex-col gap-5">
      <div className="flex items-center gap-5 border-b border-[#ebe8e8] dark:border-[#272727] py-2 px-6">
        <BsReverseLayoutSidebarReverse
          onClick={() => setSliderOpen(true)}
          className="text-2xl cursor-pointer lg:hidden block text-gray-500 dark:text-gray-400"
        />
        {
          fullWidth &&
          <BsReverseLayoutSidebarReverse
            onClick={() => setFullWidth(false)}
            className="text-2xl cursor-pointer text-gray-500 dark:text-gray-400"
          />
        }
        <h1 className=" text-xl font-medium">Workflow</h1>
      </div>
      <div className="size-full flex items-start justify-center">
        <div className="lg:w-[80%] w-full lg:px-0 px-3 flex flex-col gap-5 items-start pb-5">
          <SearchInput searchText={searchText} setSearchText={(text) => {
            setSelectedTab("Search");
            setSearchText(text);
          }} />
          <div className="w-full flex items-center gap-7 hideScrollbar overflow-y-auto border-b border-[#ebe8e8] dark:border-[#272727]">
            {tabLabel?.length > 0 &&
              <p className="relative inline-flex items-center whitespace-nowrap pb-4 cursor-pointer px-2 align-baseline text-sm font-medium">
                {selectedTab === "Search" && <span className="absolute duration-300 left-0 bottom-0 h-1.5 w-full rounded-t-[6px] bg-purple-400/60"></span>}
                {tabLabel}
              </p>}
            {tabs.map((item, index) => (
              <p key={index} onClick={() => setSelectedTab(item)} className="relative inline-flex items-center whitespace-nowrap pb-4 cursor-pointer px-2 align-baseline text-sm font-medium">
                {selectedTab === item && <span className="absolute duration-300 left-0 bottom-0 h-1.5 w-full rounded-t-[6px] bg-purple-400/60"></span>}
                {item}
              </p>
            ))}
          </div>
          {isValidating ? (
            <div className="w-full grid 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1 items-center gap-6">
              {[...Array(4)].map((_, index) => (
                <Skelton key={index} />
              ))}
            </div>
          ) : data?.length > 0 ? (
            <WorkflowList workflows={data} router={router} />
          ) : (
            <div className="w-full h-[20rem] flex items-center justify-center">
              <Empty
                title="No workflows found!"
                subTitle="It looks like there are no workflows at the moment."
                pathName="Go to Home"
                link="/admin"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
