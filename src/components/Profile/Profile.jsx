import "../Profile/Profile.scss";
// import useNotifications from "../Notifications/PasswordValidation";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { notification } from "antd";
// import React from "react";
import BackButton from "../BackButton/BackButton";
import RestartButton from "../RestartButton/RestartButton";
import axios from "axios";

function ProfileComponent() {
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const token = sessionStorage.getItem("token");

      if (!token) {
        return setFailedAuth(true);
      }

      console.log(token);

      try {
        // Get the data from the API
        const { data } = await axios.get(
          "http://localhost:8080/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(data);
        setUser(data);
      } catch (error) {
        console.log(error);
        setFailedAuth(true);
      }
    };
    loadData();
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setUser(null);
    setFailedAuth(true);
  };

  if (failedAuth) {
    return (
      <>
        <div className="signup-background">
          <main className="signup__app-window">
            <nav className="nav">
              <BackButton />
              <RestartButton />
            </nav>
            <h1 className="signup-form__title">
              You must be logged in to see this page.
            </h1>
            <Link className="start-screen__button-link" to="/login">
              <div className="start-screen__button">
                <p className="start-screen__button-start">Log In</p>
              </div>
            </Link>
          </main>
        </div>
      </>
    );
  }

  if (!user) {
    return (
      <main className="Profile">
        <p>Loading...</p>
      </main>
    );
  }

  return (
    <>
      <div className="profile-background">
        <main className="profile__app-window">
          <nav className="nav">
            <BackButton />
            <RestartButton />
          </nav>
          <h1 className="profile__title">Profile</h1>
          <main className="profile">
            <h2 className="profile__welcome">
              Welcome back, {user.first_name} {user.last_name}
            </h2>
            <h2 className="profile__title">My Profile</h2>
            <section className="profile__fields">
              <p className="profile__lable">Email: {user.email}</p>
              <p className="profile__lable">Phone: {user.phone}</p>
              <p className="profile__lable">Address: {user.address}</p>
              <p className="profile__lable">You are a {user.role} </p>
            </section>
            <button className="profile__logout" onClick={handleLogout}>
              Log out
            </button>
          </main>
        </main>
      </div>
    </>
  );
}

export default ProfileComponent;
