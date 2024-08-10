// ScatterPlot.js
import React from "react";
import Plot from "react-plotly.js";

const PlotyScatterPlot = ({ series }) => {
  const x = series.map((item) => item[0]);
  const y = series.map((item) => item[1]);
  console.log("this is x", x);
  const data = [
    {
      x: x,
      y: y,
      mode: "markers",
      type: "scattergl",
      marker: { color: "red" },
    },
  ];
  const cx = 913.988;
  const cy = 122.631;
  const rx = 24.928 * 8;
  const ry = 3.714 * 8;

  const layout = {
    title: "Scatter Plot Example",
    xaxis: { title: "X Axis" },
    yaxis: { title: "Y Axis" },
    shapes: [
      {
        type: "circle",
        xref: "x",
        yref: "y",
        x0: cx - cy,
        y0: cy - ry,
        x1: cx + rx,
        y1: cy + ry,
        line: {
          color: "blue",
          width: 2,
        },
        fillcolor: "rgba(0, 0, 255, 0.2)", // Light blue fill
      },
    ],
  };

  return (
    <Plot
      data={data}
      layout={layout}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default PlotyScatterPlot;
