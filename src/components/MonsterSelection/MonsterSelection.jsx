import "../MonsterSelection/MonsterSelection.scss";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function MonsterSelectionComponent() {
  const [monsterList, setMonsterList] = useState([]);
  const [selectedMonsterList, setSelectedMonsterList] = useState([]);
  const location = useLocation();
  const difficultCR = location.state || {};

  useEffect(() => {
    const formatedCR = {
      cr: difficultCR,
    };
    console.log(formatedCR);
    const fetchFilteredMonsters = async () => {
      try {
        const response = await axios.post(
          `http://localhost:8080/monsters/filtered`,
          formatedCR
        );
        console.log(response.data.results);
        setMonsterList(response.data.results);
      } catch (e) {
        console.error("error getting item data:", e);
      }
    };
    fetchFilteredMonsters();
  }, []);

  if (!monsterList) {
    console.log(difficultCR);
    return <div>Loading..</div>;
  }

  let handleClick = (index) => {
    let selectedMonster = monsterList[index];
    setSelectedMonsterList([...selectedMonsterList, selectedMonster]);
  };

  // let handleClick = (i, e) => {
  //   let newMonsterList = [...selectedMonsterList];
  //   let selectedMonster = {
  //     name: e.target.name,
  //     cr: e.target.cr,
  //   };
  //   console.log(e);
  //   console.log(selectedMonster);
  //   newMonsterList.push(selectedMonster);
  //   setSelectedMonsterList(newMonsterList);
  // };

  let removeSelectedMonster = (i) => {
    let newSelectedMonster = [...selectedMonsterList];
    newSelectedMonster.splice(i, 1);
    setSelectedMonsterList(newSelectedMonster);
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
      <h1 className="monster-select__title">Select Monster</h1>
      <form className="monster-select__form" /*onSubmit={handleSubmit}*/>
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
        <div className="monster-select__form-button">
          <button className="button submit" type="submit">
            Submit
          </button>
        </div>
      </form>
      <section className="monster-list">
        <h1 className="monster-list__title">Monsters</h1>
        <div className="monster-list-container">
          {selectedMonsterList.map((element, index) => (
            <div
              className="selected-monster__card"
              key={index}
              onClick={() => removeSelectedMonster(index)}
            >
              <h2 className="selected-monster__card-name">{element.name}</h2>
              <p className="selected-monster__card-cr">{element.cr}</p>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}

export default MonsterSelectionComponent;
