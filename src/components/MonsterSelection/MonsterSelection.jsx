import "../MonsterSelection/MonsterSelection.scss";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { calculateBoss, calculateMinion } from "../../utils/calculators";
import { Link } from "react-router-dom";

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

  // const handleBossAndMinionSubmit = () => {
  //   const formatedCR = {
  //     cr: bossCR,
  //   };
  //   console.log(formatedCR);
  //   const fetchMonster = async () => {
  //     try {
  //       const response = await axios.post(
  //         `http://localhost:8080/monsters/filtered`,
  //         formatedCR
  //       );
  //       setMonsterList(response.data.results);
  //     } catch (e) {
  //       console.error("error getting item data:", e);
  //     }
  //   };
  //   fetchMonster();
  // };

  // const handleOneMonsterSubmit = () => {
  //   const formatedCR = {
  //     cr: difficultCR,
  //   };
  //   console.log(formatedCR);
  //   const fetchMonster = async () => {
  //     try {
  //       const response = await axios.post(
  //         `http://localhost:8080/monsters/filtered`,
  //         formatedCR
  //       );
  //       setMonsterList(response.data.results);
  //     } catch (e) {
  //       console.error("error getting item data:", e);
  //     }
  //   };
  //   fetchMonster();
  // };

  // const handleSwarmSubmit = () => {
  //   const formatedCR = {
  //     cr: swarmCR,
  //   };
  //   console.log(formatedCR);
  //   const fetchMonster = async () => {
  //     try {
  //       const response = await axios.post(
  //         `http://localhost:8080/monsters/filtered`,
  //         formatedCR
  //       );
  //       setMonsterList(response.data.results);
  //     } catch (e) {
  //       console.error("error getting item data:", e);
  //     }
  //   };
  //   fetchMonster();
  // };

  // let handleClick = (index) => {
  //   if (totalCRRemaining <= 0) {
  //     return;
  //   }
  //   let selectedMonster = monsterList[index];
  //   setSelectedMonsterList([...selectedMonsterList, selectedMonster]);

  //   const remainingCR = totalCRRemaining - selectedMonster.cr;
  //   console.log(remainingCR);
  //   if (remainingCR >= swarmCR) {
  //     handleSwarmSubmit();
  //   } else if (remainingCR > 0) {
  //     const formatedCR = {
  //       cr: remainingCR,
  //     };
  //     const fetchMonster = async () => {
  //       try {
  //         const response = await axios.post(
  //           `http://localhost:8080/monsters/filtered`,
  //           formatedCR
  //         );
  //         setMonsterList(response.data.results);
  //       } catch (e) {
  //         console.error("error getting item data:", e);
  //       }
  //     };
  //     fetchMonster();
  //   }
  // };

  // let handleCRPlus = (i, e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   let newMonsterListValues = [...selectedMonsterList];
  //   newMonsterListValues[i] = {
  //     ...newMonsterListValues[i],
  //     cr: newMonsterListValues[i].cr + 1, // Increment the cr value
  //   };

  //   setSelectedMonsterList(newMonsterListValues);
  // };
  // let handleCRMinus = (i, e) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   let newMonsterListValues = [...selectedMonsterList];
  //   newMonsterListValues[i] = {
  //     ...newMonsterListValues[i],
  //     cr: newMonsterListValues[i].cr - 1, // Increment the cr value
  //   };

  //   setSelectedMonsterList(newMonsterListValues);
  // };

  // let removeSelectedMonster = (i) => {
  //   let newSelectedMonsterList = [...selectedMonsterList];
  //   newSelectedMonsterList.splice(i, 1);
  //   setSelectedMonsterList(newSelectedMonsterList);
  //   let newSelectedMonster = selectedMonsterList[i];
  //   const remainingCR = totalCRRemaining + newSelectedMonster.cr;
  //   console.log(remainingCR);
  //   if (remainingCR > swarmCR) {
  //     handleBossAndMinionSubmit();
  //   } else if (remainingCR >= swarmCR) {
  //     handleSwarmSubmit();
  //   } else if (remainingCR > 0) {
  //     const formatedCR = {
  //       cr: remainingCR,
  //     };
  //     const fetchMonster = async () => {
  //       try {
  //         const response = await axios.post(
  //           `http://localhost:8080/monsters/filtered`,
  //           formatedCR
  //         );
  //         setMonsterList(response.data.results);
  //       } catch (e) {
  //         console.error("error getting item data:", e);
  //       }
  //     };
  //     fetchMonster();
  //   }
  // };

  return (
    <section className="monster-select">
      <h1 className="monster-select__encounter-type-title">
        Select Encounter Type
      </h1>
      <div className="monster-select__encounter-type-options">
        <Link
          className="monster-list__button-link"
          to="/monsterselectboss"
          state={difficultCR}
        >
          <button
            className="monster-select__encounter-type-button"
            type="submit"
            // onClick={() => handleBossAndMinionSubmit()}
          >
            Boss & Minions
          </button>
        </Link>
        <Link
          className="monster-list__button-link"
          to="/monsterselectswarm"
          state={difficultCR}
        >
          <button
            className="monster-select__encounter-type-button"
            type="submit"
            // onClick={() => handleSwarmSubmit()}
          >
            Swarm
          </button>{" "}
        </Link>
        <Link
          className="monster-list__button-link"
          to="/monsterselectone"
          state={difficultCR}
        >
          <button
            className="monster-select__encounter-type-button"
            type="submit"
            // onClick={() => handleOneMonsterSubmit()}
          >
            One Monster
          </button>
        </Link>
      </div>
    </section>
  );
}

export default MonsterSelectionComponent;
