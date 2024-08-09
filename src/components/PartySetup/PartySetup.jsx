import "../PartySetup/PartySetup.scss";
import { useState, useEffect } from "react";
import { calculateDifficultCR } from "../../utils/calculators";
import axios from "axios";
import { Link } from "react-router-dom";
import { notification } from "antd";
import BackButton from "../BackButton/BackButton";
import RestartButton from "../RestartButton/RestartButton";
import ProfileButton from "../ProfileButton/ProfileButton";

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
  const [partyInfo, setPartyInfo] = useState({
    name: "Party Name",
    level: 1,
  });
  const [api, contextHolder] = notification.useNotification();

  const blankFieldNotification = (type) => {
    api[type]({
      message: "Field Blank",
      description:
        "Name and level are required fields. Please make sure you've filled out all fields.",
    });
  };

  const totalPartyLevel = partyMembers.reduce((accumulator, partyMember) => {
    return accumulator + partyMember.level;
  }, 0);

  const totalPartyMembers = partyMembers.length;

  const difficultCR = calculateDifficultCR(totalPartyLevel, totalPartyMembers);

  useEffect(() => {
    const fetchPartyData = async () => {
      const userId = sessionStorage.getItem("userId");
      const partyId = sessionStorage.getItem("partyId");

      if (!partyId) {
        setPartyInfo(null);
        setPartyMembers([]);
        return;
      }

      try {
        const response1 = await axios.post(
          "http://localhost:8080/party/individual",
          { id: userId }
        );

        const party = response1.data;

        if (party && party.id) {
          const response2 = await axios.post(
            "http://localhost:8080/party/members",
            { id: party.id }
          );
          const members = response2.data;

          setPartyInfo(party);
          setPartyMembers(members);

          sessionStorage.setItem("partyId", party.id);
        } else {
          setPartyInfo(null);
          setPartyMembers([]);
        }
      } catch (error) {
        console.error("Error fetching party data:", error);
      }
    };

    fetchPartyData();
  }, []);

  let handlePartyMemberChange = (i, e) => {
    let newPartyValues = [...partyMembers];
    newPartyValues[i][e.target.name] =
      e.target.name === "level" ? parseInt(e.target.value, 10) : e.target.value;

    setPartyMembers(newPartyValues);
  };

  let handlePartyNameChange = (e) => {
    setPartyInfo((prevPartyInfo) => ({
      ...prevPartyInfo,
      [e.target.name]: e.target.value,
    }));
  };

  let handlePartyLevelChange = (e) => {
    const newLevel = parseInt(e.target.value, 10);

    setPartyInfo((prevPartyInfo) => ({
      ...prevPartyInfo,
      [e.target.name]: newLevel,
    }));

    const updatedMembers = partyMembers.map((member) => ({
      ...member,
      level: newLevel,
    }));

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

  const isFormValid = () => {
    if (!partyInfo.name || !partyInfo.level) {
      blankFieldNotification("error");
      return false;
    }

    for (const member of partyMembers) {
      if (!member.name || !member.level) {
        blankFieldNotification("error");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = sessionStorage.getItem("userId");

    const newParty = {
      user_id: userId,
      ...partyInfo,
      members: partyMembers,
    };

    if (isFormValid()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/party/addparty",
          newParty
        );

        const party = response.data;

        sessionStorage.setItem("partyId", party.id);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      {contextHolder}
      <div className="party-background">
        <main className="party-setup__app-window">
          <nav className="nav">
            <BackButton />
            <ProfileButton />
            <RestartButton />
          </nav>
          <form className="party-setup" onSubmit={handleSubmit}>
            <header className="party-setup__header">
              <h1 className="party-setup__title">Adventuring Party</h1>

              <div className="party-setup__info">
                <label className="party-setup__lable">
                  Name&nbsp;&nbsp;
                  <input
                    className="party-setup__input"
                    type="text"
                    name="name"
                    value={partyInfo.name}
                    onChange={(e) => handlePartyNameChange(e)}
                  />
                </label>
                <label className="party-setup__lable">
                  Level&nbsp;&nbsp;
                  <input
                    className="party-setup__input"
                    type="number"
                    name="level"
                    value={partyInfo.level}
                    onChange={(e) => handlePartyLevelChange(e)}
                  />
                </label>
              </div>
            </header>
            <section className="party-setup-cr">
              <p className="party-setup-cr__title">Total Challenge Rating:</p>
              <p className="party-setup-cr__value">{difficultCR}</p>
            </section>
            <section className="party-setup__form">
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
              <button className="party-setup__form-save-button" type="submit">
                Save
              </button>
              <Link
                className="party-setup__form-button-link"
                to="/monsterselect"
                state={{ difficultCR, totalPartyMembers }}
              >
                <div className="party-setup__form-button">
                  <p className="party-setup__form-button-next">Next</p>
                </div>
              </Link>
            </section>
          </form>
        </main>
      </div>
    </>
  );
}

export default PartySetupComponent;
