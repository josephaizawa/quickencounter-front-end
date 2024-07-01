import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage/HomePage";
import PartySetupComponent from "./components/PartySetup/PartySetup";
import MonsterSelectionComponent from "./components/MonsterSelection/MonsterSelection";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
