import Logo from "@/public/logo.svg";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import SearchInput from "../home/SearchInput";
import NavbarMenu from "./NavbarMenu";

const Navbar = () => {
  return (
    <nav className="grid grid-cols-2 md:flex justify-between items-center py-3 bg-white border-b mb-6 md:gap-8 px-4 md:px-8 lg:px-20">
      <div className="flex items-center">
        <Link href="/">
          <Image src={Logo} alt="Hotel Logo" className="h-8 w-auto" />
        </Link>
      </div>

      <div className="row-start-2 col-span-2 md:flex-1 max-w-lg mx-auto w-full">
        <div className="flex items-center border rounded-full shadow-sm hover:shadow-md transition-all mt-3 md:mt-0">
          <div className="flex-grow py-2 px-4">
            <Suspense fallback={<div>Loading...</div>}>
              <SearchInput />
            </Suspense>
          </div>
          <button className="bg-primary w-9 h-9 rounded-full grid place-items-center text-sm text-center transition-all hover:brightness-90 shrink-0 mx-1">
            <i className="fas fa-search text-white"></i>
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4 relative justify-end">
        <button>
          <i className="fas fa-language text-zinc-700 text-xl"></i>
        </button>

        <NavbarMenu />
      </div>
    </nav>
  );
};
export default Navbar;
