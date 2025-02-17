"use client";
import axios from "axios";
import React, { createContext, useState, useEffect } from "react";
export const AdminStatus = createContext(null);

function AdminContext({ children }) {
  const [loggedin, setLoggedin] = useState(false);

  useEffect(() => {
    const status = async () => {
      const response = await axios.get("http://localhost:5000/adminstatus", {
        withCredentials: true,
      });
      if (response.status === 200) {
        setLoggedin(true);
      } else {
        setLoggedin(false);
      }
    };
    status();
  }, []);

  

  function login(status) {
    if (status === 200) {
      setLoggedin(true);
    } else {
      console.log("Login failed");
    }
  }
  function logout(status) {
    console.log("Status in Context is ", status);
    if (status === 200) {
      setLoggedin(false);
    }
  }

  return (
    <AdminStatus.Provider value={{ loggedin, login, logout }}>
      {children}
    </AdminStatus.Provider>
  );
}
export default AdminContext;
