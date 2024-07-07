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
import Loading from "../Loading/Loading";

function MonsterSelectionOne() {
  const [monsterList, setMonsterList] = useState([]);
  const [selectedMonsterList, setSelectedMonsterList] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const difficultCR = location.state || {};

  const totalCRRemaining =
    difficultCR -
    selectedMonsterList.reduce((accumulator, monster) => {
      return accumulator + monster.cr;
    }, 0);
  const bossCR = calculateBoss(difficultCR);
  const swarmCR = calculateMinion(difficultCR);
  const oneCR = calculateOne(difficultCR);

  console.log(monsterList);

  useEffect(() => {
    const formatedCR = {
      cr: difficultCR,
    };
    console.log(formatedCR);
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
  }, []);

  const handleOneMonsterSubmit = () => {
    const formatedCR = {
      cr: difficultCR,
    };
    console.log(formatedCR);
    const fetchMonster = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8080/monsters/filtered`,
          formatedCR
        );
        setMonsterList(response.data);
      } catch (e) {
        console.error("error getting item data:", e);
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
  };

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
    <main className="app-window">
      <section className="monster-selected">
        <h1 className="monster-selected__title">Select Monster</h1>
        {loading && (
          <div className="loading">
            <p>Loading</p>
            <Loading />
          </div>
        )}
        <section className="monster-selected__container">
          {monsterList.map((element, index) => {
            return (
              <div
                className="monster-selected__card"
                key={index}
                onClick={() => handleClick(index)}
              >
                {element.image.monsterImage ? (
                  <img
                    className="monster-selected__card-image"
                    src={element.image.monsterImage}
                    alt={element.name}
                  />
                ) : (
                  <img
                    className="monster-selected__card-image-default"
                    src={fangsIcon}
                    alt="Default"
                  />
                )}

                <div className="monster-selected__card-info-block">
                  <h2 className="monster-selected__card-info bold">
                    {element.name}
                  </h2>
                  <p className="monster-selected__card-info">
                    CR: {element.cr}
                  </p>
                  <p className="monster-selected__card-info">Environments:</p>
                  <p className="monster-selected__card-info">
                    {element.environments.join(", ")}
                  </p>
                </div>
              </div>
            );
          })}
        </section>
        <section className="monster-lists">
          <h1 className="monster-lists__title">My Monster</h1>

          <div className="selected-monster">
            {selectedMonsterList.map((element, index) => (
              <div className="selected-monster__card" key={index}>
                <div className="selected-monster__card-body">
                  <div className="selected-monster__card-info-main">
                    {element.image.monsterImage ? (
                      <img
                        className="monster-selected__card-image"
                        src={element.image.monsterImage}
                        alt={element.name}
                      />
                    ) : (
                      <img
                        className="monster-selected__card-image-default"
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
                      <p className="monster-selected__card-info">
                        Environments:
                      </p>
                      <p className="monster-selected__card-info">
                        {element.environments.join(", ")}
                      </p>
                    </div>
                    <img
                      className="selected-monster__card-delete-button"
                      src={deleteIcon}
                      onClick={() => removeSelectedMonster(index)}
                    />
                  </div>
                  {/* <div className="selected-monster__card-buttons">
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
            ))}
          </div>
          <Link
            className="monster-lists__button-link"
            to="/monsterlist"
            state={selectedMonsterList}
          >
            <div className="monster-lists__button">
              <p className="monster-lists__button-select" type="submit">
                View Statblock
              </p>
            </div>
          </Link>
        </section>
      </section>
    </main>
  );
}

export default MonsterSelectionOne;
