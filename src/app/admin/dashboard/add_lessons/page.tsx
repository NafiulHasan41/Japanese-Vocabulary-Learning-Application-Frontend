

import AddLessonForm from "@/components/lessons/AddLessonForm";
import PrivateRoute from "@/provider/PrivateRoute";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "JP-Wordsmith  | Admin | Add Lessons ",
  description: "Admin Dashboard for adding new lessons ",
};

export default function page() {
  
 
  return (
    <div className=" p-3 max-w-screen-xl mx-auto">
      <PrivateRoute adminOnly>
       <h1 className=" text-[18px] md:text-xl text-black font-bold"> ADD NEW LESSON HERE   </h1>
       <div className=" mt-2 md:mt-5 lg:mt-10">
        <AddLessonForm/>
       </div>
    </PrivateRoute>
    </div>
  );
}
