import "./App.css";
import { ChartComponent } from "./EnergyStorageGraph";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Binary Buccaneers' App</h1>
        <div id="navElements">
          <a href="description.html">Description</a>
        </div>
      </header>
      <div className="Split-Screen">
        <div id="leftSide">
          <h2>Graphs for energy stuff</h2>
          <div id="chartsContainer">
            <ChartComponent />
            <ChartComponent />
            <ChartComponent />
          </div>
        </div>
        <div id="rightSide">
          <div id="eventsContainer">
            <h2>Event Log</h2>
            <div id="eventsAndAnomalies"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
