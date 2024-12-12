

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
       <h1> Welcome to your vocabularies management page  </h1>
    </PrivateRoute>
    </div>
  );
}
