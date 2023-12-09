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

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const downsampleData = (originalData, factor = 10) => {
    const result = [];
    for (let i = 0; i < originalData.length; i += factor) {
        const chunk = originalData.slice(i, i + factor);
        const average = chunk.reduce((sum, value) => sum + value, 0) / chunk.length;
        result.push(average);
    }
    return result;
};

const StorageAndSurplusGraph = () => {
    const optimalStorage = Array.from({ length: 1000 }, () => 1000);
    const storage = Array.from({ length: 1000 }, () => 871);
    const totalPoints = 1000;
    const [dynamicData, setDynamicData] = useState(Array.from({ length: 100 }, (_, index) => storage[index]));
    const labels = Array.from({ length: totalPoints }, (_, index) => index);
    console.log("total points: ", storage);

    useEffect(() => {
        const interval = setInterval(() => {
            setDynamicData((oldData) => {
                if (oldData.length >= totalPoints) {
                    clearInterval(interval);
                    return oldData;
                }
                // here we determine the current position of the ship on the route (percentages/100)
                // the added data
                const newDataPoint = storage[oldData.length];
                return [...oldData, newDataPoint]; // Directly adding the final value of the new data point
            });
        }, 1000); // Adjust this value as needed for generation frequency
        return () => clearInterval(interval);
    }, []); // eslint-disable-line

    // here we determine the current position of the ship on the route (percentages/100)
    // the current difference to the forecasted power consumption
    // and use that to display the color coded dynamic line
    const latestIndex = dynamicData.length - 1;
    const latestDifference = dynamicData[latestIndex] - optimalStorage[latestIndex];
    const dynamicBorderColor = latestDifference > 0 ? "green" : "red";

    const data = {
        labels,
        datasets: [
            {
                label: "Dynamic Storage",
                data: downsampleData(dynamicData),
                borderColor: dynamicBorderColor,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Optimal Storage",
                data: downsampleData(optimalStorage),
                borderColor: "rgb(255, 99, 132)",
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
                text: `Energy surplus and storage (Latest Difference: ${latestDifference.toFixed(2)})`,
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
            },
        },
    };

    return (
        <Line
            options={options}
            data={data}
            id="canvas-element"
        />
    );
};

export { StorageAndSurplusGraph };
