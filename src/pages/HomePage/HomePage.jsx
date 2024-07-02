import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { baseUrl, apiKeyQuery } from "../../api/api.js";
import "../HomePage/HomePage.scss";
import MonsterStatBlock from "../../components/MonsterStatBlock/MonsterStatBlock.jsx";
import PartySetupComponent from "../../components/PartySetup/PartySetup.jsx";

function HomePage() {
  return (
    <>
      <PartySetupComponent />
    </>
  );
}
export default HomePage;
