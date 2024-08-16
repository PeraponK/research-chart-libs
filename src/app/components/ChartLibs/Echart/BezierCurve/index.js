import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import { chart } from "highcharts";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { graphic } from "echarts";

const DrawBezierEchart = () => {
  const [image, setImage] = useState(null);
  const [grid, setGrid] = useState(null);
  const [points, setPoints] = useState([]);
  const [dragPoint, setDragPoint] = useState(null);
  const [drawMode, setDrawMode] = useState(true);
  const drawModeRef = useRef(drawMode);
  const [zoom, setZoom] = useState(false);
  // const [img, setImg] = useState();
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

  const chartRef = useRef();

  const handleAddImage = (e) => {
    // setImage(URL.createObjectURL(e.target.files[0]));

    const file = e.target.files[0];

    if (file) {
      const imageUrl = URL.createObjectURL(file); // Generate a URL for the image file
      const img = new Image();
      img.onload = () => {
        setImage(img); // Set the image once it is fully loaded
      };
      img.src = imageUrl; // Set the image source to the object URL

      // Optionally, revoke the object URL once it's no longer needed
      return () => URL.revokeObjectURL(imageUrl);
    }
  };

  // const handleClick = () => {}; //ติดปัญหาที่ว่าถ้าเรียกใช้ onevent โดยตรงจะกดได้แค่ datapoint ก็เลยให้มันเข้าfunctionนี่แล้วใส่dependency ที่ useeffectแทน

  // const onEvents = {
  //   click: handleClick,
  // };

  //ref
  // min: 0,
  //       max: 40000,
  //       axisLabel: {
  //         customValues: [0, 10000, 20000, 30000, 40000],
  //       },

  const handleSetX = () => {
    setAddX({
      min: parseInt(minX),
      max: parseInt(maxX),
      axisLabel: { customValues: findTickPosition(minX, maxX, tickX) },
    });
  };
  const handleSetY = () => {
    setAddY({
      min: parseInt(minY),
      max: parseInt(maxY),
      axisLabel: { customValues: findTickPosition(minY, maxY, tickY) },
      //show tick amount same as label
      axisTick: {
        alignWithLabel: true,
        customValues: findTickPosition(minY, maxY, tickY),
      },
    });
  };
  const [minX, setMinX] = useState("");
  const [minY, setMinY] = useState("");
  const [maxX, setMaxX] = useState("");
  const [maxY, setMaxY] = useState("");

  const [tickY, setTickY] = useState("");
  const [tickX, setTickX] = useState("");
  const [addX, setAddX] = useState({ min: 0, max: 100 });
  const [addY, setAddY] = useState({ min: 0, max: 100 });
  // console.log(addY);

  const findTickPosition = (min, max, tick) => {
    const minAxis = parseInt(min);
    const maxAxis = parseInt(max);
    const tickAmount = parseInt(tick);
    let setTick = (maxAxis - minAxis) / (tickAmount - 1);
    let tickInterval = [];

    // second solution
    tickInterval.push(minAxis);
    for (let i = 1; i < tickAmount - 1; i++) {
      tickInterval.push(i * setTick + minAxis);
    }
    tickInterval.push(maxAxis);

    // first solution
    // for (let i = 0; i < tickAmount; i++) {
    //   if (i === 0) {
    //     tickInterval.push(minAxis);
    //   } else if (i === tickAmount) {
    //     tickInterval.push(maxAxis);
    //   } else {
    //     tickInterval.push(minAxis + setTick * i);
    //   }
    // }

    console.log(tickInterval);

    return tickInterval;
  };

  const handleAddPoint = (point) => {
    let newPoint = {
      x: point[0],
      y: point[1],
    };
    if (drawModeRef.current === true) {
      setPoints((prev) => [...prev, newPoint]);
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

  // useEffect(() => {
  //   const chart = chartRef.current.getEchartsInstance();
  //   chart.getZr().on("click", function (params) {
  //     console.log(params);
  //     let pointClick = [params.offsetX, params.offsetY];
  //     console.log("point in pixel", pointClick);
  //     console.log(
  //       "convertfrompixel",
  //       chart.convertFromPixel("grid", pointClick)
  //     );
  //     let pointValue = chart.convertFromPixel("grid", pointClick);
  //     handleAddPoint(pointValue);
  //   });
  // }, [handleClick]);

  const handleDragPoint = () => {
    if (dragPoint !== null) {
      const chart = chartRef.current.getEchartsInstance();
      chart.getZr().on("mousemove", function (params) {
        let pointClick = [params.offsetX, params.offsetY];
        let pointValue = chart.convertFromPixel("grid", pointClick);
        const updatePoint = [...points];
        updatePoint[dragPoint] = { x: pointValue[0], y: pointValue[1] };
        setPoints(updatePoint);
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
      console.log(chart.getOption().xAxis[0]);
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
    console.log("usefdrawmode:", drawMode);
    drawModeRef.current = drawMode;
  }, [drawMode]);

  // const updateBackgroundImage = () => {
  //   if (chartRef.current !== undefined) {
  //     const chart = chartRef.current.getEchartsInstance();
  //     const rect = chart._api.getCoordinateSystems()[0].getRect();
  //     const xAxis = chart.getModel().getComponent("xAxis");
  //     const xAxisTest = chart.getModel().getComponent("xAxis").__dzAxisProxy
  //       ._percentWindow[0];
  //     const xAxisTest1 = chart.getModel().getComponent("xAxis").__dzAxisProxy
  //       ._percentWindow[1];
  //     const yAxisTest = chart.getModel().getComponent("yAxis").__dzAxisProxy
  //       ._percentWindow[0];
  //     const yAxisTest1 = chart.getModel().getComponent("yAxis").__dzAxisProxy
  //       ._percentWindow[1];

  //     // const yAxis = chart.getModel().getModel().getComponent("yAxis");
  //     console.log("x", xAxis);
  //     console.log("xtest0", xAxisTest, "xtest1", xAxisTest1);
  //     console.log("ytest0", yAxisTest, "ytest1", yAxisTest1);

  //     // console.log(xAxis, yAxis);
  //     console.log("rect", rect);
  //     chart.resize();
  //     setImg({
  //       type: "image",
  //       style: {
  //         image: image,
  //         width: 1142,
  //         height: 444,
  //       },
  //       left: 50,
  //       top: 50,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   updateBackgroundImage();
  //   window.addEventListener("resize", updateBackgroundImage);
  // }, [image]);
  const handleGetCurve = () => {};

  const updateBackgroundImage = () => {
    const chart = chartRef.current.getEchartsInstance();
    const rect = chart._api.getCoordinateSystems()[0].getRect();
    // console.log("rect", rect);
    let tmpCanvas;
    let tmpCanvasCtx;
    if (image !== null) {
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
      // console.log("x end : ", xAxisEnd);
      // console.log("y start : ", yAxisStart);
      // console.log("y end : ", yAxisEnd);
      // console.log("rect X : ", rect.x);
      // console.log("rect Y : ", rect.y);
      // console.log("rect width : ", rect.width);
      // console.log("rect height : ", rect.height);

      // x start      :  25.370159453302954
      // x end        :  75.48405466970385
      // y start      :  14.32432432432435
      // y end        :  85.67567567567569
      // rect X       :  87.80000000000001
      // rect Y       :  60
      // rect width   :  702.4000000000001
      // rect height  :  370

      //goal          :  63,25,123,125,

      tmpCanvas.width = rect.width + rect.x;
      tmpCanvas.height = rect.height + rect.y;
      // rect x rect y | crop crop |
      // tmpCanvasCtx.drawImage(image, 63, 25, 160, 380, 80, 60, 1100, 1100);
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

      //best choice
      // tmpCanvasCtx.drawImage(
      //   image,
      //   63,
      //   25,
      //   123,
      //   125,
      //   rect.x,
      //   rect.y,
      //   rect.width,
      //   rect.height
      // );

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
    // console.log(points);
  }, [points]);

  useEffect(() => {
    updateBackgroundImage();
    window.addEventListener("resize", updateBackgroundImage);
  }, [image]);

  // useEffect(() => {
  //   updateBackgroundImage();
  //   window.addEventListener("resize", updateBackgroundImage);
  // }, [image]);

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

  const options = useMemo(() => {
    const option = {
      toolbox: {
        z: 10,
        show: true,
        feature: {
          // myTool1: {
          //   show: true,
          //   title: "custom extension method 1",
          //   icon: "path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891",
          //   onclick: function () {
          //     handleSetMode();
          //   },
          // },
          dataZoom: {},
        },
      },

      title: {},
      // graphic: {
      //   elements: [...(drawCircle() || []), ...(drawCurve() || []), img],
      // },
      graphic: {
        elements: [...(drawCircle() || []), ...(drawCurve() || [])],
      },
      grid: grid,

      tooltip: {},
      xAxis: addX,
      // xAxis: {
      //   min: 0,
      //   max: 40000,
      //   // axisLabel: {
      //   //   customValues: [0, 10000, 20000, 30000, 40000],
      //   // },
      //   axisTick: {
      //     alignWithLabel: true,
      //     customValues: [0, 0.5, 1, 1.5, 2, 8, 10000],
      //   },
      // },
      yAxis: addY,
      // yAxis: {
      //   min: 0,
      //   max: 4000,
      // },
      series: [
        {
          type: "line",
          data: [],
        },
      ],
    };

    return option;
  }, [points, grid, addX, addY, zoom, grid]);

  return (
    <div>
      <button onClick={handleSetMode}>swithc</button>
      <button onClick={handleGetCurve}>curve</button>
      <ReactECharts
        option={options}
        // onEvents={onEvents}
        ref={chartRef}
        onChartReady={onChartReady}
        style={{ height: 500 }}
      />
      <input type="file" name="file" onChange={handleAddImage} />
      <Grid item>
        <Typography fontSize={35}>xAxis</Typography>
        <Grid item container direction={"row"}>
          <TextField
            value={minX}
            placeholder="min"
            onChange={(event) => setMinX(event.target.value)}
          />
          <TextField
            value={maxX}
            placeholder="max"
            onChange={(event) => setMaxX(event.target.value)}
          />
          <TextField
            value={tickX}
            placeholder="Tick"
            onChange={(event) => setTickX(event.target.value)}
          />
          <Button onClick={handleSetX}>Set</Button>
        </Grid>
      </Grid>
      <Grid item>
        <Typography fontSize={35}>yAxis</Typography>
        <Grid item container direction={"row"}>
          <TextField
            value={minY}
            placeholder="min"
            onChange={(event) => setMinY(event.target.value)}
          />
          <TextField
            value={maxY}
            placeholder="max"
            onChange={(event) => setMaxY(event.target.value)}
          />
          <TextField
            value={tickY}
            placeholder="Tick"
            onChange={(event) => setTickY(event.target.value)}
          />
          <Button onClick={handleSetY}>Set</Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default DrawBezierEchart;
