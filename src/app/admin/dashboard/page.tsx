

import PrivateRoute from "@/provider/PrivateRoute";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "JP-Wordsmith  | Admin Dashboard",
  description: "Admin Dashboard",
};

export default function page() {
  
 
  return (
    <div className=" p-3 max-w-screen-xl mx-auto">
      <PrivateRoute adminOnly>
       <h1> This is admin Dashboard which is protected using private route </h1>
     
    </PrivateRoute>
    </div>
  );
}
