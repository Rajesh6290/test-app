import Image from "next/image";
import { AiOutlineUser } from "react-icons/ai";
import MarkdownRenderer, { Markdown } from "./MarkdownRenderer";

const PreviousConversation = ({
  query,
  response,
  isLoading,
}: {
  query: string;
  response?: string;
  isLoading: boolean;
}) => {
  return (
    <div className="w-full flex flex-col gap-3 px-2">
      <ul className="flex items-start gap-2 w-full ">
        <AiOutlineUser className="text-3xl dark:text-white text-gray-600" />
        <p className="dark:text-white text-gray-700  tracking-wider">{query}</p>
      </ul>
      <span className="w-full border-b dark:border-[#272729] border-[#D7D7D7]"></span>
      <div className="w-full flex items-start gap-2">
        <span className="size-10">
          {isLoading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              className="bi bi-arrow-repeat dark:text-white text-gray-600 animate-spin"
              viewBox="0 0 16 16"
            >
              <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
              <path
                fillRule="evenodd"
                d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
              />
            </svg>
          ) : (
            <Image
              src="/images/response.png"
              alt="loader"
              width={25}
              height={25}
            />
          )}
        </span>
        {isLoading ? (
          <p className="font-medium dark:text-white text-gray-700">
            Loading.....
          </p>
        ) : (
          <div className="dark:text-white text-gray-900 text-justify font-light tracking-wider w-full">
            <Markdown>{response as string}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};
export default PreviousConversation;
