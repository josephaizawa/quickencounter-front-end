import "../MonsterSelection/MonsterSelectionOptions.scss";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { calculateBoss, calculateMinion } from "../../utils/calculators";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import fangsIcon from "../../assets/images/fangs.svg";
import infoIcon from "../../assets/icons/infoicon.png";
import Loading from "../Loading/Loading";
import BackButton from "../BackButton/BackButton";
import RestartButton from "../RestartButton/RestartButton";
import AntLoading from "../AntLoading/AntLoading";

const baseURL = import.meta.env.VITE_API_URL;

function MonsterSelectionBossMinions() {
  const [monsterList, setMonsterList] = useState([]);
  const [selectedMonsterList, setSelectedMonsterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { difficultCR, totalPartyMembers } = location.state || {};

  const totalCRRemaining =
    difficultCR -
    selectedMonsterList.reduce((accumulator, monster) => {
      return accumulator + monster.cr;
    }, 0);
  const bossCR = calculateBoss(difficultCR);
  const swarmCR = calculateMinion(difficultCR, totalPartyMembers);

  useEffect(() => {
    const formatedCR = {
      cr: bossCR,
    };

    const fetchMonster = async () => {
      try {
        const response = await axios.post(
          `${baseURL}monsters/filtered`,
          formatedCR
        );

        setMonsterList(response.data);
        setLoading(false);
      } catch (e) {
        console.error("error getting item data:", e);
        setLoading(false);
      }
    };
    fetchMonster();
  }, []);

  const handleBossAndMinionSubmit = () => {
    const formatedCR = {
      cr: bossCR,
    };

    const fetchMonster = async () => {
      try {
        const response = await axios.post(
          `${baseURL}monsters/filtered`,
          formatedCR
        );
        setMonsterList(response.data);
        setLoading(false);
      } catch (e) {
        console.error("error getting item data:", e);
        setLoading(false);
      }
    };
    fetchMonster();
  };

  const handleSwarmSubmit = () => {
    const formatedCR = {
      cr: swarmCR,
    };

    const fetchMonster = async () => {
      try {
        const response = await axios.post(
          `${baseURL}monsters/filtered`,
          formatedCR
        );
        setMonsterList(response.data);
        setLoading(false);
      } catch (e) {
        console.error("error getting item data:", e);
        setLoading(false);
      }
    };
    fetchMonster();
  };

  let handleClick = (index) => {
    if (totalCRRemaining <= 0) {
      return;
    }
    let selectedMonster = monsterList[index];
    setSelectedMonsterList([...selectedMonsterList, selectedMonster]);

    const remainingCR = totalCRRemaining - selectedMonster.cr;

    if (remainingCR >= swarmCR) {
      setLoading(true);
      handleSwarmSubmit();
    } else if (remainingCR > 0) {
      const formatedCR = {
        cr: remainingCR,
      };
      setLoading(true);
      const fetchMonster = async () => {
        try {
          const response = await axios.post(
            `${baseURL}monsters/filtered`,
            formatedCR
          );
          setMonsterList(response.data);
          setLoading(false);
        } catch (e) {
          console.error("error getting item data:", e);
          setLoading(false);
        }
      };
      fetchMonster();
    }
  };

  //------------ code for editing CR --------
  // let handleCRPlus = (i, e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   let newMonsterListValues = [...selectedMonsterList];
  //   newMonsterListValues[i] = {
  //     ...newMonsterListValues[i],
  //     cr: newMonsterListValues[i].cr + 1,
  //   };

  //   setSelectedMonsterList(newMonsterListValues);
  // };
  // let handleCRMinus = (i, e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   let newMonsterListValues = [...selectedMonsterList];
  //   newMonsterListValues[i] = {
  //     ...newMonsterListValues[i],
  //     cr: newMonsterListValues[i].cr - 1,
  //   };

  //   setSelectedMonsterList(newMonsterListValues);
  // };

  let removeSelectedMonster = (i) => {
    let newSelectedMonsterList = [...selectedMonsterList];
    newSelectedMonsterList.splice(i, 1);
    setSelectedMonsterList(newSelectedMonsterList);
    let newSelectedMonster = selectedMonsterList[i];
    const remainingCR = totalCRRemaining + newSelectedMonster.cr;

    if (remainingCR > swarmCR) {
      setLoading(true);
      handleBossAndMinionSubmit();
    } else if (remainingCR >= swarmCR) {
      setLoading(true);
      handleSwarmSubmit();
    } else if (remainingCR > 0) {
      const formatedCR = {
        cr: remainingCR,
      };
      setLoading(true);
      const fetchMonster = async () => {
        try {
          const response = await axios.post(
            `http://localhost:8080/monsters/filtered`,
            formatedCR
          );
          setMonsterList(response.data);
          setLoading(false);
        } catch (e) {
          console.error("error getting item data:", e);
          setLoading(false);
        }
      };
      fetchMonster();
    }
  };

  return (
    <div className="selection-background">
      <main className="selection-app-window">
        <section className="monster-select">
          <nav className="nav">
            <BackButton />
            <RestartButton />
          </nav>
          <h1 className="monster-select__title">Select Monsters</h1>
          <section className="select-monster__container">
            {loading && <AntLoading />}
            {monsterList.map((element, index) => {
              return (
                <div
                  className="select-monster__card"
                  key={index}
                  onClick={() => handleClick(index)}
                >
                  <div className="select-monster__card-body">
                    <div className="select-monster__card-info-main">
                      {element.image.monsterImage ? (
                        <img
                          className="select-monster__card-image"
                          src={element.image.monsterImage}
                          alt={element.name}
                        />
                      ) : (
                        <img
                          className="select-monster__card-image-default"
                          src={fangsIcon}
                          alt="Default"
                        />
                      )}
                      <div className="select-monster__card-info-block">
                        <h2 className="select-monster__card-info bold">
                          {element.name}
                        </h2>
                        <p className="select-monster__card-info">
                          CR: {element.cr}
                        </p>
                        <p className="select-monster__card-info">
                          Environments:
                        </p>
                        <p className="select-monster__card-info">
                          {element.environments.join(", ")}
                        </p>
                      </div>
                      <div className="select-monster__card-buttons">
                        <Link
                          className="select-monster__button-link"
                          to="/monsterinfo"
                          state={{ element }}
                        >
                          <img
                            className="select-monster__card-delete-button"
                            src={infoIcon}
                          />
                        </Link>
                      </div>
                    </div>
                    {/* <div className="select-monster__card-buttons"> // for editing cr
                    <button
                      className="monster-select__decrease-button"
                      type="submit"
                      onClick={(e) => handleCRMinus(index, e)}
                    >
                      -
                    </button>
                    <button
                      className="monster-select__increase-button"
                      type="submit"
                      onClick={(e) => handleCRPlus(index, e)}
                    >
                      +
                    </button>
                  </div> */}
                  </div>
                </div>
              );
            })}
          </section>
          <section className="monster-list">
            <h1 className="monster-list__title">My Monsters</h1>

            <div className="selected-monster">
              {selectedMonsterList.map((element, index) => {
                console.log(element);
                return (
                  <div className="selected-monster__card" key={index}>
                    <div className="selected-monster__card-body">
                      <div className="selected-monster__card-info-main">
                        {element.image.monsterImage ? (
                          <img
                            className="selected-monster__card-image"
                            src={element.image.monsterImage}
                            alt={element.name}
                          />
                        ) : (
                          <img
                            className="selected-monster__card-image-default"
                            src={fangsIcon}
                            alt="Default"
                          />
                        )}
                        <div className="selected-monster__card-info-block">
                          <h2 className="selected-monster__card-info bold">
                            {element.name}
                          </h2>
                          <p className="selected-monster__card-info">
                            CR: {element.cr}
                          </p>
                          <p className="selected-monster__card-info">
                            Environments:
                          </p>
                          <p className="selected-monster__card-info">
                            {element.environments.join(", ")}
                          </p>
                        </div>
                        <div className="selected-monster__card-buttons">
                          <Link
                            className="selected-monster__button-link"
                            to="/monsterinfo"
                            state={{ element }}
                          >
                            <img
                              className="selected-monster__card-delete-button"
                              src={infoIcon}
                            />
                          </Link>
                          <img
                            className="selected-monster__card-delete-button"
                            src={deleteIcon}
                            onClick={() => removeSelectedMonster(index)}
                          />
                        </div>
                      </div>
                      {/* <div className="selected-monster__card-buttons"> // for editing cr
                    <button
                      className="monster-selected__decrease-button"
                      type="submit"
                      onClick={(e) => handleCRMinus(index, e)}
                    >
                      -
                    </button>
                    <button
                      className="monster-selected__increase-button"
                      type="submit"
                      onClick={(e) => handleCRPlus(index, e)}
                    >
                      +
                    </button>
                  </div> */}
                    </div>
                  </div>
                );
              })}
            </div>
            <Link
              className="monster-list__button-link"
              to="/monsterlist"
              state={selectedMonsterList}
            >
              <div className="monster-list__button">
                <p className="monster-list__button-select" type="submit">
                  View Statblocks
                </p>
              </div>
            </Link>
          </section>
        </section>
      </main>
    </div>
  );
}

export default MonsterSelectionBossMinions;
