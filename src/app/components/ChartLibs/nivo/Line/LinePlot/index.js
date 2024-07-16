import React from "react";
import { Line } from "@nivo/line";

const data = [
  {
    id: "series1",
    data: [
      { x: "2024-01-01", y: 7 },
      { x: "2024-01-02", y: 5 },
      { x: "2024-01-03", y: 11 },
      { x: "2024-01-04", y: 9 },
      { x: "2024-01-05", y: 12 },
    ],
  },
  // Add more series as needed
];

export const NivoLinePlot = () => (
  <Line
    width={1200}
    height={800}
    data={data}
    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
    xScale={{ type: "point" }}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false,
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      orient: "bottom",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Date",
      legendOffset: 36,
      legendPosition: "middle",
    }}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "Value",
      legendOffset: -40,
      legendPosition: "middle",
    }}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabelYOffset={-12}
    useMesh={true}
    enableSlices="x"
    enableArea={true}
    brush={{
      from: "x",
      to: "x",
      axis: "x",
      domain: { x: [0, 10] },
      colors: { fill: "#b4d2ff", stroke: "#007bff", "stroke-width": 2 },
    }}
  />
);
