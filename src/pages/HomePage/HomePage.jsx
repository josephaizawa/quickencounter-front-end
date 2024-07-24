import "../HomePage/HomePage.scss";
import StartScreenComponent from "../../components/StartScreen/StartScreen";
import Fireflies from "../../components/Fireflies/Fireflies";

function HomePage() {
  return (
    <div className="home-background">
      <Fireflies quantity={15} />
      <StartScreenComponent />
    </div>
  );
}
export default HomePage;
