import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import PartySetupComponent from "./components/PartySetup/PartySetup";
import MonsterSelectionComponent from "./components/MonsterSelection/MonsterSelection";
import MonsterStatBlock from "./components/MonsterStatBlock/MonsterStatBlock";
import MonsterSelectionBossMinions from "./components/MonsterSelection/MonsterSelectBossMinon";
import MonsterSelectionSwarm from "./components/MonsterSelection/MonsterSelectSwarm";
import MonsterSelectionOne from "./components/MonsterSelection/MonsterSelectOne";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="home" element={<Navigate to="/" />} />
          <Route path="/party" element={<PartySetupComponent />} />
          <Route
            path="/monsterselect"
            element={<MonsterSelectionComponent />}
          />
          <Route
            path="/monsterselectboss"
            element={<MonsterSelectionBossMinions />}
          />
          <Route
            path="/monsterselectswarm"
            element={<MonsterSelectionSwarm />}
          />
          <Route path="/monsterselectone" element={<MonsterSelectionOne />} />
          <Route path="/monsterlist" element={<MonsterStatBlock />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
