import "./App.css";
import { ChartComponent } from "./EnergyStorageGraph";

function App() {
  return (
    <div className="App">
      <header className="App-header"></header>
      <body className="App-body">
        <div className="Split-Screen">
          <div id="leftSide">
            <h1>Graphs for energy stuff</h1>
            <div id="chartsContainer">
              <ChartComponent />
              <ChartComponent />
              <ChartComponent />
            </div>
          </div>
          <div id="rightSide">
            <div id="eventLogContainer">
              <h2>Event Log</h2>
              <div id="eventsAndAnomalies"></div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
}

export default App;
