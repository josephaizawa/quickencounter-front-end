import React from "react";
import "../EditProfile/EditProfile.scss";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";

import BackButton from "../BackButton/BackButton";
import RestartButton from "../RestartButton/RestartButton";

import axios from "axios";

const EditProfile = ({ setIsEditing }) => {
  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address: "",
    role: "",
  });
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const blankFieldNotification = (type) => {
    api[type]({
      message: "Field Blank",
      description:
        "Email is a required field. Please make sure you've added an Email.",
    });
  };

  const emailNotification = (type) => {
    api[type]({
      message: "Not a valid email",
      description: "Please enter a valid email address.",
    });
  };

  let handleUserChange = (e) => {
    let { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const isFormValid = () => {
    const emailPattern =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

    const isEmailValid = () => {
      if (emailPattern.test(user.email)) {
        return true;
      } else {
        emailNotification("error");
        return false;
      }
    };

    if (!user.email) {
      blankFieldNotification("error");
      return false;
    }
    if (!isEmailValid()) {
      return false;
    }
    return true;
  };

  useEffect(() => {
    const loadData = async () => {
      const token = sessionStorage.getItem("token");

      try {
        const { data } = await axios.get(
          "http://localhost:8080/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      try {
        const response = await axios.put(
          "http://localhost:8080/users/edituser",
          user
        );
        setIsEditing(false);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      {contextHolder}
      <div className="signup-background">
        <main className="signup__app-window">
          <nav className="nav">
            <BackButton />
            <RestartButton />
          </nav>
          <h1 className="signup-form__title">Edit Profile</h1>
          <form className="signup-form" onSubmit={handleSubmit}>
            <section className="signup-form__fields">
              <label className="signup-form__lable">
                First Name:
                <input
                  className="signup-form__input"
                  type="text"
                  name="first_name"
                  onChange={handleUserChange}
                  value={user.first_name}
                />
              </label>
              <label className="signup-form__lable">
                Last Name:
                <input
                  className="signup-form__input"
                  type="text"
                  name="last_name"
                  onChange={handleUserChange}
                  value={user.last_name}
                />
              </label>
              <label className="signup-form__lable">
                Email:
                <input
                  className="signup-form__input"
                  type="text"
                  name="email"
                  onChange={handleUserChange}
                  value={user.email}
                />
              </label>
              <label className="signup-form__lable">
                Phone:
                <input
                  className="signup-form__input"
                  type="text"
                  name="phone"
                  onChange={handleUserChange}
                  value={user.phone}
                />
              </label>
              <label className="signup-form__lable">
                Address:
                <input
                  className="signup-form__input"
                  type="text"
                  name="address"
                  onChange={handleUserChange}
                  value={user.address}
                />
              </label>
            </section>
            <button className="signup-form__submit" type="submit">
              Save
            </button>
          </form>
        </main>
      </div>
    </>
  );
};

export default EditProfile;
