import React, { useState } from "react";
import { useDispatch } from "react-redux";

const RegisterUser = () => {
  const dispatch = useDispatch();

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
      plaeholder: "Username",
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
      plaeholder: "Email",
      errorMessage: "It should be a valid email address",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "phone",
      type: "text",
      plaeholder: "Enter phone number",
      errorMessage: "It should be a valid phone number",
      pattern: "^d{10}$",
      label: "Phone Number",
      required: true,
    },
    {
      id: 4,
      name: "name",
      type: "text",
      plaeholder: "Enter Your Name",
      errorMessage: "It should be a valid Name",
      label: "Name",
      required: true,
    },
    {
      id: 5,
      name: "age",
      type: "number",
      plaeholder: "minimum age 12",
      min: "12",
      errorMessage: "minimum age must be 12",
      label: "Age",
      required: true,
    },
    {
      id: 6,
      name: "password",
      type: "password",
      plaeholder: "Password",
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
      plaeholder: "Enter you State",
      errorMessage: "enter your state",
      label: "State",
      required: true,
    },
  ];
  return (
    <div>
      <h1>user</h1>
    </div>
  );
};

export default RegisterUser;
