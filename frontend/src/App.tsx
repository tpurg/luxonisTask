import { Flats } from "./components/Flats/Flats";
import { Navigation } from "./components/navigation/Navigation";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <h2 className="title">Scraped flats</h2>
      <Navigation />

      <div className="content">
        <Flats />
      </div>
    </div>
  );
};

export default App;
