import React, { useEffect, useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";
interface CustomTypingTextProps {
  text: string;
  typingSpeed?: number;
}

const CustomTypingText: React.FC<CustomTypingTextProps> = ({
  text,
  typingSpeed = 1,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let index = 0;

    const typeNextCharacter = () => {
      if (index < text.length) {
        setDisplayedText((prev) => prev + text.charAt(index));
        index += 1;
        setTimeout(typeNextCharacter, typingSpeed);
      }
    };

    typeNextCharacter();
    return () => {
      index = text.length;
    };
  }, [text, typingSpeed]);

  return (
    <div className="dark:text-white text-gray-700 font-light tracking-wider w-full">
      <MarkdownRenderer content={displayedText} />
    </div>
  );
};

export default CustomTypingText;
