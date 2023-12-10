import "./App.css";
import { ConsumptionGraph } from "./components/ConsumptionGraph";
import { StorageAndSurplusGraph } from "./components/StorageAndSurplusGraph";

function App() {
  return (
    <div className="App">
      <div id="page-container">
        <div id="content-wrap">
          <header className="App-header">
            <div className="logo-and-name">
              <img
                src="/logo192.png"
                className="App-logo"
                alt="logo"
                id="logo"
              />
              <h1>Penguin Pilot</h1>
            </div>
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
                <StorageAndSurplusGraph />
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
        <footer id="footer">
          <p>Made by the Binary Buccaneers for the 2023 ABB Marine Hackathon</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
