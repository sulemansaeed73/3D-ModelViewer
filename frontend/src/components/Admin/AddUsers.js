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
    <div>
      <ToastContainer />

      <form
        onSubmit={signup}
        className="flex flex-col w-full space-y-3 p-6 rounded bg-teal-50"
      >
        <p className="text-3xl font-bold text-center">Add Users</p>
        <label htmlFor="email">Email</label>
        <input
          className="p-2 rounded border"
          id="email"
          type="email"
          placeholder="abc@gmail.com"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="username">Username</label>

        <input
          className="p-2 rounded border"
          id="username"
          type="text"
          placeholder="abc"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          className="p-2 rounded border"
          id="password"
          type="password"
          placeholder="******"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <label htmlFor="confirm_password">Confirm password</label>
        <input
          className="p-2 rounded border"
          id="confirm_password"
          type="password"
          placeholder="******"
          onChange={(e) => setConfirmpassword(e.target.value)}
          required
        />
        <label htmlFor="country">Country</label>
        <input
          className="p-2 rounded border"
          id="country"
          type="text"
          placeholder="pakistan"
          onChange={(e) => setCountry(e.target.value)}
        />
        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        >
          <option value="" disabled>
            Select Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <button
          type="submit"
          className="p-2 text-white rounded bg-slate-700 hover:bg-slate-800"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default AddUsers;
