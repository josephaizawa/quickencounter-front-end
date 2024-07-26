import "../MonsterSelection/MonsterSelectionOptions.scss";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  calculateBoss,
  calculateMinion,
  calculateOne,
} from "../../utils/calculators";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import fangsIcon from "../../assets/images/fangs.svg";
import infoIcon from "../../assets/icons/infoicon.png";
import Loading from "../Loading/Loading";
import BackButton from "../BackButton/BackButton";
import RestartButton from "../RestartButton/RestartButton";

const baseURL = import.meta.env.VITE_API_URL;

function MonsterSelectionOne() {
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

  useEffect(() => {
    const formatedCR = {
      cr: difficultCR,
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

  let handleClick = (index) => {
    if (totalCRRemaining <= 0) {
      return;
    }
    let selectedMonster = monsterList[index];
    setSelectedMonsterList([...selectedMonsterList, selectedMonster]);
  };

  //------------ code for editing CR --------
  //   let handleCRPlus = (i, e) => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     let newMonsterListValues = [...selectedMonsterList];
  //     newMonsterListValues[i] = {
  //       ...newMonsterListValues[i],
  //       cr: newMonsterListValues[i].cr + 1, // Increment the cr value
  //     };

  //     setSelectedMonsterList(newMonsterListValues);
  //   };
  //   let handleCRMinus = (i, e) => {
  //     e.preventDefault();
  //     e.stopPropagation();
  //     let newMonsterListValues = [...selectedMonsterList];
  //     newMonsterListValues[i] = {
  //       ...newMonsterListValues[i],
  //       cr: newMonsterListValues[i].cr - 1, // Increment the cr value
  //     };

  //     setSelectedMonsterList(newMonsterListValues);
  //   };

  let removeSelectedMonster = (i) => {
    let newSelectedMonsterList = [...selectedMonsterList];
    newSelectedMonsterList.splice(i, 1);
    setSelectedMonsterList(newSelectedMonsterList);
    let newSelectedMonster = selectedMonsterList[i];
    const remainingCR = totalCRRemaining + newSelectedMonster.cr;
  };

  return (
    <div className="selection-background">
      <main className="selection-app-window">
        <section className="monster-select">
          <div className="monster-select__header">
            <BackButton />
            <h1 className="monster-select__title">Select Monster</h1>
            <RestartButton />
          </div>
          <section className="select-monster__container">
            {loading && <Loading />}
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
            <h1 className="monster-list__title">My Monster</h1>

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

export default MonsterSelectionOne;
