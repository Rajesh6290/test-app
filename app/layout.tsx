import { Metadata } from "next";
import { Toaster } from "sonner";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/custom/theme-provider";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import { Navbar } from "@/components/custom/navbar";
import { MyContextProvider } from "./context/MyContext";
import Layout from "@/components/core/Layout";

export const metadata: Metadata = {
  metadataBase: new URL("https://chat.vercel.ai"),
  title: "CognitiveView - Copilot AI",
  description:
    "Enhance productivity with CognitiveView Copilot AI, your intelligent assistant for data-driven insights and personalized recommendations.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased h-screen">
        <Toaster position="top-center" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader />
          <ClerkProvider
            appearance={{
              baseTheme: dark,
            }}
          >
            <MyContextProvider>
              <Layout>{children}</Layout>
            </MyContextProvider>
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
