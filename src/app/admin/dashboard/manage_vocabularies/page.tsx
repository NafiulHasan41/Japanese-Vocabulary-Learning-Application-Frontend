

import VocabularyTable from "@/components/vocabularies/VocabularyTable";
import PrivateRoute from "@/provider/PrivateRoute";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "JP-Wordsmith  | Admin | Managing Vocabularies ",
  description: "Admin Dashboard to manage all the vocabularies",
};

export default function page() {
  
 
  return (
    <div className=" p-3 max-w-screen-xl mx-auto">
      <PrivateRoute adminOnly>
      <h1 className=" text-[18px] md:text-xl text-black font-bold">MANAGE VOCABULARIES HERE   </h1>
       <div className=" mt-2 md:mt-5 lg:mt-10">
       <VocabularyTable/>
       </div>
    </PrivateRoute>
    </div>
  );
}
