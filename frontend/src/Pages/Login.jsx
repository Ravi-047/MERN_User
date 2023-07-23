import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getUser } from "../Redux/user/action.user";
import { loginUser } from "../Redux/authReducer/action.auth";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";

import "./registerUser.css";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.usersReducer.users.users);
  console.log(userData);
  const [isOpen, setIsOpen] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const userExists = userData?.find((item) => item.email === values.email);
    if (userExists?.email === values?.email) {
      if (userExists?.password === values.password) {
        dispatch(loginUser(values))
          .then((res) => {
            if (res.status === 200) {
              toast.success("Login successful");
              localStorage.setItem("token", res.data.token);
              localStorage.setItem("username", res.data.user.username);
            }
          })
          .catch((err) => {
            toast.success("Something went wrong");
            console.log(err);
          });
      } else {
        toast.warn("Wrong Password");
        return;
      }
    } else {
      toast.warn("Email Not Found");
      return;
    }
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="__register_form__">
      <ToastContainer />
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="formInput">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          required
        />
        <button>Submit</button>
      </form>
      <p className="__no__account__">
        No Account, want to create{" "}
        <Link
          to="/register"
          style={{ textDecoration: "underline", color: "blue" }}
        >
          Register here
        </Link>
      </p>
      <div onClick={() => setIsOpen(!isOpen)} className="open_admin">
        Admin Login <span>{isOpen ? <FiChevronUp /> : <FiChevronDown />}</span>
      </div>
      {isOpen && (
        <div>
          <p>ID - ravi@gmail.com</p>
          <p>password - Ranjan@1234</p>
        </div>
      )}
    </div>
  );
};

export default Login;
