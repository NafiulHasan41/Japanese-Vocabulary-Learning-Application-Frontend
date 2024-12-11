
import PrivateRoute from "@/provider/PrivateRoute";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "JP-Wordsmith  | Lessons",
  description: "User Lessons",
};

export default function page() {
  
 
  return (
    <div>
      <PrivateRoute>
       <h1> This is lesson which is protected using private route </h1>
    </PrivateRoute>
    </div>
  );
}
