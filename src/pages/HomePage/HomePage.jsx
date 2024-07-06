import "../HomePage/HomePage.scss";
import StartScreenComponent from "../../components/StartScreen/StartScreen";
import Fireflies from "../../components/Fireflies/Fireflies";

function HomePage() {
  return (
    <>
      <Fireflies quantity={15} />
      <StartScreenComponent />
    </>
  );
}
export default HomePage;
