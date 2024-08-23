import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactECharts from "echarts-for-react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { drawV3JSON } from "../../../Highcharts/Line/DrawBezierV3/data";
import {
  bezierData,
  brushCoordData,
  brushData,
  onlyRect,
  scatterData,
} from "./data";
import { CheckBox } from "@mui/icons-material";
import { range } from "d3";

const EchartBezierPlot = () => {
  //ใส่ check เข้าไปแล้วถ้ากดก็ onChange handle เปลี่ยนเปลี่ยนเป็น true แล้วใช้ if check ว่า เป็น true หรือ false เพื่อส่งค่าโชว์ขึ้น
  const chartRef = useRef();
  // const [tempBrushData, setTempBrushData] = useState(brushData[0].areas);
  const [tempBrushData, setTempBrushData] = useState(
    brushCoordData.areas.map((item, index) => ({
      __rangeOffset: item.__rangeOffset,
      panelId: item.panelId,
      coordRange: item.coordRange,
      coordRanges: item.coordRanges,
      id: index,
      brushType: item.brushType,
      range: item.range,
      isCheck: false,
    }))
  );
  console.log("areas", brushCoordData.areas);
  console.log("temp", tempBrushData);

  const [brush, setBrush] = useState([]);
  const [points, setPoints] = useState([]);
  const [brushRange, setBrushRange] = useState([]);
  const [checked, setChecked] = useState([true, false]);
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

  const drawCurve = () => {
    // console.log("drawCurve");
    if (chartRef.current !== undefined) {
      const chart = chartRef.current.getEchartsInstance();
      // console.log("drawCurve problem", chart);

      const getPath = bezierData;
      // console.log(getPath);
      // console.log("path for draw curve : ", getPath);
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
  // console.log(data);
  const data1 = data.slice(0, 11);
  // console.log(data1);
  //   console.log(pathData.length);

  let tempData = [];
  for (let i = 0; i < pathData.length; i++) {
    i === 0
      ? tempData.push(data.slice(0, 1000))
      : tempData.push(data.slice(i * 1000, (i + 1) * 1000));
  }
  //   const testData = data.map((item) => pathData);
  //   console.log(data);
  // const series = tempData.map((data, index) => ({
  //   name: `data ${index}`,
  //   type: "line",
  //   data: data.map((item) => [item.x, item.y]),
  // }));
  useEffect(() => {
    // console.log("brushRange :", brushRange);
  }, [brushRange]);

  const series = {
    name: "data1",
    type: "scatter",
    data: scatterData,
  };
  useEffect(() => {
    const chart = chartRef.current.getEchartsInstance();
    chart.on("brush", function (params) {
      // params.areas.map((item) => console.log(item));
      // console.log("brush!");
      // console.log(params);
      // console.log(params.areas);
    });
  });

  const handleAddBrush = (params) => {
    const chart = chartRef.current.getEchartsInstance();
    chart.on("brush", function (params) {
      console.log(params);
      console.log(JSON.stringify(params));
      // setBrushRange(
      //   params.areas.map((item, index) => ({
      //     window: index,
      //     type: item.brushType,
      //     range: item.coordRange,
      //   }))
      // );
    });
  };
  // console.log(JSON.stringify())

  const handleGetBrush = () => {
    const chart = chartRef.current.getEchartsInstance();
    chart.on("brush", function (params) {
      console.log(JSON.stringify(params));
      const newRange = setBrushRange();
      // console.log(params.map((item, index) => item.areas[index].brushStyle));
      chart.off("brush");
    });
  };

  // const test = series.map((item) => item[0]);
  // console.log("test", test);
  // console.log("sere", series);
  // console.log("brushData", ...brushData);
  // const getBrushData = brushData;
  // console.log("onlyRect", JSON.stringify(onlyRect));
  // console.log("temp", tempBrushData);
  // const isFalse = tempBrushData.filter((item) => item.isCheck === false);
  // console.log("isFalse", isFalse);

  const testBrush = () => {
    const chart = chartRef.current.getEchartsInstance();
    chart.dispatchAction({
      type: "brush",
      brushId: "\u0000series\u00000\u00000",
      // areas: tempBrushData,
      // areas: tempBrushData.map((item) => ({
      //   brushType: item.brushType,
      //   range: item.range,
      // })),
      // areas: tempBrushData.map((item) => {
      //   if (tempBrushData.isCheck === true) {
      //     ({ brushType: item.brushType, range: item.range });
      //   }
      // }),
      areas: tempBrushData.filter((item) => item.isCheck === true),
    });
  };

  useEffect(() => {
    if (chartRef.current !== null) {
      const chart = chartRef.current.getEchartsInstance();
      chart.on("dataZoom", function (event) {
        handleZoom();
      });
    }
  });

  const handleZoom = () => {
    setZoom(!zoom);
  };

  useEffect(() => {
    const chart = chartRef.current.getEchartsInstance();

    chart.dispatchAction({
      type: "brush",
      brushId: "\u0000series\u00000\u00000",
      areas: tempBrushData.filter((item) => item.isCheck === true),
      // areas: tempBrushData,
      // $from: "\u0000series\u00000\u00000",
    });
  }, [tempBrushData, zoom]);

  useEffect(() => {
    // console.log(tempBrushData);
  }, [tempBrushData]);

  const handleCheck = (index) => {
    setTempBrushData(
      tempBrushData.map((item) => {
        if (item.id === index) {
          return { ...item, isCheck: !item.isCheck };
        }
        return item;
      })
    );

    // setChecked([event.target.checked, checked[1]]);
  };
  useEffect(() => {
    if (tempBrushData.every((item) => item.isCheck === true)) {
      console.log("trueeee");
      setChecked([true, true]);
    } else if (tempBrushData.every((item) => item.isCheck === false)) {
      setChecked([false, false]);
    } else if (
      tempBrushData.some((item) => item.isCheck === true)
      // tempBrushData.every((item) => item.isCheck === true)
    ) {
      setChecked([true, false]);
    }
  }, [tempBrushData]);

  useEffect(() => {
    // console.log("tempb", tempBrushData);
    // console.log("checked", checked);
  }, [tempBrushData, checked]);
  //mui checkbox
  const displayWindow = (
    <Box sx={{ display: "flex", flexDirection: "column", ml: 3 }}>
      {tempBrushData.map((item, index) => (
        <FormControlLabel
          label={index}
          control={
            <Checkbox
              checked={item.isCheck}
              onChange={() => handleCheck(index)}
            />
          }
        />
      ))}
    </Box>
  );

  const handleChangeAll = () => {
    if (checked[0] === true && checked[1] === true) {
      console.log("first");
      setTempBrushData(
        tempBrushData.map((item) => {
          if (item.isCheck === true) {
            return { ...item, isCheck: false };
          }
          return item;
        })
      );
      setChecked([event.target.checked, event.target.checked]);
    }
    if (checked[0] === false && checked[1] === false) {
      setTempBrushData(
        tempBrushData.map((item) => {
          if (item.isCheck === false) {
            return { ...item, isCheck: true };
          }
          return item;
        })
      );
      console.log("2");
      setChecked([event.target.checked, event.target.checked]);
    }
    if (checked[0] !== checked[1]) {
      console.log("aaaa");
      setTempBrushData(
        tempBrushData.map((item) => {
          if (item.isCheck === false) {
            return { ...item, isCheck: true };
          }
          return item;
        })
      );
      setChecked([event.target.checked, event.target.checked]);
    }
    // if (tempBrushData.some((item) => item.isCheck === false)) {
    //   setTempBrushData(
    //     tempBrushData.map((item) => {
    //       if (item.isCheck === false) {
    //         return { ...item, isCheck: true };
    //       }
    //       return item;
    //     })
    //   );
    // }
    // if (tempBrushData.every((item) => item.isCheck === true)) {
    //   setTempBrushData(
    //     tempBrushData.map((item) => {
    //       if (item.isCheck === true) {
    //         return { ...item, isCheck: false };
    //       }
    //       return item;
    //     })
    //   );
    // }
  };

  const options = useMemo(() => {
    const option = {
      toolbox: {
        show: true,
        feature: {
          brush: {},

          dataZoom: {},

          saveAsImage: {},
        },
      },
      graphic: {
        elements: [...(drawCurve() || [])],
      },
      title: {},

      tooltip: {},
      brush: {
        yAxisIndex: "0",
        xAxisIndex: "0",
        // outOfBrush: {
        //   colorAlpha: 1,
        // },
        brushStyle: {
          borderWidth: 1,
          // color: "none",
          borderColor: "blue",
        },
        toolbox: ["rect", "polygon", "lineX", "lineY", "keep", "clear"],
        // xAxisIndex: 0,
      },
      // brush: {
      //   toolbox: ["lineX", "clear"],
      //   xAxisIndex: "all",
      //   throttleType: "debounce",
      //   throttleDelay: 300,
      //   outOfBrush: {
      //     colorAlpha: 0.1,
      //   },
      // },
      //   xAxis: addX,
      xAxis: { min: 0, max: 40000 },
      yAxis: { min: 0, max: 3500 },
      //   yAxis: addY,

      series: series,
    };
    return option;
  }, [points, chartRef.current]);

  return (
    <div>
      {/* <button onClick={testBrush}>test brush</button> */}
      <button onClick={handleGetBrush}>get brush</button>
      <button onClick={handleAddBrush}>add brush</button>
      <ReactECharts option={options} ref={chartRef} style={{ height: 500 }} />
      <ul>
        {tempBrushData.map((item, index) => (
          <div key={item.panelId}>
            <div>
              <input type="checkbox" onChange={() => handleCheck(index)} />
              window
              {index}({item.brushType})
            </div>
          </div>
        ))}
      </ul>
      <FormControlLabel
        label="Parent"
        control={
          <Checkbox
            checked={checked[0] && checked[1]}
            indeterminate={checked[0] !== checked[1]}
            onChange={handleChangeAll}
          />
        }
      />
      {displayWindow}
    </div>
  );
};

export default EchartBezierPlot;
