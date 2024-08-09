import "../MonsterSelection/MonsterSelection.scss";

import { useLocation, useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import RestartButton from "../RestartButton/RestartButton";
import ProfileButton from "../ProfileButton/ProfileButton";

function MonsterSelectionComponent() {
  const location = useLocation();
  const { difficultCR, totalPartyMembers } = location.state || {};

  return (
    <div className="encounter-background">
      <main className="encounter__app-window">
        <nav className="nav">
          <BackButton />
          <ProfileButton />
          <RestartButton />
        </nav>
        <section className="monster-select">
          <h1 className="monster-select__title">Select Encounter Type</h1>
          <div className="monster-select__options">
            <Link
              className="monster-select__button-link"
              to="/monsterselectboss"
              state={{ difficultCR, totalPartyMembers }}
            >
              <div className="monster-select__button boss"></div>
              <p className="monster-select__button-next">Boss & Minions</p>
            </Link>
            <Link
              className="monster-select__button-link"
              to="/monsterselectswarm"
              state={{ difficultCR, totalPartyMembers }}
            >
              <div className="monster-select__button swarm"></div>
              <p className="monster-select__button-next">Swarm</p>
            </Link>
            <Link
              className="monster-select__button-link"
              to="/monsterselectone"
              state={{ difficultCR, totalPartyMembers }}
            >
              <div className="monster-select__button oneMonster"></div>
              <p className="monster-select__button-next">One Monster</p>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MonsterSelectionComponent;
