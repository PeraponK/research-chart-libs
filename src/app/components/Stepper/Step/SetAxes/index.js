import React, { useEffect, useMemo, useState } from "react";
import ReactECharts from "echarts-for-react";
import { Button, Grid, TextField, Typography } from "@mui/material";

const StepSetAxes = ({ img, onXAxisUpdate, onYAxisUpdate }) => {
  // console.log("img", img);
  const handleSetX = () => {
    setAddX({
      min: parseInt(minX),
      max: parseInt(maxX),
      axisLabel: { customValues: findTickPosition(minX, maxX, tickX) },
    });
    onYAxisUpdate(addX);
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

    console.log(tickInterval);

    return tickInterval;
  };

  useEffect(() => {
    onXAxisUpdate(addX);
    onYAxisUpdate(addY);
  }, [addY, addX]);

  const option = useMemo(() => {
    const option = {
      // xAxis: {
      //   type: "category",
      //   data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      // },
      // yAxis: {
      //   type: "value",
      // },
      xAxis: addX,
      yAxis: addY,

      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: "line",
        },
      ],
    };
    return option;
  }, [addX, addY]);

  return (
    <div>
      <ReactECharts option={option} />
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
      <img
        src={img}
        alt="Cropped"
        style={{ width: "200px", height: "200px" }}
      />
    </div>
  );
};

export default StepSetAxes;
