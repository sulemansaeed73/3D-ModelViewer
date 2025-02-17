"use client";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

function Search({ display, resetClicked, currentPage }) {
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [gender, setGender] = useState("");
  const router = useRouter();

  function resetSearch() {
    resetClicked(true);
    setName("");
    setCountry("");
    setEmail("");
    setGender("");
  }

  async function SearchUser() {
    currentPage(1);
    const item = { username, email, country, gender };
    console.log(item);
    try {
      const response = await axios.post(
        "http://localhost:5000/search_user",
        item,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        display(response.data);
        console.log(response.data);
      }
      if (response.status === 202) {
        toast.warn("Nothing to Search", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (error) {
      if (error.response.status === 500) {
        router.push("/login");
      }
    }
  }

  return (
    <div className="search-page">
      <div className="lg:flex lg:gap-1 block p-2">
        <div className="flex flex-col">
          <label htmlFor="username">Name</label>
          <input
            className="p-1"
            id="username"
            value={username}
            placeholder="Type Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            className="p-1"
            id="email"
            value={email}
            placeholder="Type Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="country">Country</label>
          <input
            className="p-1"
            id="country"
            value={country}
            placeholder="Type Country Name"
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="gender">Gender</label>
          <select
            className="w-[15rem]"
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
        </div>
        <button
          className="text-base rounded h-9 mt-6 w-[7rem] border bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
          onClick={SearchUser}
        >
          Search
        </button>
        <button
          onClick={resetSearch}
          className="text-base rounded h-9 mt-6 w-[7rem] border bg-red-500 text-white"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Search;
