import { PROJECTDATA } from "@/utils/types";
import { motion } from "framer-motion";
import { useRouter } from "nextjs-toploader/app";

const LibraryProject = ({
  item,
  index,
}: {
  item: PROJECTDATA;
  index: number;
}) => {
  const router = useRouter();
  return (
    <motion.ul
      key={index}
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true }}
      onClick={() => router?.push(`/project/${item?.project_id}`)}
      className="w-full flex cursor-pointer flex-col gap-3 lg:pt-4 pt-0"
    >
      <div className="w-full h-fit p-7 rounded-[7px] dark:bg-[#27272A] bg-[#D7D7D7] flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <p className=" text-sm font-medium text-gray-900 dark:text-white">
            {item?.project_name}
          </p>
          {item?.session_ids?.length > 0 && (
            <p className=" size-5 flex items-center justify-center text-sm rounded-full bg-green-50 text-green-500 font-medium">
              {item?.session_ids?.length}
            </p>
          )}
        </div>
        <p className=" text-sm font-medium text-gray-500">
          {new Date().toLocaleString()}
        </p>
      </div>
    </motion.ul>
  );
};

export default LibraryProject;
