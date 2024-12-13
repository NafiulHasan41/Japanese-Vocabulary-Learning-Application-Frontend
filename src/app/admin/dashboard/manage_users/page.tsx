

import ManageUsers from "@/components/user/UserForm";
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
      <h1 className=" text-[18px] md:text-xl text-black font-bold">MANAGE USER HERE   </h1>
       <div className=" mt-2 md:mt-5 lg:mt-10">
        <ManageUsers/>
       </div>
    </PrivateRoute>
    </div>
  );
}
