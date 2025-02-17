"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import Pagination from "react-js-pagination";
import { MdDelete, MdOutlineDone, MdOutlineCancel } from "react-icons/md";
import { FaRegPenToSquare } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import Search from "./Search";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

function GetUsers() {
  const [users, setUsers] = useState([]);
  const [editUserId, setEditUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [resetClicked, setResetClicked] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      Swal.fire({
        title: "Please Wait",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      try {
        const response = await axios.get("http://localhost:5000/get_users", {
          withCredentials: true,
        });
        if (response.status === 200) {
          setUsers(response.data);
          setResetClicked(false);
        }
      } catch (error) {
        console.error(error);
        if (error.response.status === 500) {
          router.push("/adminlogin");
        }
      } finally {
        Swal.close();
      }
    };
    fetchUsers();
  }, [resetClicked]);

  const handleEdit = (id, user) => {
    setEditUserId(id);
    setEditedUser({ ...user });
  };

  const CancelEdit = () => {
    setEditUserId(null);
    setEditedUser({});
  };

  const handleInputChange = (field, value) => {
    setEditedUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  async function UpdateUser(id) {
    try {
      const response = await axios.put(
        `http://localhost:5000/update_users/${id}`,
        editedUser,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success("User updated successfully", {
          position: "top-right",
          autoClose: 2000,
        });
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === id ? { ...user, ...editedUser } : user
          )
        );
        setEditUserId(null);
        setEditedUser({});
      }
    } catch (error) {
      if (error.response.status === 300) {
        return toast.error("Incorrect Email Syntax", { autoClose: 2000 });
      }
      toast.error("Failed to update user", { autoClose: 2000 });
    }
  }

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/delete_users/${id}`,
        { withCredentials: true }
      );
      if (response.status === 200) {
        toast.success("User deleted successfully", { autoClose: 2000 });
        setUsers((prev) => prev.filter((user) => user._id !== id));
      }
    } catch (error) {
      toast.error("Failed to delete user", { autoClose: 2000 });
    }
  };

  return (
    <div className="w-full flex flex-col min-h-screen">
      <h1 className="text-center text-3xl p-2 mb-8">User Management</h1>
      <Search
        display={setUsers}
        resetClicked={setResetClicked}
        currentPage={setCurrentPage}
      />
      <ToastContainer />

      <table className="w-full mt-10">
        <thead>
          <tr className="text-left h-8 bg-slate-600 text-white">
            <th className="w-[25%]">Name</th>
            <th className="w-[25%]">Email</th>
            <th className="w-[20%]">Country</th>
            <th className="w-[15%]">Gender</th>
            <th className="w-[15%]">Action</th>
          </tr>
        </thead>
        <tbody>
          {currentUsers.length > 0 ? (
            currentUsers.map((user) => (
              <tr key={user._id} className="text-gray-700 text-xl font-sans">
                <td>
                  {editUserId === user._id ? (
                    <input
                      type="text"
                      value={editedUser.username || ""}
                      onChange={(e) =>
                        handleInputChange("username", e.target.value)
                      }
                      className="rounded border w-[12rem]"
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td>
                  {editUserId === user._id ? (
                    <input
                      type="email"
                      value={editedUser.email || ""}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="rounded border w-[12rem]"
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editUserId === user._id ? (
                    <input
                      type="text"
                      value={editedUser.country || ""}
                      onChange={(e) =>
                        handleInputChange("country", e.target.value)
                      }
                      className="rounded border w-[12rem]"
                    />
                  ) : (
                    user.country
                  )}
                </td>
                <td>
                  {editUserId === user._id ? (
                    <select
                      value={editedUser.gender || ""}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="rounded border w-[12rem]"
                    >
                      <option value="male">male</option>
                      <option value="female">female</option>
                    </select>
                  ) : (
                    user.gender
                  )}
                </td>
                <td className="gap-2">
                  {editUserId === user._id ? (
                    <>
                      <button
                        onClick={() => UpdateUser(user._id)}
                        className="text-green-600"
                      >
                        <MdOutlineDone />
                      </button>
                      <button onClick={CancelEdit} className="text-red-600">
                        <MdOutlineCancel />
                      </button>
                    </>
                  ) : (
                    <>
                      <button 
                      onClick={()=>{router.push(`/admin/user/${user._id}`)}}
                      className="mr-1">
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleEdit(user._id, user)}
                        className="text-blue-600"
                      >
                        <FaRegPenToSquare />
                      </button>
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="text-red-600"
                      >
                        <MdDelete />
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                {currentUsers.length === 0 && (
                  <p className="text-2xl">No User Found </p>
                )}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="mt-auto mb-2">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={usersPerPage}
          totalItemsCount={users.length}
          onChange={(pageNumber) => setCurrentPage(pageNumber)}
          innerClass="flex justify-center"
          itemClass="px-3 py-1 border border-gray-300 rounded mx-1"
          activeClass="bg-blue-500 text-white"
        />
      </div>
    </div>
  );
}

export default GetUsers;
