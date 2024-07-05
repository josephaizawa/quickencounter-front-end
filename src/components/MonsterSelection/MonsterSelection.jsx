import "../MonsterSelection/MonsterSelection.scss";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { calculateBoss, calculateMinion } from "../../utils/calculators";
import { Link } from "react-router-dom";

function MonsterSelectionComponent() {
  const [monsterList, setMonsterList] = useState([]);
  const [selectedMonsterList, setSelectedMonsterList] = useState([]);
  const location = useLocation();
  const difficultCR = location.state || {};

  return (
    <main className="app-window">
      <section className="monster-select">
        <h1 className="monster-select__title">Select Encounter Type</h1>
        <div className="monster-select__options">
          <Link
            className="monster-select__button-link"
            to="/monsterselectboss"
            state={difficultCR}
          >
            <div className="monster-select__button">
              <p className="monster-select__button-next">Boss & Minions</p>
            </div>
          </Link>
          <Link
            className="monster-select__button-link"
            to="/monsterselectswarm"
            state={difficultCR}
          >
            <div className="monster-select__button">
              <p className="monster-select__button-next">Swarm</p>
            </div>
          </Link>
          <Link
            className="monster-select__button-link"
            to="/monsterselectone"
            state={difficultCR}
          >
            <div className="monster-select__button">
              <p className="monster-select__button-next">One Monster</p>
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}

export default MonsterSelectionComponent;
