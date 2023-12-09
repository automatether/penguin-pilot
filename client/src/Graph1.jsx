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
import mockData from "./mockData/data.json";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

//for data we get from data.json file, we map each point to a label ranging from 0 to 100
const labels = mockData["power consumption"].map((_, index) => index / 10);

export const data = {
  labels,
  datasets: [
    {
      label: "power consumption",
      data: mockData["power consumption"],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    mockData["power consumption"],
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js",
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
        text: "Energy (MWh)",
      },
    },
  },
};

export function ChartComponent() {
  return <Line options={options} data={data} id="canvas-element" />;
}
