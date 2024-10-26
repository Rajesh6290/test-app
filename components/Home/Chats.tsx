"use client";
import { useMutation } from "@/hooks";
import { useScrollAnchor } from "@/hooks/useScrollAnchor";
import { useEffect, useState } from "react";
import { removeFromLocalStorage } from "@/utils";
import Conversation from "./Conversation";
import ChatBox from "./ChatBox";
import { useRouter, useParams } from "next/navigation";

interface Message {
  query: string;
  response?: string;
  isLoading: boolean;
}

const Chats = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState("");
  const { mutation } = useMutation();
  const parmas = useParams();

  const { messagesRef, scrollRef, visibilityRef, scrollToBottom, isAtBottom } =
    useScrollAnchor();

  const getResponse = (query: string): string => {
    return query; // Adjust this function based on how you want to process the response
  };

  const handleSubmit = async () => {
    if (query.trim() === "") return;

    const newMessage: Message = { query, isLoading: true };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setQuery("");
    removeFromLocalStorage("initialQuery");
    const res = await mutation(`conversation/conversation`, {
      method: "POST",
      body: {
        session_id: parmas?.id,
        user_query: query,
      },
    });

    console.log("Response:", res); // Log the response for debugging

    if (res?.status === 200) {
      removeFromLocalStorage("initialQuery");
      const response = getResponse(res?.results?.response);

      // Update the last message in the array without duplication
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1] = {
          query,
          response,
          isLoading: false,
        };
        return updatedMessages;
      });

      scrollToBottom();
    }
  };

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom, scrollToBottom]);

  return (
    <div
      ref={scrollRef}
      className="w-full overflow-auto flex  items-start justify-center"
    >
      <div
        ref={messagesRef}
        className="lg:w-1/2 w-full pb-[150px] pt-5  flex flex-col gap-5 "
      >
        {messages?.map((item, index) => (
          <Conversation
            key={index}
            query={item?.query}
            response={item?.response}
            isLoading={item?.isLoading}
          />
        ))}
        <div className="w-full h-px" ref={visibilityRef} />
      </div>
      <ChatBox setQuery={setQuery} query={query} handleSubmit={handleSubmit} />
    </div>
  );
};

export default Chats;
