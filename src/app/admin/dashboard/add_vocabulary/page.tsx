

import AddVocabularyForm from "@/components/vocabularies/AddVocabularyForm";
import PrivateRoute from "@/provider/PrivateRoute";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "JP-Wordsmith  | Admin | Add Vocabulary ",
  description: "Admin Dashboard page for adding new vocabulary",
};

export default function page() {
  
 
  return (
    <div className=" p-3 max-w-screen-xl mx-auto">
      <PrivateRoute adminOnly>
      <h1 className=" text-[18px] md:text-xl text-black font-bold"> ADD NEW VOCABULARY HERE   </h1>
       <div className=" mt-2 md:mt-5 lg:mt-10">
        <AddVocabularyForm/>
       </div>
    </PrivateRoute>
    </div>
  );
}
