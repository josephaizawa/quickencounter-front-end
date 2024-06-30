import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { baseUrl, apiKeyQuery } from "../../api/api.js";
import "../HomePage/HomePage.scss";
import MonsterStatBlock from "../../components/MonsterStatBlock/MonsterStatBlock.jsx";
import PartySetupComponent from "../../components/PartySetup/PartySetup.jsx";

function HomePage() {
  // const [monsters, setMonsters] = useState(null);
  // const [selectedMonster, setSelectedMonster] = useState(null);
  // const { monsterName } = useParams();

  // useEffect(() => {
  //   const fetchMonsters = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://www.dnd5eapi.co/api/monsters/`
  //       );
  //       console.log(response);
  //       setMonsters(response.data);
  //     } catch (e) {
  //       console.error("error getting video data:", e);
  //     }

  //     try {
  //       const response = await axios.get(
  //         `https://www.dnd5eapi.co/api/monsters/aboleth`
  //       );
  //       console.log(response.data);
  //       setSelectedMonster(response.data);
  //     } catch (e) {
  //       console.error("error getting video data:", e);
  //     }
  //   };
  //   fetchMonsters();
  // }, []);

  // if (!selectedMonster) {
  //   return <div>Loading..</div>;
  // }

  // const filteredMonsters = monsters.filter(
  //   (monster) => monster.name !== selectedMonster.index
  // );
  return (
    <>
      {/* <Header /> */}
      <PartySetupComponent />
    </>
  );
}
export default HomePage;
