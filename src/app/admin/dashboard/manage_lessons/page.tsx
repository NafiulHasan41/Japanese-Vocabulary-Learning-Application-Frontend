


import LessonTable from "@/components/lessons/LessonTable";
import PrivateRoute from "@/provider/PrivateRoute";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "JP-Wordsmith  | Admin | Lessons ",
  description: "Admin Dashboard Lessons to check all the lessons",
};

export default function page() {
  
 
  return (
    <div className=" p-3 max-w-screen-xl mx-auto">
      <PrivateRoute adminOnly>
      <h1 className=" text-[18px] md:text-xl text-black font-bold">MANAGE LESSON HERE   </h1>
       <div className=" mt-2 md:mt-5 lg:mt-10">
      <LessonTable/>
       </div>
    </PrivateRoute>
    </div>
  );
}
