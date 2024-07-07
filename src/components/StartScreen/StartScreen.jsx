import "../StartScreen/StartScreen.scss";

import { Link } from "react-router-dom";

function StartScreenComponent() {
  return (
    <>
      <section className="app-background">
        <main className="app-window">
          <div className="start-screen">
            <h1 className="start-screen__title">Welcome to QuickEncounter</h1>
            <p className="start-screen__description">
              The easy way to create a challenging D&D encounter on the fly!
            </p>
            <p className="start-screen__instruction">Click start to begin</p>
            <section className="start-screen__section">
              <Link className="start-screen__button-link" to="/party">
                <div className="start-screen__button">
                  <p className="start-screen__button-start">Start</p>
                </div>
              </Link>
            </section>
          </div>
        </main>
      </section>
    </>
  );
}

export default StartScreenComponent;
