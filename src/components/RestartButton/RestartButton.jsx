import React from "react";
import "../RestartButton/RestartButton.scss";
import { useNavigate } from "react-router-dom";
import shield from "../../assets/icons/shield.png";

const RestartButton = () => {
  const navigate = useNavigate();
  return (
    <div className="restart" onClick={() => navigate("/")}>
      <img className="restart-icon" src={shield} alt="restart button" />
      <p className="restart-text">RESTART</p>
    </div>
  );
};

export default RestartButton;
