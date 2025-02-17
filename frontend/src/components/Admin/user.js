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
    <div>
      <p className="text-3xl font-medium text-center mt-4">User Details</p>
      {user && (
        <div className="flex flex-col gap-2 mt-4 p-4 ">
          <label className="text-xl font-medium">Username </label>
          <p className="border p-2 text-x1 text-red-800 font-medium">{user.username}</p>
          <label className="text-xl font-medium">Email </label>
          <p className="border p-2 text-x1 text-red-800 font-medium">{user.email}</p>
          <label className="text-xl font-medium">Country </label>
          <p className="border p-2 text-x1 text-red-800 font-medium">{user.country}</p>
          <label className="text-xl font-medium">Gender </label>
          <p className="border p-2 text-x1 text-red-800 font-medium">{user.gender}</p>
        </div>
      )}
    </div>
  );
}

export default User;
