

import PrivateRoute from "@/provider/PrivateRoute";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "JP-Wordsmith  | Admin | Managing Users ",
  description: "This is the admin dashboard page to manage users and change the role of the user promote or demote the user",
};

export default function page() {
  
 
  return (
    <div className=" p-3 max-w-screen-xl mx-auto">
      <PrivateRoute adminOnly>
       <h1> Welcome to your User Managing page  </h1>
    </PrivateRoute>
    </div>
  );
}
