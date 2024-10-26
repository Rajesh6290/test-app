import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="w-full h-full pt-10 flex items-center justify-center">
      <SignUp />
    </div>
  );
}
