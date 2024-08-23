"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
    const {data:session}=useSession()
    const user=session?.user
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const HandleToggle = () => {
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href={"/"} className="text-2xl font-bold">
          Mystery Message
        </Link>
        {session?(
                <>
                Welcome {user?.username}</>
            ):(<></>)}
        <div className="hidden md:flex space-x-4">
            
          <Link href={"/"} className="hover:text-gray-400">
            Home
          </Link>
          <Link href={"/about"} className="hover:text-gray-400">
            About
          </Link>
          <Link href={"/services"} className="hover:text-gray-400">
            Services
          </Link>
          <Link href={"/contact"} className="hover:text-gray-400">
            Contact
          </Link>
          {!session?(
              <>
              <Link href={"/sign-up"} className="hover:text-gray-400">
                Register Here
              </Link>
              <Link href={"/sign-in"} className="hover:text-gray-400">
                Login
              </Link>
              </>
          ):(<>
          <Link href={"/sign-in"} className="hover:text-gray-400">
                Logout
              </Link>
          </>)}
         
        </div>
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-400 hover:text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div
        className={`md:hidden fixed inset-0 bg-gray-800 bg-opacity-75 z-50 ${
          isOpen ? "" : "hidden"
        }`}
      >
        <button onClick={HandleToggle} className="absolute top-0 right-0 p-4">close</button>
        <div className="flex flex-col items-center justify-center h-full">
          <Link
            href={"/"}
            className="text-white text-xl py-2"
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            href={"/about"}
            className="text-white text-xl py-2"
            onClick={toggleMenu}
          >
            About
          </Link>
          <Link
            href={"/services"}
            className="text-white text-xl py-2"
            onClick={toggleMenu}
          >
            Services
          </Link>
          <Link
            href={"/contact"}
            className="text-white text-xl py-2"
            onClick={toggleMenu}
          >
            Contact
          </Link>
          <Link
            href={"/sign-up"}
            className="hover:text-gray-400"
            onClick={toggleMenu}
          >
            Register Here
          </Link>
          <Link
            href={"/sign-in"}
            className="hover:text-gray-400"
            onClick={toggleMenu}
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
