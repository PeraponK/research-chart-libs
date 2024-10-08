import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";

const StepReview = ({ points, img, xAxis, yAxis }) => {
  const [grid, setGrid] = useState(null);
  const chartRef = useRef();
  const [zoom, setZoom] = useState(false);
  const [storeColor, setStoreColor] = useState([
    "red",
    "green",
    "blue",
    "pink",
    "orange",
    "purple",
    "black",
    "indigo",
    "yellow",
  ]);

  const onChartReady = () => {
    if (chartRef.current !== undefined) {
      drawCurve();
      updateBackgroundImage();
    }
  };

  const drawCurve = () => {
    if (chartRef.current !== undefined) {
      const chart = chartRef.current.getEchartsInstance();
      const pathPoint = points.map((item) => ({
        x: item.x,
        y: item.y,
      }));
      const getPath = handleGetPath(pathPoint);
      return getPath.map((item, index) => ({
        id: `curve${index}`,

        type: "bezierCurve",
        silent: true,
        shape: {
          x1: chart.convertToPixel("xAxis", item[0].x),
          y1: chart.convertToPixel("yAxis", item[0].y),
          x2: chart.convertToPixel("xAxis", item[3].x),
          y2: chart.convertToPixel("yAxis", item[3].y),
          cpx1: chart.convertToPixel("xAxis", item[1].x),
          cpy1: chart.convertToPixel("yAxis", item[1].y),
          cpx2: chart.convertToPixel("xAxis", item[2].x),
          cpy2: chart.convertToPixel("yAxis", item[2].y),
        },
        style: {
          stroke: storeColor[index % 9],
          lineWidth: 2,
        },
      }));
    }
  };

  const handleGetPath = (pathPoint) => {
    const times = Math.floor(pathPoint.length / 4);
    let tempArr = [];
    for (let i = 0; i < times; i++) {
      i === 0
        ? tempArr.push(pathPoint.slice(0, 4))
        : tempArr.push(pathPoint.slice(i * 4, (i + 1) * 4));
    }
    return tempArr;
  };

  const updateBackgroundImage = () => {
    const chart = chartRef.current.getEchartsInstance();
    const rect = chart._api.getCoordinateSystems()[0].getRect();
    let tmpCanvas;
    let tmpCanvasCtx;
    if (img !== null) {
      const image = new Image();
      image.src = img;

      if (!tmpCanvas) {
        tmpCanvas = document.createElement("canvas");
        tmpCanvasCtx = tmpCanvas.getContext("2d");
      }
      const xAxisStart = chart.getModel().getComponent("xAxis").__dzAxisProxy
        ._percentWindow[0];
      const xAxisEnd = chart.getModel().getComponent("xAxis").__dzAxisProxy
        ._percentWindow[1];
      const yAxisStart = chart.getModel().getComponent("yAxis").__dzAxisProxy
        ._percentWindow[0];
      const yAxisEnd = chart.getModel().getComponent("yAxis").__dzAxisProxy
        ._percentWindow[1];

      const imageWidth = image.width;
      const imageHeight = image.height;

      const sx = (xAxisStart / 100) * imageWidth;
      const sy = ((100 - yAxisEnd) / 100) * imageHeight;
      const swidth = ((xAxisEnd - xAxisStart) / 100) * imageWidth;
      const sheight = ((yAxisEnd - yAxisStart) / 100) * imageHeight;
      tmpCanvas.width = rect.width + rect.x;
      tmpCanvas.height = rect.height + rect.y;

      tmpCanvasCtx.drawImage(
        image,
        sx,
        sy,
        swidth,
        sheight,
        rect.x,
        rect.y,
        rect.width,
        rect.height
      );

      chart.resize();
      setGrid({
        show: true,
        backgroundColor: {
          image: tmpCanvas,
          repeat: "no-repeat",
        },
      });
    }
  };

  const handleZoom = () => {
    updateBackgroundImage();
    setZoom(!zoom);
  };

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = chartRef.current.getEchartsInstance();
      chart.on("dataZoom", function (event) {
        handleZoom();
      });
    }
  });

  useEffect(() => {
    updateBackgroundImage();
    window.addEventListener("resize", updateBackgroundImage);
  }, [img]);

  const options = useMemo(() => {
    const option = {
      toolbox: {
        z: 10,
        show: true,
        feature: {
          dataZoom: {},
        },
      },
      title: {},
      xAxis: xAxis,
      yAxis: yAxis,
      grid: grid,
      graphic: {
        elements: [...(drawCurve() || [])],
      },
    };
    return option;
  }, [points, xAxis, yAxis, grid]);

  return (
    <ReactECharts
      option={options}
      ref={chartRef}
      onChartReady={onChartReady}
      style={{ height: 500 }}
    />
  );
};

export default StepReview;
