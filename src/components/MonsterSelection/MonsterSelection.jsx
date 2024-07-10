import "../MonsterSelection/MonsterSelection.scss";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { calculateBoss, calculateMinion } from "../../utils/calculators";
import { Link } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import RestartButton from "../RestartButton/RestartButton";
import Footer from "../Footer/Footer";

function MonsterSelectionComponent() {
  const location = useLocation();
  const difficultCR = location.state || {};

  return (
    <main className="app-window">
      <nav className="nav">
        <BackButton />
        <RestartButton />
      </nav>
      <section className="monster-select">
        <h1 className="monster-select__title">Select Encounter Type</h1>
        <div className="monster-select__options">
          <Link
            className="monster-select__button-link"
            to="/monsterselectboss"
            state={difficultCR}
          >
            <p className="monster-select__button-next">Boss & Minions</p>
            <div className="monster-select__button boss"></div>
          </Link>
          <Link
            className="monster-select__button-link"
            to="/monsterselectswarm"
            state={difficultCR}
          >
            <p className="monster-select__button-next">Swarm</p>
            <div className="monster-select__button swarm"></div>
          </Link>
          <Link
            className="monster-select__button-link"
            to="/monsterselectone"
            state={difficultCR}
          >
            <p className="monster-select__button-next">One Monster</p>
            <div className="monster-select__button oneMonster"></div>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default MonsterSelectionComponent;
