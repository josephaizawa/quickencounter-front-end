import "../Login/Login.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import BackButton from "../BackButton/BackButton";
import RestartButton from "../RestartButton/RestartButton";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_URL;

function LoginComponent() {
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [api, contextHolder] = notification.useNotification();

  const navigate = useNavigate();

  const blankFieldNotification = (type) => {
    api[type]({
      message: "Field Blank",
      description: "Please make sure you've added an Email and Password.",
    });
  };

  const passwordNotification = (type) => {
    api[type]({
      message: "Password Error",
      description:
        "Please make sure your password is at least 8 characters long and contains a special character.",
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
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

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
    };
    const isPasswordValid = () => {
      const specialCharacters = /[!#$%&()*+,-./:;<=>?@[\\\]^_]/;

      if (password.length < 8) {
        passwordNotification("error");
        return false;
      }

      if (!specialCharacters.test(password)) {
        passwordNotification("error");
        return false;
      }

      return true;
    };

    if (!email || !password) {
      blankFieldNotification("error");
      return false;
    }

    if (!isPasswordValid()) {
      return false;
    }

    if (!isEmailValid()) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid()) {
      try {
        const response = await axios.post(`${baseURL}users/login`, {
          email: email,
          password: password,
        });

        console.log(response.data);

        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userId", response.data.userId);

        setIsLoggedIn(true);
        successNotification("success");
        navigate("/profile");
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
          <h1 className="signup-form__title">Log In</h1>
          <form className="signup-form" onSubmit={handleSubmit}>
            <section className="signup-form__fields">
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
                  className={`signup-form__input`}
                  type="password"
                  name="password"
                  onChange={handleChangePassword}
                  value={password}
                />
              </label>
            </section>
            <button className="signup-form__submit" type="submit">
              Log In
            </button>
          </form>
        </main>
      </div>
    </>
  );
}

export default LoginComponent;
