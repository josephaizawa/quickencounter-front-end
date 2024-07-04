import "../MonsterSelection/MonsterSelection.scss";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { calculateBoss, calculateMinion } from "../../utils/calculators";
import { Link } from "react-router-dom";

function MonsterSelectionSwarm() {
  const [monsterList, setMonsterList] = useState([]);
  const [selectedMonsterList, setSelectedMonsterList] = useState([]);
  const location = useLocation();
  const difficultCR = location.state || {};

  const totalCRRemaining =
    difficultCR -
    selectedMonsterList.reduce((accumulator, monster) => {
      return accumulator + monster.cr;
    }, 0);
  const bossCR = calculateBoss(difficultCR);
  const swarmCR = calculateMinion(difficultCR);

  console.log(totalCRRemaining);

  useEffect(() => {
    const formatedCR = {
      cr: swarmCR,
    };
    console.log(formatedCR);
    const fetchMonster = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8080/monsters/filtered`,
          formatedCR
        );
        setMonsterList(response.data.results);
      } catch (e) {
        console.error("error getting item data:", e);
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
        setMonsterList(response.data.results);
      } catch (e) {
        console.error("error getting item data:", e);
      }
    };
    fetchMonster();
  };

  const handleSwarmSubmit = () => {
    const formatedCR = {
      cr: swarmCR,
    };
    console.log(formatedCR);
    const fetchMonster = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8080/monsters/filtered`,
          formatedCR
        );
        setMonsterList(response.data.results);
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

    const remainingCR = totalCRRemaining - selectedMonster.cr;
    console.log(remainingCR);
    if (remainingCR >= swarmCR) {
      handleSwarmSubmit();
    } else if (remainingCR > 0) {
      const formatedCR = {
        cr: remainingCR,
      };
      const fetchMonster = async () => {
        try {
          const response = await axios.post(
            `http://localhost:8080/monsters/filtered`,
            formatedCR
          );
          setMonsterList(response.data.results);
        } catch (e) {
          console.error("error getting item data:", e);
        }
      };
      fetchMonster();
    }
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
    console.log(remainingCR);
    if (remainingCR >= swarmCR) {
      handleSwarmSubmit();
    } else if (remainingCR > 0) {
      const formatedCR = {
        cr: remainingCR,
      };
      const fetchMonster = async () => {
        try {
          const response = await axios.post(
            `http://localhost:8080/monsters/filtered`,
            formatedCR
          );
          setMonsterList(response.data.results);
        } catch (e) {
          console.error("error getting item data:", e);
        }
      };
      fetchMonster();
    }
  };

  return (
    <section className="monster-select">
      <h1 className="monster-select__title">Select Monster</h1>
      <section
        className="monster-select__container" /*onSubmit={handleSubmit}*/
      >
        {monsterList.map((element, index) => (
          <div
            className="monster-select__card"
            key={index}
            onClick={() => handleClick(index)}
          >
            <h2 className="monster-select__card-name">{element.name}</h2>
            <p className="monster-select__card-cr">CR: {element.cr}</p>
            <p className="monster-select__card-environments">
              Environments: {element.environments.join(", ")}
            </p>
          </div>
        ))}
      </section>
      <section className="monster-list">
        <h1 className="monster-list__title">Monsters</h1>
        <Link
          className="monster-list__button-link"
          to="/monsterlist"
          state={selectedMonsterList}
        >
          <div className="monster-list__button">
            <button className="button submit" type="submit">
              Generate List
            </button>
          </div>
        </Link>
        <div className="monster-list__container">
          {selectedMonsterList.map((element, index) => (
            <div
              className="selected-monster__card"
              key={index}
              onClick={() => removeSelectedMonster(index)}
            >
              <h2 className="selected-monster__card-name">{element.name}</h2>
              <p className="selected-monster__card-cr">CR: {element.cr}</p>
              <p className="monster-select__card-environments">
                Environments: {element.environments.join(", ")}
              </p>
              {/* <button
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
              </button> */}
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default MonsterSelectionSwarm;
