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

      <div className="overflow-x-auto mt-10">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editUserId === user._id ? (
                      <input
                        type="text"
                        value={editedUser.username || ""}
                        onChange={(e) =>
                          handleInputChange("username", e.target.value)
                        }
                        className="rounded border p-2 w-full"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">
                        {user.username}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editUserId === user._id ? (
                      <input
                        type="email"
                        value={editedUser.email || ""}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className="rounded border p-2 w-full"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">
                        {user.email}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editUserId === user._id ? (
                      <input
                        type="text"
                        value={editedUser.country || ""}
                        onChange={(e) =>
                          handleInputChange("country", e.target.value)
                        }
                        className="rounded border p-2 w-full"
                      />
                    ) : (
                      <span className="text-sm text-gray-900">
                        {user.country}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editUserId === user._id ? (
                      <select
                        value={editedUser.gender || ""}
                        onChange={(e) =>
                          handleInputChange("gender", e.target.value)
                        }
                        className="rounded border p-2 w-full"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    ) : (
                      <span className="text-sm text-gray-900">
                        {user.gender}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {editUserId === user._id ? (
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => UpdateUser(user._id)}
                          className="text-green-600 hover:text-green-800"
                        >
                          <MdOutlineDone size={20} />
                        </button>
                        <button
                          onClick={CancelEdit}
                          className="text-red-600 hover:text-red-800"
                        >
                          <MdOutlineCancel size={20} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => router.push(`/admin/user/${user._id}`)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          <FaEye size={20} />
                        </button>
                        <button
                          onClick={() => handleEdit(user._id, user)}
                          className="text-indigo-500 hover:text-indigo-700"
                        >
                          <FaRegPenToSquare size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <MdDelete size={20} />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-4 whitespace-nowrap text-center text-gray-500 text-lg"
                >
                  No User Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
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
