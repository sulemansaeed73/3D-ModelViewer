"use client";
import React, { useState, useContext } from "react";
import { IoIosArrowDropdown } from "react-icons/io";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { IoMdMenu } from "react-icons/io";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoginContext } from "@/context/AuthContext";

function Header() {
  const router = useRouter();
  const name = "sul";
  const { loggedIn } = useContext(LoginContext);
  const { logout } = useContext(LoginContext);

  const [menuClicked, setMenuClicked] = useState(false);

  const OpenMenu = () => {
    setMenuClicked(true);
  };

  const closeMenu = () => {
    setMenuClicked(false);
    router.push("/");
  };

  return (
    <div>
      <div className="flex border-b border-red-500 ">
        <div className="text-2xl font-bold ml-10">
          <h1>AutoCAD Viewer</h1>
        </div>

        <div className="hidden md:block md:ml-auto md:mr-20 md:self-center">
          <ul className="flex gap-5 text-xl font-normal text-blue-800">
            <li>
              <Link href={"/"}>Home</Link>
            </li>
            <li>About </li>
            <li>Contact</li>
            <li>
              {loggedIn === true ? (
                <Menu>
                  <MenuButton className="px-4 bg-gray-700 text-white rounded-md shadow-md hover:bg-gray-800">
                    <span className="flex gap-1 items-center">
                      Account
                      <IoIosArrowDropdown />
                    </span>
                  </MenuButton>

                  <MenuItems
                    anchor="bottom"
                    className="absolute w-32 bg-white border border-gray-200 shadow-lg rounded-md overflow-hidden"
                  >
                    <MenuItem>
                      <a
                        href="/settings"
                        className="block px-4 py-2 hover:text-blue-700 hover:bg-blue-100"
                      >
                        Notifications
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="/profile"
                        className="block px-4 py-2 hover:text-blue-700 hover:bg-blue-100"
                      >
                        Profile
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        onClick={logout}
                        className="block px-4 py-2 hover:text-red-700 hover:bg-red-200 cursor-pointer"
                      >
                        Logout
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              ) : (
                <span>
                  <Link href={"/login"}>Sign In</Link>
                </span>
              )}
            </li>
          </ul>
        </div>

        <div className="md:hidden ml-auto self-center relative">
          <button onClick={OpenMenu} className="text-2xl">
            <IoMdMenu />
          </button>
          {menuClicked && (
            <div className="fixed inset-0 z-50 w-full h-full bg-slate-600 flex flex-col gap-5 text-xl text-white">
              <button
                onClick={closeMenu}
                className="text-2xl text-right p-5 text-white hover:text-red-500"
              >
                ✕
              </button>
              <ul className="flex flex-col items-center gap-5 mt-10">
                <li
                  onClick={closeMenu}
                  className="hover:text-red-500 cursor-pointer"
                >
                  Home
                </li>
                <li
                  onClick={closeMenu}
                  className="hover:text-red-500 cursor-pointer"
                >
                  Contact
                </li>
                <li
                  onClick={closeMenu}
                  className="hover:text-red-500 cursor-pointer"
                >
                  About
                </li>
                <li className="hover:text-red-500 cursor-pointer">
                  {loggedIn === true ? (
                    <span onClick={logout}>Logout</span>
                  ) : (
                    <span>
                      <Link href={"/login"}>Sign In</Link>
                    </span>
                  )}
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
