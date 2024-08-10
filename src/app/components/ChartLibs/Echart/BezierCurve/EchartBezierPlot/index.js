import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { drawV3JSON } from "../../../Highcharts/Line/DrawBezierV3/data";

const EchartBezierPlot = () => {
  const chartRef = useRef();
  const [points, setPoints] = useState([]);

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
    type: "line",
    data: data.map((item) => [item.x, item.y]),
  }));

  const test = series.map((item) => item[0]);
  console.log("test", test);
  console.log("sere", series);

  const options = useMemo(() => {
    const option = {
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: "none",
          },

          saveAsImage: {},
        },
      },
      title: {},

      tooltip: {},
      //   xAxis: addX,
      xAxis: { min: 0, max: 40000 },
      yAxis: { min: 0, max: 3500 },
      //   yAxis: addY,

      series: series,
    };
    return option;
  }, [points]);

  return (
    <div>
      <ReactECharts option={options} ref={chartRef} style={{ height: 500 }} />
    </div>
  );
};

export default EchartBezierPlot;
