import React, { useEffect } from "react";
import * as d3 from "d3";

export const D3ScatterPlot = ({ dataset }) => {
  //   useEffect(() => {
  //     console.log(dataset);
  //   }, [dataset]);
  //test data please
  const data = [
    { x: 815, y: 132 },
    { x: 875, y: 111 },
    { x: 966, y: 124 },
    { x: 900, y: 130 },
    { x: 732, y: 120 },
    { x: 710, y: 90 },
    { x: 655, y: 100 },
    { x: 120, y: 100 },
    { x: 913.988, y: 122.631 },
  ];

  useEffect(() => {
    if (dataset.length === 0) {
      return;
    }
    // Clear any existing SVG elements to avoid duplicates
    const element = document.querySelector(".scatter");
    element.innerHTML = "";

    // Set the dimensions and margins of the graph
    const margin = { top: 10, right: 30, bottom: 30, left: 60 },
      width = 800 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    // Append the svg object to the div
    const svg = d3
      .select(".scatter")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)

      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Read the data
    d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv"
    ).then((fecthData) => {
      // Convert data to numeric
      fecthData.forEach((d) => {
        d.GrLivArea = +d.GrLivArea;
        d.SalePrice = +d.SalePrice;
      });

      //x axis
      const x = d3.scaleLinear().domain([600, 1025]).range([0, width]);
      let xAxis = svg
        .append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

      //y axis
      const y = d3.scaleLinear().domain([90, 130]).range([height, 0]);
      let yAxis = svg.append("g").call(d3.axisLeft(y));

      //add data
      let scatter = svg.append("g");
      scatter
        .selectAll("circle")
        // .data(dataset)
        .data(data)
        .enter()
        .append("circle")
        // .attr("cx", (d) => x(d.NYA_DCS_G6710A_Cylinder_1))
        // .attr("cy", (d) => y(d.NYA_DCS_G6710A_Intake_Manifold))
        .attr("cx", (d) => x(d.x))
        .attr("cy", (d) => y(d.y))
        .attr("r", 1.5)
        .style("fill", "#69b3a2");

      let zoom = d3
        .zoom()
        .scaleExtent([0.5, 20])
        .extent([
          [0, 0],
          [width, height],
        ])
        .on("zoom", updateChart);

      //ellipse ปรับขนาดตาม scale และ position zoom
      let ellipse = svg.append("g");
      ellipse
        .append("ellipse")
        .attr("cx", x(913.988))
        .attr("cy", y(122.631))
        .attr("rx", 24.928 * 8)
        .attr("ry", 3.714 * 8)
        .attr(
          "transform",
          `rotate(-173.8
, ${x(913.988)}, ${y(122.631)})`
        )
        .style("fill", "green")
        .style("stroke", "green")
        .style("fill-opacity", "0.2")
        .style("stroke-width", "1");

      svg
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .style("z-index", "10")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
        .call(zoom);

      function updateChart(event) {
        //new scale
        let newX = event.transform.rescaleX(x);
        let newY = event.transform.rescaleY(y);

        // new axes
        xAxis.call(d3.axisBottom(newX));
        yAxis.call(d3.axisLeft(newY));

        // position scatter
        scatter
          .selectAll("circle")
          .attr("cx", function (d) {
            // return newX(d.NYA_DCS_G6710A_Cylinder_1);
            return newX(d.x);
          })
          .attr("cy", function (d) {
            // return newY(d.NYA_DCS_G6710A_Cylinder_10);
            return newY(d.y);
          });
        let scaleX = event.transform.k;
        let scaleY = event.transform.k;
        console.log("scale x Y", event.transform.k);

        ellipse
          .select("ellipse")
          .attr("cx", newX(913.988))
          .attr("cy", newY(122.631))
          .attr("rx", 24.928 * 8 * scaleX)
          .attr("ry", 3.714 * 8 * scaleY)
          .attr("transform", `rotate(90, ${newX(913.988)}, ${newY(122.631)})`);
      }
    });

    // Clean up function to remove the old SVG elements
    return () => {
      const element = document.querySelector(".scatter");
      element.innerHTML = "";
    };
  }, [dataset]);
  return <div className="scatter" />;
};
