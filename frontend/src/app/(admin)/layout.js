"use client";
import axios from "axios";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { IoMdMenu } from "react-icons/io";
import { useContext, useState } from "react";
import Link from "next/link";

import AdminContext, { AdminStatus } from "@/context/AdminContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AdminContext>
          <LayoutContent>{children}</LayoutContent>
        </AdminContext>
      </body>
    </html>
  );
}

function LayoutContent({ children }) {

  const router = useRouter();

  const { loggedin, logout } = useContext(AdminStatus);


  async function AdminLogout() {
    const response = await axios.get("http://localhost:5000/admin_logout", {
      withCredentials: true,
    });
    if (response.status === 200) {
      logout(response.status);
      router.push("/adminlogin");
      return;
    }
  }

  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden md:block w-60 bg-slate-900 space-y-3">
        <p className="p-5 text-3xl text-white">Admin</p>
        <button
          className="block w-full p-2 text-gray-400 hover:bg-slate-200"
          onClick={() => {
            router.push("/admin/addusers");
          }}
        >
          Add Users
        </button>
        <button
          onClick={() => {
            router.push("/admin/getusers");
          }}
          className="w-full p-2 text-gray-400 hover:bg-slate-200"
        >
          Get Users
        </button>

        {loggedin === false ? (
          <button className="p-2 w-full text-gray-400 hover:bg-green-500">
            <span>
              <Link href={"adminlogin"}>Login</Link>
            </span>
          </button>
        ) : (
          <button
            className="p-2 w-full text-gray-400 hover:bg-red-500"
            onClick={AdminLogout}
          >
            <span>Logout</span>
          </button>
        )}
      </div>

      <div className="ml-2 w-full">{children}</div>
    </div>
  );
}
