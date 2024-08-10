import React, { useRef, useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BezierCurvePath = () => {
  const chartRef = useRef();
  let isDrawing = false;
  let path = [];
  let plot = [];
  let currentPolygon = null;

  const redrawPolygons = (chart) => {
    const polygons = chart.polygons,
      xAxis = chart.xAxis[0],
      yAxis = chart.yAxis[0];

    polygons.forEach((polygon) => {
      let d = "";
      polygon.points.forEach((point, i) => {
        d += `${i ? "L" : "M"} ${xAxis.toPixels(point.x)} ${yAxis.toPixels(
          point.y
        )}`;
        //ค่า x y ของ graph
        // console.log(xAxis.toPixels(point.x), yAxis.toPixels(point.y));

        // console.log(first);
      });

      if (polygon.points.length === 1) {
        const point = polygon.points[0];
        if (!polygon.dot) {
          polygon.dot = chart.renderer
            .circle({
              fill: "#f008",
              r: 2,
              zIndex: 1,
            })
            .add();
        }

        polygon.dot.attr({
          cx: xAxis.toPixels(point.x),
          cy: yAxis.toPixels(point.y),
        });
      } else if (polygon.dot) {
        polygon.dot.destroy();
        polygon.dot = undefined;
      }

      if (polygon !== currentPolygon) {
        d += " Z";
      }

      if (d.length) {
        if (!polygon.path) {
          polygon.path = chart.renderer
            .path()
            .attr({
              "stroke-width": 2,
              zIndex: 1,
            })
            .add();
        }

        polygon.path.attr({
          d: d,
          stroke: polygon === currentPolygon ? "#f008" : "#f00",
        });
      }
    });
  };

  const [lineData, setLineData] = useState([
    ["M0.5 323C35.843 314.54 49.8756 157.101 67.5 1"],
    ["M425 0.999981C321.5 88.5 182.5 173.5 0.5 178.5"],
    ["M1 1.48042C162.628 -4.09908 214.82 40.6739 228 45"],
    ["M1 1.91798C144.863 -5.80802 225.427 37.2368 261 56"],
    ["M0 1.85776C32.4719 1.85776 162.815 -11.3626 284 66"],
    ["M1 2.23669C150.648 -6.70758 236.453 34.3309 310 78"],
    ["M0.5 2.5C9 2.5 191.5 -19 338.5 96.5"],
    ["M0.5 3C110 -9 266.5 22.5 365 111.5"],
    ["M0.5 1.49997C274 -12 386.296 127.225 392 127"],
    [
      "M0.5 0.999981C112.5 0.999978 135 -6.33271 249.5 37.8336C364 82 401.5 127 421.5 146.5",
    ],
  ]);

  const options = {
    chart: {
      // width: 487,
      type: "spline",
      events: {
        load: function () {
          const renderer = this.renderer;
          //   lineData.map((item) =>
          //     renderer
          //       .path([item])
          //       .attr({
          //         stroke: "red",
          //         "stroke-width": 1,
          //         fill: "none",
          //         transform: "translate(200 200)",
          //       })
          //       .add()
          //   );
          renderer
            .path([lineData[0]])
            .attr({
              stroke: "red",
              "stroke-width": 1,
              fill: "none",
              transform: "translate(0.5 24)",
            })
            .add();
          renderer
            .path([lineData[1]])
            .attr({
              stroke: "red",
              "stroke-width": 1,
              fill: "none",
              transform: "translate(1.5 168)",
            })
            .add();
          renderer
            .path([lineData[2]])
            .attr({
              stroke: "red",
              "stroke-width": 1,
              fill: "none",
              transform: "translate(0 259)",
            })
            .add();
          renderer
            .path([lineData[3]])
            .attr({
              stroke: "red",
              "stroke-width": 1,
              fill: "none",
              transform: "translate(0 236)",
            })
            .add();
          renderer
            .path([lineData[4]])
            .attr({
              stroke: "red",
              "stroke-width": 1,
              fill: "none",
              transform: "translate(0 211)",
            })
            .add();
          renderer
            .path([lineData[5]])
            .attr({
              stroke: "red",
              "stroke-width": 1,
              fill: "none",
              transform: "translate(1 182)",
            })
            .add();
          renderer
            .path([lineData[6]])
            .attr({
              stroke: "red",
              "stroke-width": 1,
              fill: "none",
              transform: "translate(0.5 149.92)",
            })
            .add();
          renderer
            .path([lineData[7]])
            .attr({
              stroke: "red",
              "stroke-width": 1,
              fill: "none",
              transform: "translate(1.5 116.55)",
            })
            .add();
          renderer
            .path([lineData[8]])
            .attr({
              stroke: "red",
              "stroke-width": 1,
              fill: "none",
              transform: "translate(1.5 81.58)",
            })
            .add();
          renderer
            .path([lineData[9]])
            .attr({
              stroke: "red",
              "stroke-width": 1,
              fill: "none",
              transform: "translate(1.5 42.54)",
            })
            .add();
        },
      },
    },

    series: [0],
    xAxis: {
      min: 0,
      max: 400000,
      tickPositions: [0, 10000, 200000, 300000, 390000, 400000],
    },
    yAxis: {
      min: 0,
      max: 3500,
      tickPositions: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500],
    },
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      {/* <button id="clear-btn">jason or json</button> */}
      {/* <input type="file" name="file" onChange={handleImage} /> */}
    </div>
  );
};
export default BezierCurvePath;
