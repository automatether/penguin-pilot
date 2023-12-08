//this is a component that displays the energy storage graph
//it uses d3.js library to create the graph
//for data we initially used the mock data from mockData.js

import React from "react";
import * as d3 from "d3";
import { mockData } from "../mockData/mockData.js";

export const EnergyStorageGraph = () => {
    //set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
        width = 460 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3
        .select("#energyStorageGraph")
        .append("svg")
        .attr("width", width + margin.left + margin.right + 100)
        .attr("height", height + margin.top + margin.bottom + 100)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
};
