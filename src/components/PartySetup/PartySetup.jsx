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
  console.log(partyMembers);

  let handleChange = (i, e) => {
    let newPartyValues = [...partyMembers];
    newPartyValues[i][e.target.name] =
      e.target.name === "level" ? parseInt(e.target.value, 10) : e.target.value;

    setPartyMembers(newPartyValues);
  };

  // let handleSubmit = (event) => {
  //   event.preventDefault();
  //   async function updateInventoryItem() {
  //     try {
  //       const res = await axios.post(
  //         `http://localhost:8080/monsters/filtered`,
  //         difficultCR
  //       );
  //     } catch (error) {
  //       console.error("error caught in the catch block:", error);
  //     }
  //   }
  //   updateInventoryItem();
  // };
  return (
    <section className="party-setup">
      <h1 className="party-setup__title">Adventuring Party</h1>

      <form className="party-setup__form" /*onSubmit={handleSubmit}*/>
        {partyMembers.map((element, index) => (
          <div className="party-setup__member" key={index}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={element.name}
              onChange={(e) => handleChange(index, e)}
            />
            <label>Level</label>
            <input
              type="number"
              name="level"
              value={element.level}
              onChange={(e) => handleChange(index, e)}
            />
          </div>
        ))}
        <Link
          className="party-setup__form-button-link"
          to="/monsterselect"
          state={difficultCR}
        >
          <div className="party-setup__form-button">
            <button className="button submit" type="submit">
              Submit
            </button>
          </div>
        </Link>
      </form>
    </section>
  );
}

export default PartySetupComponent;
