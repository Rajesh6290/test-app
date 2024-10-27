import WorkFlows from "@/components/Home/WorkFlows";
import { Metadata } from "next";
export const metadata: Metadata = {
  metadataBase: new URL("https://chat.vercel.ai"),
  title: "Workflows | Cognitiveview AI",
  description:
    "Enhance productivity with CognitiveView Copilot AI, your intelligent assistant for data-driven insights and personalized recommendations.",
};
const Page = () => {

  return <WorkFlows />
};

export default Page;
