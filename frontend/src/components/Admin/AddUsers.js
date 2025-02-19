"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
function AddUsers() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  async function signup(e) {
    e.preventDefault();
    let user = { email, username, password, confirmpassword, country, gender };
    console.log(user);
    try {
      const response = await axios.post("http://localhost:5000/signup", user, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        withCredentials: true,
      });

      if (response.status === 200) {
        toast.success("Account Created", {
          position: "top-right",
          autoClose: 2000,
        });
        console.log(response.data);
        router.push("/admin/getusers");
      }
    } catch (error) {
  
      if (error.response.status === 500) {
        toast.error("Account Not Created", {
          position: "top-right",
          autoClose: 2000,
        });
        router.push("/adminlogin");
      } else if (error.response.status === 300) {
        toast.error("Incorrect Email Syntax", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    }
  }

  return (
    <div className="w-full">
  <ToastContainer />
  <form
    onSubmit={signup}
    className="w-full space-y-4 p-6 bg-white shadow-md rounded-lg"
  >
    <h2 className="text-3xl font-bold text-center text-gray-800">
      Add Users
    </h2>

    <div className="flex flex-col">
      <label htmlFor="email" className="text-gray-700">
        Email
      </label>
      <input
        id="email"
        type="email"
        placeholder="abc@gmail.com"
        onChange={(e) => setEmail(e.target.value)}
        required
        className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="username" className="text-gray-700">
        Username
      </label>
      <input
        id="username"
        type="text"
        placeholder="abc"
        onChange={(e) => setUsername(e.target.value)}
        required
        className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="password" className="text-gray-700">
        Password
      </label>
      <input
        id="password"
        type="password"
        placeholder="******"
        onChange={(e) => setPassword(e.target.value)}
        required
        className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="confirm_password" className="text-gray-700">
        Confirm Password
      </label>
      <input
        id="confirm_password"
        type="password"
        placeholder="******"
        onChange={(e) => setConfirmpassword(e.target.value)}
        required
        className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="country" className="text-gray-700">
        Country
      </label>
      <input
        id="country"
        type="text"
        placeholder="Pakistan"
        onChange={(e) => setCountry(e.target.value)}
        className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
      />
    </div>

    <div className="flex flex-col">
      <label htmlFor="gender" className="text-gray-700">
        Gender
      </label>
      <select
        id="gender"
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="mt-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
      >
        <option value="" disabled>
          Select Gender
        </option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>

    <button
      type="submit"
      className="w-full py-2 px-4 mt-4 bg-slate-700 text-white rounded hover:bg-slate-800 transition-colors duration-200"
    >
      Register
    </button>
  </form>
</div>

  );
}

export default AddUsers;
