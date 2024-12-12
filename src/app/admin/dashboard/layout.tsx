
import Sidebar from "@/components/global/admin/Sidebar";
import { ReactNode } from "react";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
  
      <aside className=" lg:w-[20%] border-r border-gray-200 bg-white">
        <Sidebar />
      </aside>
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
