import React, { useEffect } from "react";
import "./Fireflies.scss";

const Fireflies = ({ quantity }) => {
  useEffect(() => {
    const container = document.querySelector(".firefly-container");

    // Clear existing fireflies
    container.innerHTML = "";

    for (let i = 0; i < quantity; i++) {
      const firefly = document.createElement("div");
      firefly.classList.add("firefly");
      container.appendChild(firefly);
    }
  }, [quantity]);

  return <div className="firefly-container"></div>;
};

export default Fireflies;
