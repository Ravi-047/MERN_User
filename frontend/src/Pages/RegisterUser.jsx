import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../Components/FormInput";
import { Link, useNavigate } from "react-router-dom";
import "./registerUser.css";
import { addUser, getUser } from "../Redux/user/action.user";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RegisterUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.usersReducer.users.users);

  const [values, setValues] = useState({
    username: "",
    email: "",
    phone: "",
    name: "",
    age: "",
    password: "",
    state: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3 - 20 characters and shouldn't include any special characters",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "phone",
      type: "text",
      placeholder: "Enter phone number",
      errorMessage: "It should be a valid phone number",
      pattern: "[0-9]{10}",
      label: "Phone Number",
      required: true,
    },
    {
      id: 4,
      name: "name",
      type: "text",
      placeholder: "Enter Your Name",
      errorMessage: "It should be a valid Name",
      label: "Name",
      required: true,
    },
    {
      id: 5,
      name: "age",
      type: "number",
      placeholder: "minimum age 12",
      min: "12",
      errorMessage: "minimum age must be 12",
      label: "Age",
      required: true,
    },
    {
      id: 6,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8 - 20 characters and include atleast 1 letter, 1 number and 1 special character",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 7,
      name: "state",
      type: "text",
      placeholder: "Enter you State",
      errorMessage: "enter your state",
      label: "State",
      required: true,
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();
    const userExists = userData?.find((item) => item.email === values.email);

    if (!userExists) {
      dispatch(addUser(values))
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      toast.success("User added successfully");
      return;
    }
    if (userExists) {
      toast.warn("User already exists");
      navigate("/login");
      return;
    }
  };

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  const onChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div>
      <ToastContainer />
      <div className="__register_form__">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          {inputs?.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
          <button>Submit</button>
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            Have an account{" "}
            <Link
              to="/login"
              style={{ textDecoration: "underline", color: "blue" }}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
