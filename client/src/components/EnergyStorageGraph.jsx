import React, { useEffect } from "react";
import * as d3 from "d3";
import { mockData } from "../mockData/mockData.js";

const generateMockData = () => {
    const data = [];
    const numDataPoints = 50;

    for (let i = 0; i < numDataPoints; i++) {
        const time = i * 0.5; // Adjust the multiplier based on your time intervals
        const energy = Math.random() * 1000; // Adjust the multiplier based on your energy range

        data.push({ time, energy });
    }

    return data;
};

const prepareData = (data) => {
    // Data preparation logic
    return data;
};

export const EnergyStorageGraph = () => {
    useEffect(() => {
        const data = generateMockData();
        drawGraph(data);
    }, []);

    const drawGraph = (data) => {
        const margin = { top: 20, right: 20, bottom: 30, left: 50 };
        const width = 960 - margin.left - margin.right;
        const height = 500 - margin.top - margin.bottom;
    
        const x = d3.scaleLinear().range([0, width]);
        const y = d3.scaleLinear().range([height, 0]);
    
        // Set the domain for the x and y scales based on your data
        x.domain([0, d3.max(data, (d) => d.time)]);
        y.domain([0, d3.max(data, (d) => d.energy)]);
    
        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y);
    
        const line = d3
            .line()
            .x((d) => x(d.time))
            .y((d) => y(d.energy));
    
        const svg = d3.select("#energyStorageGraph").select("svg");
    
        if (svg.empty()) {
            // If svg does not exist, create it
            const newSvg = d3
                .select("#energyStorageGraph")
                .append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom);
    
            newSvg
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .append("g")
                .attr("class", "axis axis--x")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);
    
            newSvg.append("g").attr("class", "axis axis--y").call(yAxis);
        }
    
        // Implement the rest of your graph drawing and updating logic here
    };
    return (
        <div>
            <h2>Energy Storage Graph</h2>
            <div id="energyStorageGraph"></div>
        </div>
    );
};
