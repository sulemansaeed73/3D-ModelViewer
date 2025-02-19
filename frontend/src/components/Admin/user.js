"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function User({ id }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUser = async function SingleUser() {
      try {
        const response = await axios.get(
          `http://localhost:5000/get_singleuser/${id}`
        );
        if (response.status === 200) {
          setUser(response.data);
          console.log(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [id]);

  return (
    <div className="max-w-md mx-auto my-10 bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
      User Details
    </h2>
    {user ? (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <p className="mt-1 p-2 border border-gray-300 rounded-md text-gray-800">
            {user.username}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <p className="mt-1 p-2 border border-gray-300 rounded-md text-gray-800">
            {user.email}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Country
          </label>
          <p className="mt-1 p-2 border border-gray-300 rounded-md text-gray-800">
            {user.country}
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <p className="mt-1 p-2 border border-gray-300 rounded-md text-gray-800">
            {user.gender}
          </p>
        </div>
      </div>
    ) : (
      <p className="text-center text-gray-500">User details not available.</p>
    )}
  </div>
  );
}

export default User;
