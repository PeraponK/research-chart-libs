import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import { throttle } from "echarts";

const StepDrawCurve = ({ xAxis, yAxis, img, onPointUpdate, points }) => {
  const [grid, setGrid] = useState(null);
  const chartRef = useRef();
  const [drawMode, setDrawMode] = useState(true);
  const drawModeRef = useRef(drawMode);
  const [dragPoint, setDragPoint] = useState(null);
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

  // console.log("stepdrawcurve xy val :", xAxis, yAxis);

  const handleAddPoint = (point) => {
    console.log("added");
    let newPoint = {
      x: point[0],
      y: point[1],
    };
    if (drawModeRef.current === true) {
      onPointUpdate((prev) => [...prev, newPoint]);
    }
  };

  const onChartReady = () => {
    console.log("onchartready");
    // setTimeout(() => {
    if (chartRef.current !== undefined) {
      console.log("hello ready");
      let xAxisRange = { min: xAxis.min, max: xAxis.max };
      let yAxisRange = { min: yAxis.min, max: yAxis.max };
      console.log(xAxisRange, yAxisRange);
      const chart = chartRef.current.getEchartsInstance();
      chart.getZr().on("click", function (event) {
        const point = [event.offsetX, event.offsetY];
        const valuePoint = chart.convertFromPixel("grid", point);
        if (
          xAxisRange.min <= valuePoint[0] &&
          xAxisRange.max >= valuePoint[0] &&
          yAxisRange.min <= valuePoint[1] &&
          yAxisRange.max >= valuePoint[1]
        ) {
          handleAddPoint(valuePoint);
          console.log("in condition");
        } else {
          console.log("not in condition");
          console.log(
            xAxisRange.min,
            "<=",
            valuePoint[0],
            xAxisRange.max,
            ">=",
            valuePoint[0],
            yAxisRange.min,
            "<=",
            valuePoint[1],
            yAxisRange.max,
            ">=",
            valuePoint[1]
          );
        }
      });
      // chart.on("dataZoom", function (event) {
      //   console.log("chart.batch", chart.batch);
      //   const xAxisStart = event.batch[0].startValue || xAxis.min;
      //   const xAxisEnd = event.batch[0].endValue || xAxis.max;
      //   const yAxisStart = event.batch[1].startValue || yAxis.min;
      //   const yAxisEnd = event.batch[1].endValue || yAxis.max;
      //   console.log(
      //     "xAxisStart",
      //     xAxisStart,
      //     "xAxisEnd",
      //     xAxisEnd,
      //     "yAxisStart",
      //     yAxisStart,
      //     "yAxisEnd",
      //     yAxisEnd
      //   );
      //   xAxisRange = { min: xAxisStart, max: xAxisEnd };
      //   yAxisRange = { min: yAxisStart, max: yAxisEnd };
      //   // updateBackgroundImage();
      // });
      chart.on(
        "dataZoom",
        throttle((event) => {
          const xAxisStart = event.batch[0].startValue || xAxis.min;
          const xAxisEnd = event.batch[0].endValue || xAxis.max;
          const yAxisStart = event.batch[1].startValue || yAxis.min;
          const yAxisEnd = event.batch[1].endValue || yAxis.max;
          xAxisRange = { min: xAxisStart, max: xAxisEnd };
          yAxisRange = { min: yAxisStart, max: yAxisEnd };
          updateBackgroundImage();
        }, 100)
      );
      console.log("outofrange", xAxisRange, yAxisRange);
    }
    // }, 0);
  };

  const handleDragPoint = () => {
    if (dragPoint !== null) {
      const chart = chartRef.current.getEchartsInstance();
      chart.getZr().on("mousemove", function (params) {
        let pointClick = [params.offsetX, params.offsetY];
        let pointValue = chart.convertFromPixel("grid", pointClick);
        const updatePoint = [...points];
        updatePoint[dragPoint] = { x: pointValue[0], y: pointValue[1] };
        onPointUpdate(updatePoint);
      });
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

  const handleMouseUp = () => {
    if (drawModeRef.current === true) {
      const chart = chartRef.current.getEchartsInstance();
      chart.getZr().off("mousemove");
      setDragPoint(null);
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
  useEffect(() => {
    if (drawModeRef.current === true) {
      document.addEventListener("mousemove", handleDragPoint);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleDragPoint);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  });
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

  const drawCircle = () => {
    if (chartRef.current !== undefined) {
      const chart = chartRef.current.getEchartsInstance();

      return points.map((item, index) => ({
        id: `cicle${index}`,
        type: "circle",

        shape: {
          cx: chart.convertToPixel("xAxis", item.x),
          cy: chart.convertToPixel("yAxis", item.y),
          r: 3,
        },
        style: {
          fill: storeColor[Math.floor(index / 4) % 9],
        },
        onmousedown: () => setDragPoint(index),
      }));
    }
  };

  const handleSetMode = () => {
    const chart = chartRef.current.getEchartsInstance();
    // console.log(chart.dispatchAction(payload));
    chart.dispatchAction({
      type: "takeGlobalCursor",
      key: "dataZoomSelect",
      dataZoomSelectActive: drawMode,
    }),
      setDrawMode((prev) => !prev);
  };

  const handleClear = () => {
    if (chartRef.current !== undefined) {
      onPointUpdate([]);
      const chart = chartRef.current.getEchartsInstance();
      chart.setOption(
        {
          graphic: {
            elements: [],
          },
        },
        {
          replaceMerge: ["graphic"],
        }
      );
    }
  };

  const handleResetZoom = () => {
    const chart = chartRef.current.getEchartsInstance();
    console.log("before", xAxis, yAxis);
    chart.dispatchAction({
      type: "dataZoom",

      batch: [
        { start: 0, end: 100 },
        { start: 0, end: 100 },
      ],
    });
    console.log("after", xAxis, yAxis);
    // handleZoom();
  };

  useEffect(() => {
    drawModeRef.current = drawMode;
  }, [drawMode]);

  const updateBackgroundImage = () => {
    const chart = chartRef.current.getEchartsInstance();
    const rect = chart._api.getCoordinateSystems()[0].getRect();
    let tmpCanvas;
    let tmpCanvasCtx;
    if (img !== null) {
      const image = new Image();
      image.src = img;
      image.onload = () => {
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
        // console.log("chart model", chart.getModel().getComponent("xAxis"));
        // console.log("updatebg:", xAxisStart, xAxisEnd, yAxisStart, yAxisEnd);

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
      };
    }
  };

  useEffect(() => {
    updateBackgroundImage();
    window.addEventListener("resize", updateBackgroundImage);
  }, [img]);

  const option = useMemo(() => {
    const option = {
      toolbox: {
        z: 10,
        show: true,
        feature: {
          dataZoom: {
            throttle: 100,
            icon: null,
          },
        },
      },
      title: {},
      xAxis: xAxis,
      yAxis: yAxis,
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
      grid: grid,
      graphic: {
        elements: [...(drawCircle() || []), ...(drawCurve() || [])],
      },
    };
    return option;
  }, [grid, xAxis, yAxis, zoom, points]);

  return (
    <div>
      <button onClick={handleResetZoom}>resetzoom</button>
      <button onClick={handleSetMode}>swithc</button>
      <button onClick={handleClear}>Clear</button>
      DrawCurve
      <ReactECharts
        option={option}
        ref={chartRef}
        onChartReady={onChartReady}
        style={{ height: 500 }}
      />
    </div>
  );
};

export default StepDrawCurve;
