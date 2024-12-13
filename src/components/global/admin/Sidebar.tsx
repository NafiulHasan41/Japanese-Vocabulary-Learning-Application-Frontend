'use client';
import React, { useContext, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaList,
  FaUsers,
  FaBook,
  FaPlus,
  FaUserShield,
} from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { AuthContext } from "@/provider/AuthProvider";
import Image from "next/image";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);
  const currentRoute = usePathname();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { user } = authContext;

  return (
    <div className="flex flex-col lg:flex-row m-3 lg:gap-3 ">
      <div className="border-black border-2 rounded-xl w-full ">
        <nav className="relative bg-[#bdebe7] rounded-xl shadow-xl">
          <div className="container px-3 py-3 mx-auto">
            <div className="lg:flex lg:flex-col lg:items-center lg:justify-between">
              <div className="flex flex-col items-end lg:items-center lg:justify-between">
                {/* Mobile menu button */}
                <div className="flex lg:hidden">
                  <p className="font-semibold text-blue-500 mx-2">Menu</p>
                  <button
                    onClick={toggleMenu}
                    type="button"
                    className="text-gray-500 hover:text-gray-600 focus:outline-none"
                    aria-label="toggle menu"
                  >
                    {isOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4 8h16M4 16h16"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Sidebar menu */}
              <div
                className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-[#c1e0dd] lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-full lg:opacity-100 lg:translate-x-0 flex flex-col-reverse lg:flex lg:flex-row lg:items-start ${
                  isOpen ? "translate-x-0 opacity-100" : "opacity-0 -translate-x-full"
                }`}
              >
                <div className="flex flex-col my-5 ml-2 space-y-2 lg:space-y-8 lg:min-h-[calc(100vh-50px)]">
                  <div className="w-full">
                    {/* User Info */}
                    <div className="flex flex-col items-center mt-6 -mx-2">
                      <Image
                        className="object-cover w-24 h-24 mx-2 rounded-full"
                        src={user?.imageURL || ''}
                        alt="avatar"
                        width={60}
                        height={60}
                      />
                      <h4 className="mx-2 mt-2 font-medium text-gray-800">{user?.name}</h4>
                      <p className="mx-2 mt-1 text-sm font-medium text-gray-600">{user?.email}</p>
                    </div>
                    <div className="divider font-extrabold"></div>

                    <ul className="menu p-4 space-y-2">
                      <li onClick={closeMenu}>
                        <Link href="/admin/dashboard">
                          <div
                            className={`flex gap-2 items-center ${
                              currentRoute === "/admin/dashboard" ? "font-bold text-[18px]" : ""
                            }`}
                          >
                            <FaBook /> Dashboard Home
                          </div>
                        </Link>
                      </li>
                      <li onClick={closeMenu}>
                        <Link href="/admin/dashboard/add_lessons">
                          <div
                            className={`flex  gap-2 items-center ${
                              currentRoute === "/admin/dashboard/add_lessons"
                                ? "font-bold text-[18px]"
                                : ""
                            }`}
                          >
                            <IoMdAddCircleOutline /> Add Lessons
                          </div>
                        </Link>
                      </li>
                      <li onClick={closeMenu}>
                        <Link href="/admin/dashboard/add_vocabulary">
                          <div
                            className={`flex  gap-2 items-center ${
                              currentRoute === "/admin/dashboard/add_vocabulary"
                                ? "font-bold text-[18px]"
                                : ""
                            }`}
                          >
                            <FaPlus /> Add Vocabularies
                          </div>
                        </Link>
                      </li>
                      <li onClick={closeMenu}>
                        <Link href="/admin/dashboard/manage_users">
                          <div
                            className={`flex  gap-2 items-center ${
                              currentRoute === "/admin/dashboard/manage_users"
                                ? "font-bold text-[18px]"
                                : ""
                            }`}
                          >
                            <FaUserShield /> Manage Users
                          </div>
                        </Link>
                      </li>
                      <li onClick={closeMenu}>
                        <Link href="/admin/dashboard/manage_lessons">
                          <div
                            className={`flex  gap-2 items-center ${
                              currentRoute === "/admin/dashboard/manage_lessons"
                                ? "font-bold text-[18px]"
                                : ""
                            }`}
                          >
                            <FaList /> Lesson Management
                          </div>
                        </Link>
                      </li>
                      <li onClick={closeMenu}>
                        <Link href="/admin/dashboard/manage_vocabularies">
                          <div
                            className={`flex  gap-2 items-center ${
                              currentRoute === "/admin/dashboard/manage_vocabularies"
                                ? "font-bold text-[18px]"
                                : ""
                            }`}
                          >
                            <FaUsers /> Vocabulary Management
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
