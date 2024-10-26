"use client";
import useSwr from "@/hooks/useSwr";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import React from "react";

const Projects = () => {
  const params = useParams();
  const router = useRouter();
  const { data, isValidating } = useSwr(
    `projects/get_project_name/${params?.id}`
  );
  return (
    <div className="w-full h-fit flex flex-col gap-7 p-6">
      <p className=" font-medium text-2xl tracking-wider text-gray-800 dark:text-white">
        Project - {data?.project_name}
      </p>
      <p className=" font-medium text-lg tracking-wider text-black dark:text-white">
        Chats
      </p>
      <div className="w-full flex flex-col gap-3">
        {data?.chats?.map((item: any, index: number) => (
          <>
            <p
              onClick={() => router?.push(`/c/${item?.session_id}`)}
              className="font-medium cursor-pointer text-gray-800 dark:text-white "
            >
              {item?.messages?.[0]?.user_query}
            </p>
            <span className="w-full border-b dark:border-[#272727] border-[#D7D7D7]"></span>
          </>
        ))}
      </div>
    </div>
  );
};

export default Projects;
