"use client";
import React, { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Link from "next/link";
import { AdminStatus } from "@/context/AdminContext";

function Login() {
  const { login } = useContext(AdminStatus);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  async function Admin_Login(e) {
    e.preventDefault();

    let user = { email, password };
    console.log(user);
    try {
      const response = await axios.post(
        "http://localhost:5000/adminlogin",
        user,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("Logged in successfully!", {
          position: "top-right",
          autoClose: 1000,
        });
        login(response.status)
        router.push("/admin");
      }
    } catch (error) {
      if (error.response.data.status === 404) {
        toast.error("User Not Found", {
          position: "top-right",
          autoClose: 3000,
        });
      } else if (error.response.status === 401) {
        toast.error("Incorrect Password", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  }
  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-teal-500">
        <div className="w-96 bg-white p-6 rounded">
          <ToastContainer />
          <p className="text-center text-3xl mb-4 font-bold">Admin Login</p>
          <form onSubmit={Admin_Login} className="flex flex-col space-y-3">
            <label htmlFor="email">Email</label>
            <input
              className="p-2 rounded border border-gray-300"
              id="email"
              type="email"
              placeholder="abc@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            <input
              className="p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-500"
              id="password"
              type="password"
              placeholder="********"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="p-2 text-white rounded bg-slate-700 hover:bg-slate-800"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
