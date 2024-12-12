

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
       <h1> Welcome to your lesson management page  </h1>
    </PrivateRoute>
    </div>
  );
}
