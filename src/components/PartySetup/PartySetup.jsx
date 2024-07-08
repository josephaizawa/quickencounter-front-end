import "../PartySetup/PartySetup.scss";
import { useState, useEffect } from "react";
import { calculateDifficultCR } from "../../utils/calculators";
import axios from "axios";
import { Link } from "react-router-dom";

function PartySetupComponent() {
  const [partyMembers, setPartyMembers] = useState([
    {
      name: "Party Member 1",
      level: 1,
    },
    {
      name: "Party Member 2",
      level: 1,
    },
    {
      name: "Party Member 3",
      level: 1,
    },
    {
      name: "Party Member 4",
      level: 1,
    },
  ]);

  const totalPartyLevel = partyMembers.reduce((accumulator, partyMember) => {
    return accumulator + partyMember.level;
  }, 0);

  const difficultCR = calculateDifficultCR(totalPartyLevel);

  let handleChange = (i, e) => {
    let newPartyValues = [...partyMembers];
    newPartyValues[i][e.target.name] =
      e.target.name === "level" ? parseInt(e.target.value, 10) : e.target.value;

    setPartyMembers(newPartyValues);
  };

  return (
    <main className="app-window">
      <section className="party-setup">
        <h1 className="party-setup__title">Adventuring Party</h1>

        <form className="party-setup__form">
          {partyMembers.map((element, index) => (
            <div className="party-setup__member" key={index}>
              <label className="party-setup__lable">
                Name&nbsp;&nbsp;
                <input
                  className="party-setup__input"
                  type="text"
                  name="name"
                  value={element.name}
                  onChange={(e) => handleChange(index, e)}
                />
              </label>
              <label className="party-setup__lable">
                Level&nbsp;&nbsp;
                <input
                  className="party-setup__input"
                  type="number"
                  name="level"
                  value={element.level}
                  onChange={(e) => handleChange(index, e)}
                />
              </label>
            </div>
          ))}
          <Link
            className="party-setup__form-button-link"
            to="/monsterselect"
            state={difficultCR}
          >
            <div className="party-setup__form-button">
              <p className="party-setup__form-button-next">Next</p>
            </div>
          </Link>
        </form>
      </section>
    </main>
  );
}

export default PartySetupComponent;
