import React from "react";
import Header from "../header/Header";
import "./LeftContainer.css";
import ShowPassword from "../assets/ShowPassword";
import { useState } from "react";
import { AiFillEye } from "react-icons/ai";

const LeftContainer = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    location: "",
  });
  const [error, setError] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevformData) => ({
      ...prevformData,
      [name]: value,
    }));
  };
  const handleonBlur = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      if (value.includes("_")) {
        setError((prevErrors) => ({
          ...prevErrors,
          email: "You cannot use an underscore",
        }));
      } else {
        setError((prevErrors) => ({
          ...prevErrors,
          email: "",
        }));
      }
    }

    if (name === "userName") {
      if (value.length < 5 || value.length > 10) {
        setError((prevErrors) => ({
          ...prevErrors,
          userName:
            "The minimum length should be 5 and maximum length should be 10",
        }));
      } else {
        setError((prevErrors) => ({
          ...prevErrors,
          userName: "",
        }));
      }
    }

    if (name === "phoneNumber") {
      if (value.length < 7 || value.length > 10) {
        setError((prevErrors) => ({
          ...prevErrors,
          phoneNumber: "Phone numbers should be between the length of 7 and 10",
        }));
      } else {
        setError((prevErrors) => ({
          ...prevErrors,
          phoneNumber: "",
        }));
      }
    }
  };

  const [submittedData, setSubmittedData] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    setError("");
    setSubmittedData(formData);
    setIsModalOpen(true);
  };
  return (
    <div className="left-container">
      <Header />
      <div className="form-container">
        <h2>Let's get you started</h2>
        <div className="form">
          <form className="form-details" onSubmit={handleSignUp}>
            <label className="labels" htmlFor="fullname">
              Full name
            </label>
            <br />
            <input
              type="text"
              name="fullName"
              placeholder="Ade Tiger"
              value={formData.fullName}
              onChange={handleChange}
              required
            ></input>
            <br />
            <label htmlFor="Username">Username</label>
            <br />
            <input
              type="text"
              name="userName"
              placeholder="username"
              minLength="5"
              maxLength="10"
              onBlur={handleonBlur}
              value={formData.userName}
              onChange={handleChange}
            ></input>
            <br />
            {error.userName && (
              <label style={{ color: "red" }}>{error.userName}</label>
            )}
            <br />
            <label htmlFor="Email address">Email address</label>
            <br />
            <input
              type="text"
              placeholder="yourname@email.com"
              name="email"
              value={formData.email}
              onBlur={handleonBlur}
              onChange={handleChange}
              required
            ></input>
            <br />
            {error.email && (
              <label style={{ color: "red" }}>{error.email}</label>
            )}
            <br />
            <label htmlFor="Phone number">Phone number</label>
            <br />
            <input
              type="number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onBlur={handleonBlur}
              onChange={handleChange}
              required
            ></input>
            <br />
            {error.phoneNumber && (
              <label style={{ color: "red" }}>{error.phoneNumber}</label>
            )}
            <br />
            <label htmlFor="password">Create password</label>
            <br />
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="........"
                name="password"
                minLength="8"
                maxLength="20"
                value={formData.password}
                onChange={handleChange}
                required
              ></input>
              <div className="unseen-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <AiFillEye /> : <ShowPassword />}
              </div>
            </div>
            <p className="password-desc">
              Password must contain a minimum of 8 characters
              <br />
              Password must contain at least one symbol e.g. @, !
            </p>
            <label id="location" htmlFor="Location">
              Location <p>(optional)</p>
            </label>
            <br />
            <input
              type="text"
              name="location"
              value={formData.location}
              placeholder="Select Location"
              onChange={handleChange}
            ></input>
            <br />
            <button type="submit" onSubmit={handleSignUp}>
              Sign Up
            </button>
            <br />
          </form>
          {isModalOpen && (
            <div className="modal-container">
              <div className="modal">
                <div className="submitted-data">
                  <h3>Submitted Form Data:</h3>
                  <p>Full Name: {submittedData.fullName}</p>
                  <p>Email: {submittedData.email}</p>
                  <p>Phone Number: {submittedData.phoneNumber}</p>
                  <p>Location: {submittedData.location}</p>
                </div>
                <h2>Thank you for Submission</h2>
                <button
                  className="close-btn"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
          <div className="footer">
            <p>Already a user?</p>
            <a href="/">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftContainer;
