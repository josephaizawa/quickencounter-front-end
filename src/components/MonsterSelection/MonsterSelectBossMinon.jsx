import "../MonsterSelection/MonsterSelectionOptions.scss";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { calculateBoss, calculateMinion } from "../../utils/calculators";
import { Link } from "react-router-dom";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import fangsIcon from "../../assets/images/fangs.svg";
import Loading from "../Loading/Loading";
import BackButton from "../BackButton/BackButton";
import RestartButton from "../RestartButton/RestartButton";

const baseURL = import.meta.env.VITE_API_URL;

function MonsterSelectionBossMinions() {
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
  };

  const handleSwarmSubmit = () => {
    const formatedCR = {
      cr: swarmCR,
    };

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
    <main className="app-window">
      <section className="monster-selected">
        <div className="monster-selected__header">
          <BackButton />
          <h1 className="monster-selected__title">Select Monster</h1>
          <RestartButton />
        </div>
        <section className="monster-selected__container">
          {loading && <Loading />}
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
                  {/* <div className="selected-monster__card-buttons"> // for editing cr
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
                View Statblocks
              </p>
            </div>
          </Link>
        </section>
      </section>
    </main>
  );
}

export default MonsterSelectionBossMinions;
