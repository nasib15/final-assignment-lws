"use client";

import { signOut, useSession } from "next-auth/react";
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
          <i className="fas fa-user text-white"></i>
        </span>
      </button>

      {/* Navbar toggle modal */}
      {isOpen && (
        <div
          ref={menuRef}
          className="max-w-48 w-48 bg-white shadow-sm border rounded-md absolute right-0 top-full max-h-fit mt-2 z-50 navbar-menu"
        >
          <ul>
            {data?.user ? (
              <>
                {signInState.map((item) => (
                  <Link href={item.path} key={item.id}>
                    <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                      {item.name}
                    </li>
                  </Link>
                ))}
                <li
                  className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4 hover:cursor-pointer"
                  onClick={() => signOut({ redirectTo: "/" })}
                >
                  Logout
                </li>
              </>
            ) : (
              signOutState.map((item) => (
                <Link href={item.path} key={item.id}>
                  <li className="px-3 py-2 text-sm text-zinc-700 transition-all hover:bg-zinc-50 hover:text-zinc-800 hover:pl-4">
                    {item.name}
                  </li>
                </Link>
              ))
            )}
          </ul>
        </div>
      )}
    </>
  );
};

export default NavbarMenu;
