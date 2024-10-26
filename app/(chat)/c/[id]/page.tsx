import ReviewChats from "@/components/Home/ReviewChat";

export default async function Page() {
  return (
    <div className="w-full h-[calc(100vh_-_theme(spacing.16))] overflow-y-auto ">
      <ReviewChats />
    </div>
  );
}
