import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";

const StepDrawCurve = ({ xAxis, yAxis, img, onPointUpdate, points }) => {
  const [grid, setGrid] = useState(null);
  const chartRef = useRef();
  const [drawMode, setDrawMode] = useState(true);
  // const [points, setPoints] = useState([]);
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

  // const handleAddImage = (e) => {
  //   // setImage(URL.createObjectURL(e.target.files[0]));

  //   const file = e.target.files[0];

  //   if (file) {
  //     const imageUrl = URL.createObjectURL(file); // Generate a URL for the image file
  //     const img = new Image();
  //     img.onload = () => {
  //       setImage(img); // Set the image once it is fully loaded
  //     };
  //     img.src = imageUrl; // Set the image source to the object URL

  //     // Optionally, revoke the object URL once it's no longer needed
  //     return () => URL.revokeObjectURL(imageUrl);
  //   }
  // };

  const handleAddPoint = (point) => {
    let newPoint = {
      x: point[0],
      y: point[1],
    };
    if (drawModeRef.current === true) {
      // setPoints((prev) => [...prev, newPoint]);
      onPointUpdate((prev) => [...prev, newPoint]);
    }
  };

  const onChartReady = () => {
    if (chartRef.current !== undefined) {
      const chart = chartRef.current.getEchartsInstance();
      chart.getZr().on("click", function (event) {
        const point = [event.offsetX, event.offsetY];
        const valuePoint = chart.convertFromPixel("grid", point);
        handleAddPoint(valuePoint);
      });
    }
  };

  const handleDragPoint = () => {
    if (dragPoint !== null) {
      const chart = chartRef.current.getEchartsInstance();
      chart.getZr().on("mousemove", function (params) {
        let pointClick = [params.offsetX, params.offsetY];
        let pointValue = chart.convertFromPixel("grid", pointClick);
        const updatePoint = [...points];
        updatePoint[dragPoint] = { x: pointValue[0], y: pointValue[1] };
        // setPoints(updatePoint);
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
      // console.log(chart.getOption().xAxis[0]);
      chart.getZr().off("mousemove");
      setDragPoint(null);
    }
  };

  const drawCurve = () => {
    if (chartRef.current !== undefined) {
      const chart = chartRef.current.getEchartsInstance();
      // console.log("drawCurve problem", chart);
      const pathPoint = points.map((item) => ({
        x: item.x,
        y: item.y,
      }));
      const getPath = handleGetPath(pathPoint);
      console.log("path for draw curve : ", JSON.stringify(getPath));
      // console.log(getPath);
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
      // return draw;
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
    // console.log("In handleZoom");
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
      // console.log(points);

      return points.map((item, index) => ({
        id: `cicle${index}`,
        type: "circle",

        shape: {
          cx: chart.convertToPixel("xAxis", item.x),
          cy: chart.convertToPixel("yAxis", item.y),
          r: 3,
        },
        style: {
          fill: storeColor[Math.floor(index / 4) % 9], // 0 1 2 3 | 4 5 6 7 | 8 9 10 11 = index / 1
          // stroke: "red",
        },
        onmousedown: () => setDragPoint(index),
      }));
      // return draw;
    }
  };

  const handleSetMode = () => {
    setDrawMode((prev) => !prev);
    // console.log(drawModeRef.current);
  };

  const handleGetCurve = () => {};

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

    // if (chartRef.current !== undefined) {
    //   console.log("in condition and chartref");
    //   const chart = chartRef.current.getEchartsInstance();
    //   chart.setOption({
    //     // graphic: {
    //     //   elements: [],
    //     // },
    //     graphic: {
    //       elements: [[], []],
    //     },
    //   });
    // }
  };

  useEffect(() => {
    console.log("usefdrawmode:", drawMode);
    drawModeRef.current = drawMode;
  }, [drawMode]);

  const updateBackgroundImage = () => {
    const chart = chartRef.current.getEchartsInstance();
    const rect = chart._api.getCoordinateSystems()[0].getRect();
    // console.log("rect", rect);
    let tmpCanvas;
    let tmpCanvasCtx;
    if (img !== null) {
      const image = new Image();
      image.src = img;

      console.log("pass condition");
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
      console.log("this", chart.getModel().getComponent("yAxis"));
      // const pointX = chart.convertToPixel("grid", [0, 100]);
      // const pointY = chart.convertToPixel("grid", [0, 100]);
      // const newWidth = rect.width / ((xAxisTest1 - xAxisTest) / 100);
      // const newHeight = rect.height / ((yAxisTest1 - yAxisTest) / 100);
      // const newX = rect.x / ((xAxisTest1 - xAxisTest) / 100);
      // const newY = rect.y / ((xAxisTest1 - xAxisTest) / 100);
      // console.log("x start : ", xAxisStart);
      const imageWidth = image.width;
      const imageHeight = image.height;
      console.log(
        "img width height ystart yend ",
        imageWidth,
        imageHeight,
        yAxisStart,
        yAxisEnd
      );
      //ปัญหาคือครึ่งบนสลับกับครึ่งล่าง
      const sx = (xAxisStart / 100) * imageWidth;
      const sy = ((100 - yAxisEnd) / 100) * imageHeight;
      const swidth = ((xAxisEnd - xAxisStart) / 100) * imageWidth;
      const sheight = ((yAxisEnd - yAxisStart) / 100) * imageHeight;
      console.log(sx, sy, swidth, sheight);
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

  useEffect(() => {
    console.log("grid", grid);
  }, [grid]);

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
          dataZoom: {},
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
      <button onClick={handleSetMode}>swithc</button>
      <button onClick={handleGetCurve}>curve</button>
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
