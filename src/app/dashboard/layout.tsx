"use client"
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getToken, removeToken } from "../Utils/auth";
import { Icon } from "../atoms";
import Link from "next/link";

interface DashboardProps {
  children: React.ReactNode;
}

export default function Dashboard({ children }: DashboardProps) {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const token = getToken();
    if (!token) router.push("/login");
  }, [router]);

  return (
    <div className="max-w-[1260px] w-full mx-auto p-2 md:p-4">
      <NavBar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex gap-4 py-4">
        {/* Sidebar (responsive toggle) */}
        <AsideBar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
        {/* Main content */}
        <main className="flex-1 shadow-lg rounded-md p-3 md:p-6 bg-white overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

/* ---------------- NAVBAR ---------------- */
const NavBar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {

  const router = useRouter();

  const [ logout , updateLogout] = useState<boolean>(false)

  useEffect(() => {
    if(logout){
      removeToken();
      router.replace("/login")
      updateLogout(false)
    }
  },[logout])

  return (
    <header className="flex justify-between items-center bg-white md:rounded-lg shadow-md h-[52px] px-4">
      {/* Left Section */}
      <div className="flex items-center gap-2">
        {/* Mobile Hamburger */}
        <button className="md:hidden" onClick={toggleSidebar}>
          <Icon iconName="menu" className="text-xl" />
        </button>
        <Icon iconName="person" />
        <h2 className="font-semibold">Hello Admin</h2>
      </div>

      {/* Right Section */}
      <button
        onClick={() => updateLogout(true)}
      className="flex items-center gap-2 text-red-500 hover:text-red-600">
        <Icon iconName="logout" />
        <span className="hidden sm:inline">Logout</span>
      </button>
    </header>
  );
};

/* ---------------- SIDEBAR ---------------- */
const AsideBar = ({ isOpen , setIsOpen }: { isOpen: boolean , setIsOpen:(val:boolean) => void}) => {
  const menuItems = [
    {name :"Home" , url:"/dashboard" , icon:"home"},
    { name: "Add Agent", url: "/dashboard/agent", icon: "add" },
    { name: "Uploads", url: "/dashboard/uploads", icon: "upload" },
    { name: "Agents" , url : "/dashboard/agentslist" , icon:"person"}
  ];


  const onHandleClick = () => {
    setIsOpen(false)
  }

  return (
    <aside
      className={`fixed md:static top-0 left-0 h-full md:h-auto w-[250px] bg-white shadow-lg p-4 transform transition-transform duration-300 
      ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
    >
      {menuItems.map((item, index) => (
        <Link
          key={index}
          href={item.url}
          onClick={onHandleClick}
          className="flex items-center gap-3 bg-gray-50 hover:bg-gray-100 my-2 px-3 py-2 rounded-md shadow-sm"
        >
          <Icon iconName={item.icon} className="text-gray-700" />
          <span className="text-gray-800 font-medium">{item.name}</span>
        </Link>
      ))}
    </aside>
  );
};
