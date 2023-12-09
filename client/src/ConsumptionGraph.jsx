import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import mockForecastData from "./mockData/forecast_data.json";
import mockLiveData from "./mockData/live_data.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const downsampleData = (originalData, factor) => {
  console.log(originalData, factor);
  const result = [];
  for (let i = 0; i < originalData.length; i += factor) {
    const chunk = originalData.slice(i, i + factor);
    const average = chunk.reduce((sum, value) => sum + value, 0) / chunk.length;
    result.push(average);
  }
  return result;
};

const ConsumptionGraph = () => {
  const downsampleFactor = 10;
  const [dynamicData, setDynamicData] = useState([]);
  const labels = mockForecastData["forecasted consumption"].map(
    (_, index) => index / (downsampleFactor / 10)
  );
  const constantData = mockForecastData["forecasted consumption"];
  const totalPoints = constantData.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicData((oldData) => {
        if (oldData.length >= totalPoints) {
          clearInterval(interval);
          return oldData;
        }

        const newDataPoint =
          constantData[oldData.length] + (Math.random() - 0.5) * 10;
        return [...oldData, newDataPoint]; // Directly adding the final value of the new data point
      });
    }, 1000); // Adjust this value as needed for generation frequency
    return () => clearInterval(interval);
  }, []); // eslint-disable-line

  const latestIndex = dynamicData.length - 1;
  const latestDifference = dynamicData[latestIndex] - constantData[latestIndex];
  const dynamicBorderColor = latestDifference > 0 ? "green" : "red";

  const data = {
    labels,
    datasets: [
      {
        label: "Dynamic Data",
        data: downsampleData(
          mockLiveData["total consumption"],
          downsampleFactor
        ),
        borderColor: dynamicBorderColor,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Forecasted Consumption",
        data: downsampleData(
          mockForecastData["forecasted consumption"],
          downsampleFactor
        ),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Forecasted Propulsion",
        data: downsampleData(
          mockForecastData["forecasted propulsion"],
          downsampleFactor
        ),
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Forecasted Heating",
        data: downsampleData(
          mockForecastData["forecasted heating"],
          downsampleFactor
        ),
        borderColor: "rgb(255, 205, 86)",
        backgroundColor: "rgba(255, 205, 86, 0.5)",
      },
      {
        label: "Forecasted Hotel",
        data: downsampleData(
          mockForecastData["forecasted hotel"],
          downsampleFactor
        ),
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
        text: `Real-Time Chart (Latest Difference: ${latestDifference.toFixed(
          2
        )})`,
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

  return <Line options={options} data={data} id="canvas-element" />;
};

export { ConsumptionGraph };
