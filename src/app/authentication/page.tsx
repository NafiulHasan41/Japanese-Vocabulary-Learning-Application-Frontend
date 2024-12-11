import HybridAuthentication from "@/components/authentication/HybridAuthentication";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "JP-Wordsmith  | Authentication",
  description: "Authentication",
};

export default function page() {
  
 
  return (
    <div>
    <HybridAuthentication/>
    </div>
  );
}
