import "../StartScreen/StartScreen.scss";
import { useState, useEffect } from "react";
import { calculateDifficultCR } from "../../utils/calculators";
import axios from "axios";
import { Link } from "react-router-dom";

function StartScreenComponent() {
  return (
    <main className="start-screen">
      <h1 className="start-screen__title">Welcome to QuickEncounter</h1>
      <p className="start-screen__description">
        The easy way to create a challenging D&D encounter on the fly!
      </p>
      <p className="start-screen__instruction">click start to begin</p>
      <section className="start-screen__section" /*onSubmit={handleSubmit}*/>
        <Link className="start-screen__button-link" to="/party">
          <div className="start-screen__button">
            <button className="start-screen__button-start" type="submit">
              Start
            </button>
          </div>
        </Link>
      </section>
    </main>
  );
}

export default StartScreenComponent;
