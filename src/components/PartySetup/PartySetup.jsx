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
  const [partyInfo, setPartyInfo] = useState([
    {
      name: "Party Name",
      level: 1,
    },
  ]);

  const totalPartyLevel = partyMembers.reduce((accumulator, partyMember) => {
    return accumulator + partyMember.level;
  }, 0);

  const totalPartyMembers = partyMembers.length;

  const difficultCR = calculateDifficultCR(totalPartyLevel, totalPartyMembers);

  let handlePartyMemberChange = (i, e) => {
    let newPartyValues = [...partyMembers];
    newPartyValues[i][e.target.name] =
      e.target.name === "level" ? parseInt(e.target.value, 10) : e.target.value;

    setPartyMembers(newPartyValues);
  };

  let handlePartyNameChange = (e) => {
    let newPartyValues = [...partyInfo];
    newPartyValues[0][e.target.name] =
      e.target.name === "level" ? parseInt(e.target.value, 10) : e.target.value;

    setPartyInfo(newPartyValues);
  };

  let handlePartyLevelChange = (e) => {
    let newPartyValues = [...partyInfo];
    newPartyValues[0][e.target.name] =
      e.target.name === "level" ? parseInt(e.target.value, 10) : e.target.value;

    let updatedMembers = partyMembers.map((member) => {
      const updatedMemberDetails = {
        ...member,
        level: parseInt(e.target.value, 10),
      };

      return updatedMemberDetails;
    });

    setPartyInfo(newPartyValues);
    setPartyMembers(updatedMembers);
  };

  let handleAddClick = (e) => {
    e.preventDefault();
    let newPartyMember = {
      name: "New Party Member",
      level: 1,
    };
    let newPartyList = [...partyMembers];
    newPartyList.push(newPartyMember);

    setPartyMembers(newPartyList);
  };

  let handleMinusClick = (e) => {
    e.preventDefault();

    let newPartyList = [...partyMembers];
    newPartyList.pop();

    setPartyMembers(newPartyList);
  };

  return (
    <div className="party-background">
      <main className="party-setup__app-window">
        <section className="party-setup">
          <header className="party-setup__header">
            <h1 className="party-setup__title">Adventuring Party</h1>
            {partyInfo.map((element) => (
              <div className="party-setup__info">
                <label className="party-setup__lable">
                  Name&nbsp;&nbsp;
                  <input
                    className="party-setup__input"
                    type="text"
                    name="name"
                    value={element.name}
                    onChange={(e) => handlePartyNameChange(e)}
                  />
                </label>
                <label className="party-setup__lable">
                  Level&nbsp;&nbsp;
                  <input
                    className="party-setup__input"
                    type="number"
                    name="level"
                    value={element.level}
                    onChange={(e) => handlePartyLevelChange(e)}
                  />
                </label>
              </div>
            ))}
          </header>
          <section className="party-setup-cr">
            <p className="party-setup-cr__title">Total Challenge Rating:</p>
            <p className="party-setup-cr__value">{difficultCR}</p>
          </section>
          <form className="party-setup__form">
            <h2 className="party-setup__form-title">Adventurers</h2>
            {partyMembers.map((element, index) => (
              <div className="party-setup__member" key={index}>
                <label className="party-setup__lable">
                  Name&nbsp;&nbsp;
                  <input
                    className="party-setup__input"
                    type="text"
                    name="name"
                    value={element.name}
                    onChange={(e) => handlePartyMemberChange(index, e)}
                  />
                </label>
                <label className="party-setup__lable">
                  Level&nbsp;&nbsp;
                  <input
                    className="party-setup__input"
                    type="number"
                    name="level"
                    value={element.level}
                    onChange={(e) => handlePartyMemberChange(index, e)}
                  />
                </label>
              </div>
            ))}
            <div className="party-setup__buttons">
              <button
                className="party-setup__decrease-button"
                type="submit"
                onClick={(e) => handleMinusClick(e)}
              >
                -
              </button>
              <button
                className="party-setup__increase-button"
                type="submit"
                onClick={(e) => handleAddClick(e)}
              >
                +
              </button>
            </div>
            <Link
              className="party-setup__form-button-link"
              to="/monsterselect"
              state={{ difficultCR, totalPartyMembers }}
            >
              <div className="party-setup__form-button">
                <p className="party-setup__form-button-next">Next</p>
              </div>
            </Link>
          </form>
        </section>
      </main>
    </div>
  );
}

export default PartySetupComponent;
