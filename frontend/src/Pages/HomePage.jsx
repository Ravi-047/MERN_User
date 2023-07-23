import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser, updateUser } from "../Redux/user/action.user";
import { FiSearch, FiChevronUp, FiChevronDown } from "react-icons/fi";
import "./homepage.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.usersReducer.users.users);

  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [editUserId, setEditUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [state, setState] = useState("");
  const [phone, setPhone] = useState("");

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const filteredData = userData?.filter((user) => {
    const { name, username, email, state } = user;
    const lowerSearchTerm = searchTerm.toLowerCase();
    return (
      name.toLowerCase().includes(lowerSearchTerm) ||
      username.toLowerCase().includes(lowerSearchTerm) ||
      email.toLowerCase().includes(lowerSearchTerm) ||
      state.toLowerCase().includes(lowerSearchTerm)
    );
  });

  const sortedData = filteredData?.sort((a, b) => {
    if (sortField) {
      const fieldA = a[sortField];
      const fieldB = b[sortField];
      const order = sortOrder === "asc" ? 1 : -1;

      if (fieldA < fieldB) {
        return -order;
      }
      if (fieldA > fieldB) {
        return order;
      }
      return 0;
    } else {
      return 0;
    }
  });

  const handleUpdate = (id) => {
    console.log(id);
    const data = userData?.find((user) => user._id === id);
    setEditUserId(id);
    setName(data.name);
    setUsername(data.username);
    setEmail(data.email);
    setAge(data.age);
    setState(data.state);
    setPhone(data.phone);
  };

  const handleSave = (id) => {
    const newData = {
      name,
      username,
      email,
      age,
      state,
      phone,
    };
    const token = localStorage?.getItem("token");
    const currentUser = localStorage?.getItem("username");
    const userExist = userData?.find((item) => item.username === currentUser);
    console.log(userExist);
    if (userExist?.isAdmin) {
      dispatch(updateUser(id, token, newData));
      toast.success("User data updated successfully!");
    } else if (userExist?._id === id) {
      dispatch(updateUser(id, token, newData));
      toast.success("User data updated successfully!");
    } else {
      toast.error("You are not authorized to update the user.");
      return;
    }
    setEditUserId(null);
    setName("");
    setUsername("");
    setEmail("");
    setAge("");
    setState("");
    setPhone("");
  };

  const handleCancel = () => {
    setEditUserId(null);
  };

  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    const currentUser = localStorage.getItem("username");
    const userExist = userData?.find((item) => item.username === currentUser);

    if (userExist?.isAdmin) {
      dispatch(deleteUser(id, token));
      toast.success("User data deleted successfully!");
    } else if (userExist?._id === id) {
      dispatch(deleteUser(id, token));
      toast.success("User data deleted successfully!");
    } else {
      toast.error("You are not authorized to delete the user.");
      return;
    }
    // console.log(`Delete user with ID: ${id}`);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData?.slice(indexOfFirstItem, indexOfLastItem);

  const renderPagination = () => {
    const pageNumbers = Math.ceil(sortedData?.length / itemsPerPage);
    return (
      <ul className="pagination">
        <li
          className={currentPage === 1 ? "disabled" : ""}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </li>
        {Array.from({ length: pageNumbers }, (_, index) => index + 1)?.map(
          (pageNumber) => (
            <li
              key={pageNumber}
              className={currentPage === pageNumber ? "active" : ""}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          )
        )}
        <li
          className={currentPage === pageNumbers ? "disabled" : ""}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </li>
      </ul>
    );
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="table-container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name, username, email, or state..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FiSearch className="search-icon" />
      </div>
      <table className="user-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("name")}>
              Name{" "}
              {sortField === "name" && sortOrder === "asc" && (
                <FiChevronUp className="sort-icon" />
              )}
              {sortField === "name" && sortOrder === "desc" && (
                <FiChevronDown className="sort-icon desc" />
              )}
            </th>
            <th onClick={() => handleSort("username")}>
              Username{" "}
              {sortField === "username" && sortOrder === "asc" && (
                <FiChevronUp className="sort-icon" />
              )}
              {sortField === "username" && sortOrder === "desc" && (
                <FiChevronDown className="sort-icon desc" />
              )}
            </th>
            <th onClick={() => handleSort("email")}>
              Email{" "}
              {sortField === "email" && sortOrder === "asc" && (
                <FiChevronUp className="sort-icon" />
              )}
              {sortField === "email" && sortOrder === "desc" && (
                <FiChevronDown className="sort-icon desc" />
              )}
            </th>
            <th onClick={() => handleSort("age")}>
              Age{" "}
              {sortField === "age" && sortOrder === "asc" && (
                <FiChevronUp className="sort-icon" />
              )}
              {sortField === "age" && sortOrder === "desc" && (
                <FiChevronDown className="sort-icon desc" />
              )}
            </th>
            <th onClick={() => handleSort("state")}>
              State{" "}
              {sortField === "state" && sortOrder === "asc" && (
                <FiChevronUp className="sort-icon" />
              )}
              {sortField === "state" && sortOrder === "desc" && (
                <FiChevronDown className="sort-icon desc" />
              )}
            </th>
            <th onClick={() => handleSort("phone")}>
              Phone Number{" "}
              {sortField === "phone" && sortOrder === "asc" && (
                <FiChevronUp className="sort-icon" />
              )}
              {sortField === "phone" && sortOrder === "desc" && (
                <FiChevronDown className="sort-icon desc" />
              )}
            </th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((user) => (
            <tr key={user._id}>
              <td>
                {editUserId === user._id ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                ) : (
                  user.name
                )}
              </td>
              <td>
                {editUserId === user._id ? (
                  <input
                    type="text"
                    value={user.username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                ) : (
                  user.username
                )}
              </td>
              <td>
                {editUserId === user._id ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editUserId === user._id ? (
                  <input
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                ) : (
                  user.age
                )}
              </td>
              <td>
                {editUserId === user._id ? (
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
                ) : (
                  user.state
                )}
              </td>
              <td>
                {editUserId === user._id ? (
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                ) : (
                  user.phone
                )}
              </td>
              <td>
                {editUserId === user._id ? (
                  <div className="action-buttons">
                    <button onClick={() => handleSave(user._id)}>Save</button>
                    <button onClick={() => handleCancel()}>Cancel</button>
                  </div>
                ) : (
                  <div className="action-buttons">
                    <button
                      type="button"
                      onClick={() => handleUpdate(user._id)}
                    >
                      Update
                    </button>
                    <button onClick={() => handleDelete(user._id)}>
                      Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {renderPagination()}
      <ToastContainer />
    </div>
  );
};

export default HomePage;
