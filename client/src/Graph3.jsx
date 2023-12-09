import React from "react";
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
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Cruise Ship Performance",
    },
  },
  scales: {
    x: {
      type: "linear",
      position: "bottom",
      title: {
        display: true,
        text: "Percent of Route",
      },
    },
    y: {
      type: "linear",
      position: "left",
      title: {
        display: true,
        text: "Amount of Energy (kWh)",
      },
    },
    // Additional y-axis for speed
    speed: {
      type: "linear",
      position: "right",
      title: {
        display: true,
        text: "Speed (knots)",
      },
    },
  },
};

const createDataPoint = (n) => {
  const percentOfRoute = n;
  const maxEnergyVariation = 30;
  const baseEnergy = faker.datatype.number({ min: 0, max: 1000 });
  const energyInStorage = baseEnergy + percentOfRoute * maxEnergyVariation;

  // Additional metric: Speed of the cruise ship
  const speed = faker.datatype.number({ min: 10, max: 20 }); // Example speed range

  return {
    percentOfRoute,
    energyInStorage,
    speed,
  };
};

const createMockData = (numPoints) => {
  // Create data points without sorting
  const dataPoints = Array.from({ length: numPoints }, (_, i) =>
    createDataPoint(i)
  );

  // Sort data points based on the "Percent of Route"
  dataPoints.sort((a, b) => a.percentOfRoute - b.percentOfRoute);

  return dataPoints;
};

export const data = {
  datasets: [
    {
      label: "Energy Storage",
      data: createMockData(100).map((point) => ({
        x: point.percentOfRoute,
        y: point.energyInStorage,
      })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    // Additional dataset for speed
    {
      label: "Speed",
      data: createMockData(100).map((point) => ({
        x: point.percentOfRoute,
        y: point.speed,
      })),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      yAxisID: "speed-axis", // Use a separate y-axis for speed
    },
  ],
};

export function ChartComponent3() {
  return <Line options={options} data={data} id="canvas-element" />;
}
