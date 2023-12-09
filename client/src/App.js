import "./App.css";
import { ConsumptionGraph } from "./ConsumptionGraph";
import { ChartComponent2 } from "./Graph2";
import { ChartComponent3 } from "./Graph3";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Binary Buccaneers' App</h1>
        <div id="nav-bar">
          <a href="index.html">Switch between views</a>
          <a href="description.html">Description</a>
          <a href="video.html">Video Presentation</a>
        </div>
      </header>
      <div className="Split-Screen">
        <div id="left-side">
          <h2>Graphs for energy stuff</h2>
          <div id="charts-container">
            <ConsumptionGraph />
            <ChartComponent2 />
            <ChartComponent3 />
          </div>
        </div>
        <div id="right-side">
          <div id="events-container">
            <h2>Event Log</h2>
            <div id="events-and-anomalies"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
