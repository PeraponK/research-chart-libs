// Import necessary modules
import React, { useEffect, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { RectangleTwoTone } from "@mui/icons-material";

// Create the React component
const OnEvent = () => {
  const chartRef = useRef();
  const [graphic, setGraphic] = useState();

  const onDataZoom = (event) => {
    handleGraphic;
    // console.log(
    //   chartRef.current.getEchartsInstance().getModel().getComponent("xAxis"),
    //   chartRef.current.getEchartsInstance().getModel().getComponent("yAxis")
    // );
    // const chart = event.target;
    // const dataZoom = chart.getOption().dataZoom;
    // const xAxisZoom = (dataZoom[0].end - dataZoom[0].start) / 100;
    // const yAxisZoom = (dataZoom[1].end - dataZoom[1].start) / 100;
    // const grid = chart.getOption().grid[0];
    // const bgImage = chart
    //   .getOption()
    //   .graphic.find((item) => item.id === "bgImage");
    // if (bgImage) {
    //   bgImage.style.width = grid.width / xAxisZoom;
    //   bgImage.style.height = grid.height / yAxisZoom;
    //   bgImage.left = grid.left + (grid.width - bgImage.style.width) / 2;
    //   bgImage.top = grid.top + (grid.height - bgImage.style.height) / 2;
    //   chart.setOption({
    //     graphic: [bgImage],
    //   });
    // }
  };

  const handleGraphic = () => {
    const chart = chartRef.current.getEchartsInstance();
    const rect = chart._api.getCoordinateSystems()[0].getRect();
    chart.resize();
    // console.log(chart);
    setGraphic([
      {
        type: "image",
        style: {
          image: "/images/pic3.png",
          width: rect.width,
          height: rect.height,
        },
        left: "center",
        top: "center",
      },
    ]);
  };

  useEffect(() => {
    window.addEventListener("resize", handleGraphic);
  }, []);

  // Define the chart options
  const getOption = () => ({
    grid: {
      left: "10%",
      right: "10%",
      bottom: "10%",
      top: "10%",
    },
    dataZoom: [
      {
        type: "inside",
        xAxisIndex: [0],
      },
      {
        type: "inside",
        yAxisIndex: [0],
      },
    ],
    xAxis: {
      type: "value",
      min: 0,
      max: 40000,
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 3500,
    },
    graphic: graphic,
    series: [
      {
        type: "scatter",
        data: [
          [1, 2],
          [2, 3],
          [3, 4],
        ],
      },
    ],
  });

  // Handle the dataZoom event to update the image

  return (
    <ReactECharts
      option={getOption()}
      ref={chartRef}
      onEvents={{ dataZoom: onDataZoom }}
      style={{ height: "500px", width: "100%" }}
    />
  );
};

export default OnEvent;
