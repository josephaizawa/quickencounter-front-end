import "../MonsterSelection/MonsterSelection.scss";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { calculateBoss, calculateMinion } from "../../utils/calculators";

function MonsterSelectionComponent() {
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

  const handleBossAndMinionSubmit = () => {
    const formatedCR = {
      cr: bossCR,
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

  let handleCRPlus = (i, e) => {
    let newMonsterListValues = [...selectedMonsterList];
    newMonsterListValues[index] = {
      ...newMonsterListValues[index],
      cr: newMonsterListValues[index].cr + 1, // Increment the cr value
    };

    setSelectedMonsterList(newMonsterListValues);
  };

  let removeSelectedMonster = (i) => {
    let newSelectedMonsterList = [...selectedMonsterList];
    newSelectedMonsterList.splice(i, 1);
    setSelectedMonsterList(newSelectedMonsterList);
    let newSelectedMonster = selectedMonsterList[i];
    const remainingCR = totalCRRemaining + newSelectedMonster.cr;
    console.log(remainingCR);
    if (remainingCR > swarmCR) {
      handleBossAndMinionSubmit();
    } else if (remainingCR >= swarmCR) {
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

  //   let handleSubmit = (event) => {
  //     event.preventDefault();
  //     async function updateInventoryItem() {
  //       try {
  //         const res = await axios.post(
  //           `http://localhost:8080/monsters/filtered`,
  //           difficultCR
  //         );
  //       } catch (error) {
  //         console.error("error caught in the catch block:", error);
  //       }
  //     }
  //     updateInventoryItem();
  //   };
  return (
    <section className="monster-select">
      <h1 className="monster-select__encounter-type-title">
        Select Encounter Type
      </h1>
      <div className="monster-select__encounter-type-options">
        <button
          className="monster-select__encounter-type-button"
          type="submit"
          onClick={() => handleBossAndMinionSubmit()}
        >
          Boss & Minions
        </button>
        <button
          className="monster-select__encounter-type-button"
          type="submit"
          onClick={() => handleSwarmSubmit()}
        >
          Swarm
        </button>
        <button
          className="monster-select__encounter-type-button"
          type="submit"
          onClick={() => handleOneMonsterSubmit()}
        >
          One Monster
        </button>
      </div>
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
            <p className="monster-select__card-cr">{element.cr}</p>
          </div>
        ))}
      </section>
      <section className="monster-list">
        <h1 className="monster-list__title">Monsters</h1>
        <div className="monster-list__container">
          {selectedMonsterList.map((element, index) => (
            <div
              className="selected-monster__card"
              key={index}
              onClick={() => removeSelectedMonster(index)}
            >
              <h2 className="selected-monster__card-name">{element.name}</h2>
              <p className="selected-monster__card-cr">{element.cr}</p>
              <button
                className="monster-select__decrease-button"
                type="submit"
                onClick={(e) => handleCRChange(index, e)}
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
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default MonsterSelectionComponent;
