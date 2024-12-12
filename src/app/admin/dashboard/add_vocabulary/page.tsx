

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
       <h1> Welcome to your vocabulary adding page  </h1>
    </PrivateRoute>
    </div>
  );
}
