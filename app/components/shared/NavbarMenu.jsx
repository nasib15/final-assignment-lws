"use client";

import { getIconForMenuItem } from "@/utils/getItemForMenuItem";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const signOutState = [
  {
    id: 1,
    path: "/login",
    name: "Login",
  },
  {
    id: 2,
    path: "/register",
    name: "Signup",
  },
];

const signInState = [
  {
    id: 1,
    path: "/profile/create-hotel",
    name: "Create Hotel",
  },
  {
    id: 2,
    path: "/profile/manage-hotels",
    name: "Manage Hotels",
  },
  {
    id: 3,
    path: "/profile/my-bookings",
    name: "My Bookings",
  },
];

const NavbarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data } = useSession();
  console.log(data);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const handleOpen = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Navbar menu button */}
      <button
        ref={buttonRef}
        onClick={handleOpen}
        className="bg-white border border-zinc-300 text-zinc-800 px-4 py-2 rounded-full hover:shadow-md flex gap-3 items-center justify-center"
      >
        <i className="fas fa-bars"></i>
        <span className="bg-zinc-600 w-6 h-6 rounded-full flex items-center justify-center text-xs text-white">
          {data?.user ? (
            <Image
              src={data?.user?.image}
              alt="User avatar"
              className="w-full h-full object-cover rounded-full"
              width={24}
              height={24}
            />
          ) : (
            <i className="fas fa-user text-white"></i>
          )}
        </span>
      </button>

      {/* Navbar toggle modal */}
      {isOpen && (
        <div
          ref={menuRef}
          className="max-w-64 w-64 bg-white shadow-lg border rounded-xl absolute right-0 top-full max-h-fit mt-2 z-50 navbar-menu overflow-hidden"
        >
          {data?.user ? (
            <>
              {/* User Profile Section */}
              <div className="px-4 py-3 bg-gray-50 border-b">
                <div className="flex items-center gap-3">
                  <div className="rounded-full overflow-hidden">
                    <Image
                      src={data?.user?.image}
                      alt="User avatar"
                      className="object-cover"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {data?.user?.name}
                    </h4>
                    <p className="text-sm text-gray-500">{data?.user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                {signInState.map((item) => (
                  <Link href={item.path} key={item.id}>
                    <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-all">
                      <i className={getIconForMenuItem(item.name)}></i>
                      {item.name}
                    </div>
                  </Link>
                ))}

                {/* Logout Button */}
                <div
                  className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 cursor-pointer transition-all"
                  onClick={() => signOut({ redirectTo: "/" })}
                >
                  <i className="fas fa-sign-out-alt"></i>
                  Logout
                </div>
              </div>
            </>
          ) : (
            <div className="py-2">
              {signOutState.map((item) => (
                <Link href={item.path} key={item.id}>
                  <div className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-all">
                    <i className={getIconForMenuItem(item.name)}></i>
                    {item.name}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default NavbarMenu;
