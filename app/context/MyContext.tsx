// app/context/MyContext.tsx
"use client"; // Enable client-side rendering for context usage

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

// Define the shape of the context value
interface MyContextType {
  fullWidth: boolean;
  sliderOpen: boolean;
  setFullWidth: Dispatch<SetStateAction<boolean>>;
  setSliderOpen: Dispatch<SetStateAction<boolean>>;
}

// Create the context with an initial undefined value
const MyContext = createContext<MyContextType | undefined>(undefined);

// Provider Props Interface
interface MyContextProviderProps {
  children: ReactNode;
}

// Create a provider component
export function MyContextProvider({ children }: MyContextProviderProps) {
  const [fullWidth, setFullWidth] = useState<boolean>(false);
  const [sliderOpen, setSliderOpen] = useState<boolean>(false);

  // Define the context value to be passed to the provider
  const contextValue: MyContextType = {
    fullWidth,
    sliderOpen,
    setFullWidth,
    setSliderOpen,
  };

  return (
    <MyContext.Provider value={contextValue}>{children}</MyContext.Provider>
  );
}

// Custom hook to use the context
export const useMyContext = (): MyContextType => {
  const context = useContext(MyContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
