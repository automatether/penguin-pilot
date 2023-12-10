import React, { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    PointElement,
    LineElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import storageAndSurplusData from "../mockData/production_storage.json";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const downsampleData = (originalData, factor = 10) => {
    const result = [];
    for (let i = 0; i < originalData.length; i += factor) {
        const chunk = originalData.slice(i, i + factor);
        const average =
            chunk.reduce((sum, value) => sum + value, 0) / chunk.length;
        result.push(average);
    }
    return result;
};

const StorageAndSurplusGraph = () => {
    const totalPoints = 1000;
    const engineCount = storageAndSurplusData["engines running"];
    const [dynamicEngineCount, setDynamicEngineCount] = useState(
        Array.from({ length: 100 }, (_, index) => engineCount[index])
    );
    const energyProduction = storageAndSurplusData["energy production"];
    const [dynamicEnergyProduction, setDynamicEnergyProduction] = useState(
        Array.from({ length: 100 }, (_, index) => energyProduction[index])
    );
    const batteryPercentage = storageAndSurplusData["battery percentage"];
    const [dynamicBatteryPercentage, setDynamicBatteryPercentage] = useState(
        Array.from({ length: 100 }, (_, index) => batteryPercentage[index])
    );
    const labels = Array.from({ length: totalPoints }, (_, index) => index);

    useEffect(() => {
        const interval = setInterval(() => {
            setDynamicEngineCount((oldData) => {
                if (oldData.length >= totalPoints) {
                    clearInterval(interval);
                    return oldData;
                }
                const newDataPoint = engineCount[oldData.length];
                return [...oldData, newDataPoint];
            });
            setDynamicEnergyProduction((oldData) => {
                if (oldData.length >= totalPoints) {
                    clearInterval(interval);
                    return oldData;
                }
                const newDataPoint = energyProduction[oldData.length];
                return [...oldData, newDataPoint];
            });
            setDynamicBatteryPercentage((oldData) => {
                if (oldData.length >= totalPoints) {
                    clearInterval(interval);
                    return oldData;
                }
                const newDataPoint = batteryPercentage[oldData.length];
                return [...oldData, newDataPoint];
            });
        }, 1000); // Adjust this value as needed for generation frequency
        return () => clearInterval(interval);
    }, []); // eslint-disable-line

    const data = {
        labels,
        datasets: [
            {
                label: "Engine Count",
                data: downsampleData(dynamicEngineCount),
                borderColor: "red",
                yAxisID: "percentage",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Energy Production",
                data: downsampleData(dynamicEnergyProduction),
                borderColor: "yellow",
                yAxisID: "energy",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Energy Storage Percentage",
                data: downsampleData(dynamicBatteryPercentage),
                borderColor: "green",
                yAxisID: "percentage",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
        ],
    };

    const options = {
        responsive: true,
        animation: {
            duration: 1,
        },
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: `Energy Production (MWh) and Storage (%)`,
            },
        },
        scales: {
            x: {
                beginAtZero: true,
                type: "linear",
                position: "bottom",
                title: {
                    display: true,
                    text: "Percent of Route",
                },
                stacked: true,
                max: totalPoints / 10,
            },
            y: {
                type: "linear",
                position: "left",
                title: {
                    display: true,
                    text: "Energy (MWh)",
                },
                id: "energy",
            },
            percentage: {
                type: "linear",
                position: "right",
                title: {
                    display: true,
                    text: "Percentage",
                },
                suggestedMax: 100,
                id: "percentage",
            },
        },
    };

    return <Line options={options} data={data} id="canvas-element" />;
};

export { StorageAndSurplusGraph };
