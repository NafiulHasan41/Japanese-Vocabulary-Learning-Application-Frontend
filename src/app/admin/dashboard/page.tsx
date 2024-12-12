

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
       <h1>  WelCome to your dashboard </h1>
     
    </PrivateRoute>
    </div>
  );
}
