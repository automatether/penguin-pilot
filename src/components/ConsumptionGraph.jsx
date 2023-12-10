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
import mockForecastData from "../mockData/forecast_data.json";
import mockLiveData from "../mockData/live_data.json";

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

const ConsumptionGraph = () => {
    const forecastData = mockForecastData["forecasted consumption"];
    const liveData = mockLiveData["total consumption"];
    const totalPoints = forecastData.length;
    const [dynamicData, setDynamicData] = useState(Array.from({ length: 100 }, (_, index) => liveData[index]));
    const labels = Array.from({ length: totalPoints }, (_, index) => index);

    useEffect(() => {
        const interval = setInterval(() => {
            setDynamicData((oldData) => {
                if (oldData.length >= totalPoints) {
                    clearInterval(interval);
                    return oldData;
                }
                // here we determine the current position of the ship on the route (percentages/100)
                // the added data
                const newDataPoint = liveData[oldData.length];
                return [...oldData, newDataPoint]; // Directly adding the final value of the new data point
            });
        }, 1000); // Adjust this value as needed for generation frequency
        return () => clearInterval(interval);
    }, []); // eslint-disable-line

    // here we determine the current position of the ship on the route (percentages/100)
    // the current difference to the forecasted power consumption
    // and use that to display the color coded dynamic line
    const latestIndex = dynamicData.length - 1;
    const latestDifference = dynamicData[latestIndex] - forecastData[latestIndex];
    const dynamicBorderColor = latestDifference > 0 ? "red" : "green";

    const data = {
        labels,
        datasets: [
            {
                label: "Dynamic Data",
                data: downsampleData(dynamicData),
                borderColor: dynamicBorderColor,
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Forecasted Consumption",
                data: downsampleData(forecastData),
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
                label: "Forecasted Propulsion",
                data: downsampleData(mockForecastData["forecasted propulsion"]),
                borderColor: "rgb(54, 162, 235)",
                backgroundColor: "rgba(54, 162, 235, 0.5)",
            },
            {
                label: "Forecasted Heating",
                data: downsampleData(mockForecastData["forecasted heating"]),
                borderColor: "rgb(255, 205, 86)",
                backgroundColor: "rgba(255, 205, 86, 0.5)",
            },
            {
                label: "Forecasted Hotel",
                data: downsampleData(mockForecastData["forecasted hotel"]),
                borderColor: "rgb(75, 192, 192)",
                backgroundColor: "rgba(75, 192, 192, 0.5)",
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
                text: `Real-Time Chart (Latest Difference: ${latestDifference.toFixed(2)})`,
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

export { ConsumptionGraph };
