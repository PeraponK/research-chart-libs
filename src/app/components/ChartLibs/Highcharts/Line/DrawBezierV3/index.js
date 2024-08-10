import React, { useRef, useEffect, useState, useMemo } from "react";
import Highcharts, { chart } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import zIndex from "@mui/material/styles/zIndex";
import { drag } from "d3";
import { Button, Grid, TextField, Typography } from "@mui/material";

const DrawBezierV3 = () => {
  const chartRef = useRef();

  const handleSetX = () => {
    setAddX({
      min: parseInt(minX),
      max: parseInt(maxX),
      tickPositions: findTickPosition(minX, maxX, tickX),
    });
  };
  const handleSetY = () => {
    setAddY({
      min: parseInt(minY),
      max: parseInt(maxY),
      tickPositions: findTickPosition(minY, maxY, tickY),
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

  const [image, setImage] = useState(null);

  const handleImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const [point, setPoint] = useState([]);
  // const [dataPoint, setDataPoint] = useState([]);
  const [dragPoint, setDragPoint] = useState(null);

  const handleAddPoint = (e) => {
    let newPoint = {
      x: e.xAxis[0].value,
      y: e.yAxis[0].value,
    };
    console.log("np", newPoint);

    setPoint((prev) => [...prev, newPoint]);
  };

  // const pathData =
  //   "M 355.55555555555554 52.43445692883895 C 10666.666666666668 209.7378277153558, 24444.444444444445 904.4943820224719, 35022.222222222226 1822.0973782771534";
  // function cubicBezierInterpolation(p0, p1, p2, p3, t) {
  //   let x =
  //     Math.pow(1 - t, 3) * p0[0] +
  //     3 * Math.pow(1 - t, 2) * t * p1[0] +
  //     3 * (1 - t) * Math.pow(t, 2) * p2[0] +
  //     Math.pow(t, 3) * p3[0];
  //   let y =
  //     Math.pow(1 - t, 3) * p0[1] +
  //     3 * Math.pow(1 - t, 2) * t * p1[1] +
  //     3 * (1 - t) * Math.pow(t, 2) * p2[1] +
  //     Math.pow(t, 3) * p3[1];
  //   return [x, y];
  // }

  // // Parse the path data to get control points
  // let points = pathData.match(/[0-9.]+/g).map(Number);
  // let p0 = [points[0], points[1]];
  // let p1 = [points[2], points[3]];
  // let p2 = [points[4], points[5]];
  // let p3 = [points[6], points[7]];

  // let data = [];

  // for (let i = 0; i <= 1; i += 0.1) {
  //   let point = cubicBezierInterpolation(p0, p1, p2, p3, i);
  //   data.push({ x: point[0], y: point[1] });
  // }

  const drawPoint = (chart) => {
    const xAxis = chart.xAxis[0];
    const yAxis = chart.yAxis[0];

    if (chart.drawCircle) {
      chart.drawCircle.forEach((item) => item.destroy());
    }

    chart.drawCircle = point.map((point, index) => {
      // console.log(xAxis.toPixels(0));
      // console.log("value", xAxis.toValue(point.x));
      // console.log("pixel", xAxis.toPixels(point.x));
      const x = xAxis.toPixels(point.x);
      const y = yAxis.toPixels(point.y);
      // const xChart = point.x; //datapoint by value
      // const yChart = point.y; //datapoint by value

      return chart.renderer
        .circle(x, y, 5)
        .attr({
          fill: "red",
          zIndex: 10,
        })
        .on("mousedown", () => setDragPoint(index))
        .add();
    });
  };

  const handleDragPoint = (e) => {
    if (dragPoint !== null) {
      console.log(dragPoint);
      // console.log("e", e);
      // console.log("dragging");
      const chart = chartRef.current.chart;
      const xAxis = chart.xAxis[0];
      const yAxis = chart.yAxis[0];
      // console.log("x", e.chartX);
      // console.log("y", e.chartY);
      // console.log("toValueX", xAxis.toValue(e.chartX));
      // console.log("toValueY", yAxis.toValue(e.chartY));
      // console.log("toPixelsX", xAxis.toPixels(e.chartX));
      const updatePoint = [...point];

      updatePoint[dragPoint] = {
        x: xAxis.toValue(e.chartX),
        y: yAxis.toValue(e.chartY),
      };

      setPoint(updatePoint);
    }
    // point[dragPoint].x = xAxis.toValue(e.chartX);
    // point[dragPoint].y = xAxis.toValue(e.chartY);
    // console.log(point);
    // console.log("xAxis", xAxis);
    // console.log("xAxis", xAxis.toValue);
    // point[dragPoint].x = xAxis;

    // console.log("e", e);
  };

  const handleMouseUp = () => {
    // console.log("up");
    setDragPoint(null);
    // console.log("up");
    // console.log("pointnull", dragPoint);
  };

  const drawCurve = (chart) => {
    // console.log("dc", chart);
    const xAxis = chart.xAxis[0];
    const yAxis = chart.yAxis[0];

    if (point.length >= 4) {
      const pathPoint = point.map((item) => ({
        x: xAxis.toPixels(item.x),
        y: yAxis.toPixels(item.y),
      }));

      // if (chart.drawCurve) {
      //   console.log("first");
      // }
      // console.log("pp", pathPoint);
      // console.log("cd", chart.drawCurve);
      if (chart.drawCurve) {
        // console.log("check this");
        chart.drawCurve.forEach((item) => item.destroy());
      }

      const getPath = handleGetPath(pathPoint);
      console.log(JSON.stringify(getPath));

      // chart.drawCurve = [];

      chart.drawCurve = getPath.map((item) => {
        return chart.renderer
          .path()
          .attr({
            stroke: "red",
            zIndex: 10,
            d: item,
          })
          .add();
      });

      // getPath.map((item) => {
      //   if (!chart.drawCurve) {
      //     chart.drawCurve = chart.renderer
      //       .path()
      //       .attr({ stroke: "red", zIndex: 10 })
      //       .add();
      //   }
      //   chart.drawCurve.attr({ d: item });
      // });

      // for (let i = 0; i < getPath.length; i++) {
      //   if (!chart.drawCurve) {
      //     chart.drawCurve = chart.renderer
      //       .path()
      //       .attr({
      //         stroke: "red",
      //         zIndex: 10,
      //       })
      //       .add();
      //     console.log("added");
      //   }
      //   chart.drawCurve.attr({ d: getPath[i] });
      //   console.log("path");
      // }
      //   if (!chart.drawCurve) {
      //     chart.drawCurve = chart.renderer
      //       .path()
      //       .attr({
      //         stroke: "red",
      //         zIndex: 10,
      //       })
      //       .add();
      //     console.log("added");

      //     // }
      //   }
      // chart.drawCurve.attr({ d: getPath });
      // console.log("path");
    }
  };

  const handleGetPath = (pathPoint) => {
    const times = Math.floor(pathPoint.length / 4);
    let tempArr = [];
    // console.log("times", times);
    for (let i = 0; i < times; i++) {
      i === 0
        ? tempArr.push(pathPoint.slice(0, 4))
        : tempArr.push(pathPoint.slice(i * 4, (i + 1) * 4));
    }
    // console.log(tempArr);
    // console.log(tempArr[0][0].x);
    // console.log(tempArr.length);
    let path = [];
    for (let i = 0; i < tempArr.length; i++) {
      path.push(
        `M ${tempArr[i][0].x} ${tempArr[i][0].y} C ${tempArr[i][1].x} ${tempArr[i][1].y}, ${tempArr[i][2].x} ${tempArr[i][2].y}, ${tempArr[i][3].x} ${tempArr[i][3].y}`
      );
    }
    // console.log(path);

    // path = `M ${pathPoint[0].x} ${pathPoint[0].y} C ${pathPoint[1].x} ${pathPoint[1].y},${pathPoint[2].x} ${pathPoint[2].y}, ${pathPoint[3].x} ${pathPoint[3].y}`;
    return path;
  };

  const handleGetDataPoint = () => {
    if (point.length >= 4) {
      const times = Math.floor(point.length / 4);

      let tempData = [];
      for (let i = 0; i < times; i++) {
        i === 0
          ? tempData.push(point.slice(0, 4))
          : tempData.push(point.slice(i * 4, (i + 1) * 4));
      }
      console.log("json here", JSON.stringify(tempData));
      console.log(tempData);
    }
  };

  useEffect(() => {
    // console.log(dragPoint);
    document.addEventListener(
      "mousemove",
      handleDragPoint
      // dragPoint !== null ? handleDragPoint : console.log("no point selected")
    );
    document.addEventListener("mouseup", handleMouseUp);
    return () => (
      document.removeEventListener("mousemove", handleDragPoint),
      document.removeEventListener("mouseup", handleMouseUp)
    );
    // const chart = chartRef.current.chart;
    // console.log(chart);
    // if (dragPoint !== null) {
    //   handleDragPoint(chart);
    // }
  }, [dragPoint, point]);

  //for check value only
  useEffect(() => {
    // console.log("ppp", JSON.stringify(point));
  }, [point]);

  const options = useMemo(() => {
    const options = {
      chart: {
        events: {
          load: function () {
            drawPoint(this);
            drawCurve(this);
          },
          click: function (e) {
            handleAddPoint(e);
            console.log(e);
          },
          render: function () {
            drawPoint(this);
            drawCurve(this);
          },
        },

        plotBackgroundImage: image,
        // width: "400",
        type: "spline",
      },
      title: {
        text: "V3 or lastest version",
      },
      series: [
        {
          // data: data.map((item) => [item.x, item.y])
        },
      ],
      xAxis: { type: "linear" },

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
      yAxis: addY,
      xAxis: addX,

      // xAxis: {
      //   min: 0,
      //   max: 12,
      //   tickPositions: [0, 2, 4, 6, 8, 10, 12],
      // },
      // yAxis: {
      //   min: 0,
      //   max: 3500,
      //   tickPositions: [0, 500, 1000, 1500, 2000, 2500, 3000, 3500],
      // },
    };
    return options;
  }, [image, point, addX, addY]);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartRef}
      />
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
      <button id="clear-btn">Clear</button>
      <Button onClick={handleGetDataPoint}>json</Button>
      <input type="file" name="file" onChange={handleImage} />
    </div>
  );
};
export default DrawBezierV3;
