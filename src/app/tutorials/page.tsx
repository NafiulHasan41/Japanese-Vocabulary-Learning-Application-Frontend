
import PrivateRoute from "@/provider/PrivateRoute";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "JP-Wordsmith  | Tutorials",
  description: "Tutorial video",
};

export default function page() {
  
 
  return (
    <div className=" p-3 max-w-screen-xl mx-auto">
      <PrivateRoute>
       <h1> This is tutorials which is protected using private route </h1>
    </PrivateRoute>
    </div>
  );
}
