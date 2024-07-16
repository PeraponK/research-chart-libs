import React, { useRef, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import {
  line1,
  line10,
  line2,
  line3,
  line4,
  line5,
  line6,
  line7,
  line8,
  line9,
} from "./data";

export const DrawBezier = () => {
  const chartRef = useRef();
  let isDrawing = false;
  let path = [];
  let plot = [];

  //   useEffect(() => {
  //     chartRef.current.chart.renderer
  //       .path(testData)
  //       .attr({
  //         "stroke-width": 2,
  //         stroke: "red",
  //       })
  //       .add();
  //   }, []);

  useEffect(() => {
    const handleMouseDown = (e) => {
      isDrawing = true;
      console.log(JSON.stringify(plot));
      plot = [];
      path = [];
      const xAxisValue = chartRef.current.chart.xAxis[0].toValue(e.chartX);
      const yAxisValue = chartRef.current.chart.yAxis[0].toValue(e.chartY);
      path.push(["M", e.chartX, e.chartY]);
      plot.push(["M", xAxisValue, yAxisValue]);
    };

    const handleMouseMove = (e) => {
      if (isDrawing) {
        const xAxisValue = chartRef.current.chart.xAxis[0].toValue(e.chartX);
        const yAxisValue = chartRef.current.chart.yAxis[0].toValue(e.chartY);
        path.push(["L", e.chartX, e.chartY]);
        plot.push(["L", xAxisValue, yAxisValue]);
        chartRef.current.chart.renderer
          .path(path)
          .attr({
            "stroke-width": 2,
            stroke: "red",
          })
          .add();
        // console.log(path);
      }
    };

    const handleMouseUp = () => {
      isDrawing = false;
    };

    if (chartRef.current && chartRef.current.chart) {
      chartRef.current.chart.container.addEventListener(
        "mousedown",
        handleMouseDown
      );
      chartRef.current.chart.container.addEventListener(
        "mousemove",
        handleMouseMove
      );
      chartRef.current.chart.container.addEventListener(
        "mouseup",
        handleMouseUp
      );
    }

    return () => {
      if (chartRef.current && chartRef.current.chart) {
        chartRef.current.chart.container.removeEventListener(
          "mousedown",
          handleMouseDown
        );
        chartRef.current.chart.container.removeEventListener(
          "mousemove",
          handleMouseMove
        );
        chartRef.current.chart.container.removeEventListener(
          "mouseup",
          handleMouseUp
        );
      }
    };
  }, []);

  const options = {
    chart: {
      //   plotBackgroundImage: "images/pic3.png",
      width: "400",
      type: "spline",
    },
    title: {
      text: "muhahaha",
    },
    series: [
      {
        data: line1.map((point) => [point[1], point[2]]),
        name: "Line Data1",
      },
      {
        data: line2.map((point) => [point[1], point[2]]),
        name: "Line Data2",
      },
      {
        data: line3.map((point) => [point[1], point[2]]),
        name: "Line Data3",
      },
      {
        data: line4.map((point) => [point[1], point[2]]),
        name: "Line Data4",
      },
      {
        data: line5.map((point) => [point[1], point[2]]),
        name: "Line Data5",
      },
      {
        data: line6.map((point) => [point[1], point[2]]),
        name: "Line Data6",
      },
      {
        data: line7.map((point) => [point[1], point[2]]),
        name: "Line Data7",
      },
      {
        data: line8.map((point) => [point[1], point[2]]),
        name: "Line Data8",
      },
      {
        data: line9.map((point) => [point[1], point[2]]),
        name: "Line Data9",
      },
      {
        data: line10.map((point) => [point[1], point[2]]),
        name: "Line Data10",
      },
    ],
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

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
    </div>
  );
};
