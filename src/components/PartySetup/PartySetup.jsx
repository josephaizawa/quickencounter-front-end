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

  const difficultCR = calculateDifficultCR(totalPartyLevel);
  console.log(difficultCR);

  let handlePartyMemberChange = (i, e) => {
    let newPartyValues = [...partyMembers];
    newPartyValues[i][e.target.name] =
      e.target.name === "level" ? parseInt(e.target.value, 10) : e.target.value;

    setPartyMembers(newPartyValues);
  };

  // Left off here
  let handlePartyInfoChange = (e) => {
    let newPartyValues = [...partyInfo];
    newPartyValues[0][e.target.name] =
      e.target.name === "level" ? parseInt(e.target.value, 10) : e.target.value;

    let updatedMembers = partyMembers.map((member) => {
      // const memberLevel = e.target.value;
      console.log(memberLevel);
      const updatedMemberDetails = {
        ...member,
        level: e.target.value,
      };
      console.log(updatedMemberDetails);

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
    <main className="app-window">
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
                  onChange={(e) => handlePartyInfoChange(e)}
                />
              </label>
              <label className="party-setup__lable">
                Level&nbsp;&nbsp;
                <input
                  className="party-setup__input"
                  type="number"
                  name="level"
                  value={element.level}
                  onChange={(e) => handlePartyInfoChange(e)}
                />
              </label>
            </div>
          ))}
        </header>

        <form className="party-setup__form">
          <h1 className="party-setup__title">Adventurers</h1>
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
