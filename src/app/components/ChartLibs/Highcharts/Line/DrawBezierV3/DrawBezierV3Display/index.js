import React, { useRef, useEffect, useState, useMemo } from "react";
import Highcharts, { chart } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import zIndex from "@mui/material/styles/zIndex";
import { drag } from "d3";
import { drawV3, drawV3JSON } from "../data";

const DrawBezierV3Display = () => {
  const chartRef = useRef();

  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  //   const drawCurve = (chart) => {
  //     const xAxis = chart.xAxis[0];
  //     const yAxis = chart.yAxis[0];

  //     if (chart.drawCurve) {
  //       chart.drawCurve.forEach((item) => item.destroy());
  //     }
  //     const getPath = drawV3;
  //     chart.drawCurve = getPath.map((item) => {
  //       return chart.renderer
  //         .path()
  //         .attr({
  //           stroke: "red",
  //           zIndex: 10,
  //           d: item,
  //         })
  //         .add();
  //     });
  //   };

  let pathData = drawV3JSON;

  // Function to interpolate points along a cubic Bezier curve
  function cubicBezierInterpolation(p0, p1, p2, p3, t) {
    let x =
      Math.pow(1 - t, 3) * p0[0] +
      3 * Math.pow(1 - t, 2) * t * p1[0] +
      3 * (1 - t) * Math.pow(t, 2) * p2[0] +
      Math.pow(t, 3) * p3[0];
    let y =
      Math.pow(1 - t, 3) * p0[1] +
      3 * Math.pow(1 - t, 2) * t * p1[1] +
      3 * (1 - t) * Math.pow(t, 2) * p2[1] +
      Math.pow(t, 3) * p3[1];
    return [x, y];
  }

  // Parse the path data to get control points
  //   let points = pathData.match(/[0-9.]+/g).map(Number);
  //   let p0 = [points[0], points[1]];
  //   let p1 = [points[2], points[3]];
  //   let p2 = [points[4], points[5]];
  //   let p3 = [points[6], points[7]];

  let data = [];

  for (let j = 0; j < pathData.length; j++) {
    //if you wanna change frequency of datapoint you should change slice too
    for (let i = 0; i <= 1; i += 0.001) {
      let p0 = [pathData[j][0].x, pathData[j][0].y];
      let p1 = [pathData[j][1].x, pathData[j][1].y];
      let p2 = [pathData[j][2].x, pathData[j][2].y];
      let p3 = [pathData[j][3].x, pathData[j][3].y];
      let point = cubicBezierInterpolation(p0, p1, p2, p3, i);
      data.push({ x: point[0], y: point[1] });
    }
  }
  console.log(data);
  const data1 = data.slice(0, 11);
  console.log(data1);
  //   console.log(pathData.length);

  let tempData = [];
  for (let i = 0; i < pathData.length; i++) {
    i === 0
      ? tempData.push(data.slice(0, 1000))
      : tempData.push(data.slice(i * 1000, (i + 1) * 1000));
  }
  //   const testData = data.map((item) => pathData);
  //   console.log(data);
  const series = tempData.map((data, index) => ({
    name: `data ${index}`,
    data: data,
  }));

  const handleAddIcon = (chart) => {
    console.log(chart);

    const xAxis = chart.point.x;
    const yAxis = chart.point.y;
    console.log(xAxis, yAxis);
  };

  const options = useMemo(() => {
    const options = {
      chart: {
        type: "spline",
        zoomType: "xy",
        events: {
          load: function () {
            // drawCurve(this);
          },
          // click: function (e) {
          //   handleAddIcon(e);
          //   //     handleAddPoint(e);
          // },
          //similar to useeffect
          render: function () {
            // drawCurve(this);
          },
        },

        plotBackgroundImage: image,
        // width: "400",
        // type: "spline",
      },
      title: {
        text: "V3 or lastest version",
      },
      series: series,
      // xAxis: { type: "logarithmic" },
      xAxis: { type: "linear" },

      plotOptions: {
        series: {
          point: {
            events: {
              click: function () {
                var point = this;

                if (!point.marker) {
                  point.update({
                    marker: {
                      symbol: "circle",
                      radius: 6,
                      fillColor: "red",
                    },
                  });
                } else {
                  point.update({
                    marker: null,
                  });
                }
              },
            },
          },
          marker: {
            enabled: true,
            radius: 1,
            states: {
              hover: {
                enabled: false,
              },
            },
          },
        },
      },
      // xAxis: {
      //   min: 0,
      //   max: 40000,
      //   tickPositions: [0, 10000, 20000, 30000, 40000],
      // },
      // yAxis: {
      //   min: 0,
      //   max: 3500,
      //   tickPositions: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500],
      // },
      tooltip: {
        formatter: function () {
          return `x : ${this.x}  <br> y : ${this.y}`;
        },
      },
    };
    return options;
  }, [image]);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
      <button id="clear-btn">Clear</button>
      <input type="file" name="file" onChange={handleImage} />
    </div>
  );
};
export default DrawBezierV3Display;
