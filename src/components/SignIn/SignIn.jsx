import "../SignIn/SignIn.scss";
// import useNotifications from "../Notifications/PasswordValidation";
import { useState } from "react";
import { Link } from "react-router-dom";
import { notification } from "antd";
// import React from "react";

function SignInComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [openNotification, contextHolder] = useNotifications();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type) => () => {
    api[type]({
      message: "Notification Title",
      description:
        "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      showProgress: true,
      pauseOnHover,
      className: "custom-class",
      style: {
        width: 600,
      },
    });
  };

  // const openNotification = () => {
  //   api.open({
  //     message: "Notification Title",
  //     description:
  //       "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
  //     className: "custom-class",
  //     style: {
  //       width: 600,
  //     },
  //   });
  // };

  console.log(email);
  console.log(password);
  console.log(confirmPassword);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const isPasswordValid = () => {
    // TO DO: Check if the password is too short

    if (password.length < 8) {
      // openNotification("success", true);
      return false;
    }

    // TO DO: Check if password doesn't include
    // special character
    if (
      !password.includes(
        "!",
        "#",
        "$",
        "%",
        ",&",
        "(",
        ")",
        "*",
        "+",
        ",",
        "-",
        ".",
        "/",
        ":",
        ";",
        "<",
        "=",
        ">",
        "?",
        "@",
        "[",
        "]",
        "^",
        "_"
      )
    ) {
      // openNotification("success", true);
      return false;
    }

    return true;
  };

  const isConfirmPasswordValid = () => {
    // TO DO: Add logic to check if the PWs match.
    if (confirmPassword !== password) {
      return false;
    }
    return true;
  };

  const isFormValid = () => {
    // TO DO: Check if the fields are all filled
    if (!email || !password || !confirmPassword) {
      return false;
    }

    // Check if the password field is valid
    if (!isPasswordValid()) {
      return false;
    }
    // Check if the confirm password field is valid
    if (!isConfirmPasswordValid()) {
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isFormValid()) {
      // This is where we would make an axios request
      // to our backend to add the user to our database.
      alert("Signed up successfully");
    } else {
      openNotification("error");
      // alert("Failed to sign up, you have errors in your form");
    }
  };

  return (
    <>
      {contextHolder}
      <section className="app-background">
        <main className="app-window">
          <h1 className="signup-form__title">Sign Up</h1>
          <form className="signup-form" onSubmit={handleSubmit}>
            <label className="signup-form__lable">
              Email&nbsp;&nbsp;
              <input
                className="signup-form__input"
                type="text"
                name="email"
                onChange={handleChangeEmail}
                value={email}
              />
            </label>
            <label className="signup-form__lable">
              Password&nbsp;&nbsp;
              <input
                className={`signup-form__input ${
                  isPasswordValid() ? "" : "signup-form__input--invalid"
                }`}
                type="password"
                name="password"
                onChange={handleChangePassword}
                value={password}
              />
            </label>
            <label className="signup-form__lable">
              Confirm Password&nbsp;&nbsp;
              <input
                className="signup-form__input"
                type="password"
                name="confirmPassword"
                onChange={handleChangeConfirmPassword}
                value={confirmPassword}
              />
            </label>
            <button
              className="signup-form__submint"
              type="submit"
              // onClick={openNotification}
              // disabled={!isFormValid()}
            >
              Sign up
            </button>
          </form>
        </main>
      </section>
    </>
  );
}

export default SignInComponent;
