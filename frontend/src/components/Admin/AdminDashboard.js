"use client";
import React from "react";
function AdminDashBoard() {
  return (
    <div>
      <h1 className="p-3 text-2xl">Admin DashBoard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 p-4">
        <div className="p-3 flex flex-col border border-gray-700 bg-gradient-to-r from-blue-500 to-green-500">
          <h1 className="mb-[30px] font-geist text-3xl text-white">Users</h1>
          <h1 className="text-2xl font-fantasy">12</h1>
        </div>
        <div className="p-3 border border-gray-700 bg-gradient-to-r from-blue-500 to-green-500">
          <h1 className="mb-[30px] font-geist text-3xl text-white">Countries</h1>
          <h1 className="text-2xl font-fantasy">7</h1>
        </div>
        <div className="p-3 flex flex-col border border-gray-700 bg-gradient-to-r from-blue-500 to-green-500">
          <h1 className="mb-[30px] font-geist text-3xl text-white">Language</h1>
          <h1 className="text-2xl font-fantasy">3</h1>
        </div>
      </div>
    </div>
  );
}

export default AdminDashBoard;
