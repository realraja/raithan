import React from "react";
import Link from "next/link";
import { NavbarData } from "@/utils/AdminNavbarData";

const Sidebar = () => {
  return (
    <div className="bg-gray-900 text-white h-full w-1/6 max-sm:hidden md:block">
      <div className="p-4 text-xl font-bold flex justify-center items-center gap-3">
        <img
          className="h-16"
          src="/Logo_Design_Template-removebg-preview.png"
          alt="logo"
        />
        <span className="sm:hidden lg:block">Raithan Classes</span>
      </div>
      <nav className="mt-4">
        {NavbarData.map((i)=>(
          <Link
          key={i.id}
          href={i.herf}
          className="flex items-center p-4 hover:bg-purple-800"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 mr-2 sm:hidden md:block">
  {i.icon}
</svg>
 {i.name}
        </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
