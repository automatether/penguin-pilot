import { useState } from "react";
import "./App.css";
import { ConsumptionGraph } from "./components/ConsumptionGraph";
import { StorageAndSurplusGraph } from "./components/StorageAndSurplusGraph";
import DataGrid, { DataGridEngine } from "./components/DataGrid";

function App() {
    const [latestDifference, setLatestDifference] = useState({
        difference: 0,
        current: 0,
        baseline: 0,
    });

    const handleSetDifference = (difference, current, baseline) => {
        setLatestDifference({
            difference: difference,
            current: current,
            baseline: baseline,
        });
    };
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
                                <ConsumptionGraph
                                    difference={latestDifference.difference}
                                    setDifferenceCallback={handleSetDifference}
                                />
                                <StorageAndSurplusGraph />
                            </div>
                        </div>
                        <div id="right-side">
                            <div id="events-container">
                                <h2>Key Data</h2>
                                <DataGrid
                                    data={[
                                        {
                                            label: "Consumption to baseline (MWh)",
                                            value: latestDifference.difference,
                                            warning:
                                                latestDifference.difference >=
                                                1000,
                                            good:
                                                latestDifference.difference <=
                                                -1000,
                                            extended: true,
                                        },
                                        {
                                            label: "Total consumption (MWh)",
                                            value: latestDifference.current,
                                            baseline: latestDifference.baseline,
                                        },
                                        {
                                            label: "Battery charge",
                                            value: "42 %",
                                        },
                                    ]}
                                />

                                <DataGridEngine
                                    data={[
                                        {
                                            label: "Engine 1",
                                            value: 80,
                                            baseline: 80,
                                        },
                                        {
                                            label: "Engine 2",
                                            value: 77,
                                            baseline: 80,
                                        },
                                        {
                                            label: "Engine 3",
                                            value: 95,
                                            baseline: 0,
                                        },
                                    ]}
                                    warning
                                />
                                <div id="events-and-anomalies"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer id="footer">
                    <p>
                        Made by the Binary Buccaneers for the 2023 ABB Marine
                        Hackathon
                    </p>
                </footer>
            </div>
        </div>
    );
}

export default App;
