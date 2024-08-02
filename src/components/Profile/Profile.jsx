import "../Profile/Profile.scss";
// import useNotifications from "../Notifications/PasswordValidation";
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { notification } from "antd";
// import React from "react";
import BackButton from "../BackButton/BackButton";
import RestartButton from "../RestartButton/RestartButton";
import editButton from "../../assets/icons/edit-24px.svg";
import axios from "axios";
import EditProfile from "../EditProfile/EditProfile";

function ProfileComponent() {
  const [user, setUser] = useState(null);
  const [failedAuth, setFailedAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [api, contextHolder] = notification.useNotification();

  const blankFieldNotification = (type) => {
    api[type]({
      message: "Field Blank",
      description: "Please make sure you've added an Email.",
    });
  };

  const emailNotification = (type) => {
    api[type]({
      message: "Not a valid email",
      description: "Please enter a valid email address.",
    });
  };

  const successNotification = (type) => {
    api[type]({
      message: "Welcome to QuickEncounter",
      description: "You have signed up successfully.",
    });
  };

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);

    const isFormValid = () => {
      const emailPattern =
        /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

      const isEmailValid = () => {
        if (emailPattern.test(email)) {
          return true;
        } else {
          emailNotification("error");
          return false;
        }
        return true;
      };

      // TO DO: Check if the fields are all filled
      if (!email) {
        blankFieldNotification("error");
        return false;
      }
      if (!isEmailValid()) {
        // openNotificationWithIcon("error");
        return false;
      }
      return true;
    };
  };
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
  }, [isEditing]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Here send a POST request to signupUrl with username, name and password data
    if (isFormValid()) {
      successNotification("success");
      try {
        const response = await axios.post(
          "http://localhost:8080/users/signup",
          {
            email: email,
            password: password,
          }
        );
        console.log(response.data);
        setIsSignedUp(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = () => {
    console.log("button clicked");
    setIsEditing(true);
  };

  const renderEdit = () => (
    <div>
      <EditProfile setIsEditing={setIsEditing} />
    </div>
  );
  if (isEditing) return renderEdit();
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
            <div className="profile__info-header">
              <h2 className="profile__title">My Profile</h2>
              <img src={editButton} onClick={handleEdit} />
            </div>
            <section className="profile__fields">
              <p className="profile__lable">First Name: {user.first_name}</p>
              <p className="profile__lable">Last Name: {user.last_name}</p>
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
