import "../StartScreen/StartScreen.scss";

import { Link } from "react-router-dom";
import Footer from "../Footer/Footer";

function StartScreenComponent() {
  return (
    <>
      <section className="app-background">
        <main className="start-screen__app-window">
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
              <div className="signin-options">
                <div className="signin-options__container">
                  <h2 className="signin-options__title">
                    Don't have an account?
                  </h2>
                  <Link className="signin-options__button-link" to="/signin">
                    <div className="signin-options__button">
                      <p className="signin-options__button-start">Sign In</p>
                    </div>
                  </Link>
                </div>
                <div className="signin-options__container">
                  <h2 className="signin-options__title">
                    Already have an account?
                  </h2>
                  <Link className="signin-options__button-link" to="/login">
                    <div className="signin-options__button">
                      <p className="signin-options__button-start">Log in</p>
                    </div>
                  </Link>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </main>
      </section>
    </>
  );
}

export default StartScreenComponent;
