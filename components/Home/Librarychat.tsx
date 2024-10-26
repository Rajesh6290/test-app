import AddToPhotosOutlinedIcon from "@mui/icons-material/AddToPhotosOutlined";
import Tooltip from "@mui/material/Tooltip";
import { MdDeleteOutline } from "react-icons/md";
import AddToProject from "./AddToProject";
import { useState } from "react";
import { useMutation } from "@/hooks";
import { toast } from "sonner";
import { CHATDATA, PROJECTDATA } from "@/utils/types";
import { useRouter } from "nextjs-toploader/app";
import { motion } from "framer-motion";
const Librarychat = ({
  item,
  mutate,
  projectMutate,
  userId,
  projectData,
  index,
}: {
  item: CHATDATA;
  mutate: () => void;
  projectMutate: () => void;
  userId: string;
  projectData: PROJECTDATA[];
  index: number;
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <>
      <AddToProject
        open={open}
        setOpen={() => setOpen(!open)}
        mutate={mutate}
        projectMutate={projectMutate}
        userId={userId}
        projectData={projectData}
        sessionId={item?.session_id}
      />
      <motion.div
        key={index}
        layout
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: index * 0.2 }}
        viewport={{ once: true }}
        className=" w-full flex items-center justify-between"
      >
        <p
          onClick={() => router?.push(`/c/${item?.session_id}`)}
          className="text-gray-900 capitalize cursor-pointer dark:text-white font-light tracking-wider"
        >
          {item?.first_user_query}
        </p>
        <ul className="flex items-center gap-1">
          {item?.projects?.length > 0 && (
            <p className="text-sm text-gray-800 dark:bg-gray-800 bg-[#D7D7D7] dark:text-white font-medium tracking-wider px-6 py-2.5 rounded-[10px]">
              Project Test 1
            </p>
          )}
          {item?.projects?.length === 0 && (
            <span
              onClick={() => setOpen(true)}
              className="p-2 rounded-xl hover:bg-gray-500 dark:hover:bg-gray-900 duration-300 cursor-pointer"
            >
              <Tooltip placement="top" title="Add to project">
                <AddToPhotosOutlinedIcon
                  style={{ fontSize: "1.4rem" }}
                  className="text-gray-700 dark:text-white"
                />
              </Tooltip>
            </span>
          )}

          <span className="p-2 rounded-xl hover:bg-red-500/10 duration-300 cursor-pointer">
            <DeleteChat
              sessionId={item?.session_id}
              mutate={mutate}
              projectMutate={projectMutate}
            />
          </span>
        </ul>
      </motion.div>
    </>
  );
};

export default Librarychat;
const DeleteChat = ({
  sessionId,
  mutate,
  projectMutate,
}: {
  sessionId: string;
  mutate: () => void;
  projectMutate: () => void;
}) => {
  const { isLoading, mutation } = useMutation();
  const deleteSeesionChat = async () => {
    try {
      const res = await mutation(
        `conversation/delete_chat?session_id=${sessionId}`,
        {
          method: "DELETE",
        }
      );
      if (res?.status === 200) {
        toast.success("Chat Deleted Successfully");
        mutate();
        projectMutate();
      } else {
        toast.error("Failed to delete chat");
      }
    } catch (error) {
      toast.error(error instanceof Error);
    }
  };
  return isLoading ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="28"
      fill="currentColor"
      className="bi bi-arrow-repeat text-red-500 animate-spin"
      viewBox="0 0 16 16"
    >
      <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
      <path
        fillRule="evenodd"
        d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
      />
    </svg>
  ) : (
    <Tooltip placement="top" title="Delete Chat">
      <MdDeleteOutline
        style={{ fontSize: "1.5rem" }}
        className="text-red-500 "
        onClick={deleteSeesionChat}
      />
    </Tooltip>
  );
};
