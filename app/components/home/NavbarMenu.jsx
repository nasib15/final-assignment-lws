"use client";

import Link from "next/link";
import { useState } from "react";

const NavbarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Navbar menu */}
      <button
        onClick={handleOpen}
        className="bg-white border border-zinc-300 text-zinc-800 px-4 py-2 rounded-full hover:shadow-md flex gap-3 items-center justify-center"
      >
        <i className="fas fa-bars"></i>
        <span className="bg-zinc-600 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white">
          <i className="fas fa-user text-white"></i>
        </span>
      </button>

      {/* Navbar toggle modal */}
      {isOpen && (
        <div className="max-w-48 w-48 bg-white shadow-sm border rounded-md absolute right-0 top-full max-h-fit mt-2 z-50 hidden lg:block">
          <ul className="">
            <Link href="/login" className="w-full">
              <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                Login
              </li>
            </Link>

            <Link href="/register" className="w-full">
              <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                Signup
              </li>
            </Link>

            <Link href="#" className="w-full">
              <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                Help
              </li>
            </Link>
          </ul>
        </div>
      )}
    </>
  );
};
export default NavbarMenu;
