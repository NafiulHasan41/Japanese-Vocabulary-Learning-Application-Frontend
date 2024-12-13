
import TutorialPage from "@/components/user/ShowTutorial";
import PrivateRoute from "@/provider/PrivateRoute";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "JP-Wordsmith  | Tutorials",
  description: "Tutorial video",
};

export default function page() {
  
 
  return (
    <div className=" p-3 max-w-screen-xl mx-auto">
      <PrivateRoute>
      <h1 className=" text-[18px] md:text-xl text-black font-bold">WELCOME TO YOUR Video Tutorial   </h1>
       <div className=" mt-2 md:mt-5 lg:mt-10">
        <TutorialPage/>
       </div>
    </PrivateRoute>
    </div>
  );
}
