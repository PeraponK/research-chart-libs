import React, { useRef, useEffect, useState, useMemo } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  line10Bezier2,
  line1Bezier2,
  line2Bezier2,
  line3Bezier2,
  line4Bezier2,
  line5Bezier2,
  line6Bezier2,
  line7Bezier2,
  line8Bezier2,
  line9Bezier2,
} from "./data";

const DrawBezier2 = () => {
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

  const [image, setImage] = useState("");

  const handleImage = (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  };
  const options = useMemo(() => {
    const options = {
      chart: {
        events: {
          load: function () {
            const chart = this;

            chart.polygons = [];

            document
              .getElementById("clear-btn")
              .addEventListener("click", () => {
                // chart.polygons.forEach((polygon) => {
                //   console.log("hello");
                // });
                // console.log(chart.polygons[0].points);
                if (chart.polygons !== undefined) {
                  //   console.log(chart.polygons[0].points);
                  console.log(JSON.stringify(chart.polygons[0].points));
                }
                // chart.polygons.length = 0;
                // currentPolygon = null;
              });

            document.addEventListener("mousedown", (e) => {
              if (e.button == 2) {
                currentPolygon = null;
                redrawPolygons(this);
              }
            });
          },

          render: function () {
            redrawPolygons(this);
          },
          click: function (e) {
            const chart = this,
              xAxis = chart.xAxis[0],
              yAxis = chart.yAxis[0];

            if (!currentPolygon) {
              chart.polygons.push({
                points: [],
              });
              currentPolygon = chart.polygons[chart.polygons.length - 1];
            }

            currentPolygon.points.push({
              x: xAxis.toValue(chart.mouseDownX),
              y: yAxis.toValue(chart.mouseDownY),
            });

            redrawPolygons(this);
          },
        },
        plotBackgroundImage: image !== "" ? URL.createObjectURL(image) : null,
        // width: "400",
        type: "spline",
      },
      title: {
        text: "muhahaha",
      },
      series: [{}],
      xAxis: { type: "logarithmic" },

      plotOptions: {
        series: {
          marker: {
            enabled: false,
            states: {
              hover: {
                enabled: false,
              },
            },
          },
        },
      },
      xAxis: {
        min: 0,
        max: 40000,
        tickPositions: [0, 10000, 20000, 30000, 40000],
      },
      yAxis: {
        min: 0,
        max: 3500,
        tickPositions: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500],
      },
    };
    return options;
  }, []);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
      <button id="clear-btn">jason or json</button>
      <input type="file" name="file" onChange={handleImage} />
    </div>
  );
};
export default DrawBezier2;

// data: line1Bezier2.map((item) => [item.x, item.y]),
//   name: "Line Data1",
// },
// {
//   data: line2Bezier2.map((item) => [item.x, item.y]),
//   name: "Line Data2",
// },
// {
//   data: line3Bezier2.map((item) => [item.x, item.y]),
//   name: "Line Data3",
// },
// {
//   data: line4Bezier2.map((item) => [item.x, item.y]),
//   name: "Line Data4",
// },
// {
//   data: line5Bezier2.map((item) => [item.x, item.y]),
//   name: "Line Data5",
// },
// {
//   data: line6Bezier2.map((item) => [item.x, item.y]),
//   name: "Line Data6",
// },
// {
//   data: line7Bezier2.map((item) => [item.x, item.y]),
//   name: "Line Data7",
// },
// {
//   data: line8Bezier2.map((item) => [item.x, item.y]),
//   name: "Line Data8",
// },
// {
//   data: line9Bezier2.map((item) => [item.x, item.y]),
//   name: "Line Data9",
// },
// {
//   data: line10Bezier2.map((item) => [item.x, item.y]),
//   name: "Line Data10",
