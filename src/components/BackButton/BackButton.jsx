import React from "react";
import "../BackButton/BackButton.scss";
import { useNavigate } from "react-router-dom";
import backArrow from "../../assets/icons/back-arrow.png";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <div className="back-arrow" onClick={() => navigate(-1)}>
      <img className="back-arrow-icon" src={backArrow} alt="back button" />
      <p className="back-arrow-text">BACK</p>
    </div>
  );
};

export default BackButton;
