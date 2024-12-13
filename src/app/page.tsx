
import LessonsPage from "@/components/user/ShowLesson";
import PrivateRoute from "@/provider/PrivateRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "JP-Wordsmith  | Lessons",
  description: "User Lessons",
};
export default function Home() {
  return (
    <div className=" p-3 max-w-screen-xl mx-auto">
      <PrivateRoute>
      <h1 className=" text-[18px] md:text-xl text-black font-bold">WELCOME TO YOUR LESSON   </h1>
       <div className=" mt-2 md:mt-5 lg:mt-10">
        <LessonsPage/>
       </div>
      </PrivateRoute>
    </div>
  );
}
