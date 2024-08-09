import React from "react";
import "../ProfileButton/ProfileButton.scss";
import { useNavigate } from "react-router-dom";
import scrollIcon from "../../assets/icons/scroll.svg";

const ProfileButton = () => {
  const navigate = useNavigate();
  return (
    <div className="profile-button" onClick={() => navigate("/profile")}>
      <img className="profile-button-icon" src={scrollIcon} alt="back button" />
      <p className="profile-button-text">PROFILE</p>
    </div>
  );
};

export default ProfileButton;
