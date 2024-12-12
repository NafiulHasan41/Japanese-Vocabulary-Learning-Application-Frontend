

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
       <h1> Welcome to your lesson adding page  </h1>
    </PrivateRoute>
    </div>
  );
}
