import React, { useMemo, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { LocalPizza } from "@mui/icons-material";

export const LineScale = () => {
  const handleSetX = () => {
    setAddX({
      min: parseInt(minX),
      max: parseInt(maxX),
      tickPositions: findTickPosition(minX, maxX),
    });
  };
  const handleSetY = () => {
    setAddY({
      min: parseInt(minY),
      max: parseInt(maxY),
      tickPositions: findTickPosition(minY, maxY),
    });
  };
  const [minX, setMinX] = useState(null);
  const [minY, setMinY] = useState(null);
  const [maxX, setMaxX] = useState(null);
  const [maxY, setMaxY] = useState(null);
  const [addX, setAddX] = useState({ min: null, max: null });
  const [addY, setAddY] = useState({ min: null, max: null });
  // console.log(addY);

  const findTickPosition = (min, max) => {
    const minAxis = parseInt(min);
    const maxAxis = parseInt(max);
    let setTick = (maxAxis - minAxis) / 5;

    let tickPositions = [
      minAxis,
      minAxis + setTick,
      minAxis + setTick * 2,
      minAxis + setTick * 3,
      minAxis + setTick * 4,
      maxAxis,
    ];
    console.log(min);
    return tickPositions;
  };

  const getData = () => {
    const genData = useMemo(() => {
      let data = [];
      for (let i = 0; i < 1000; i++) {
        data.push(Math.floor(Math.random() * 500) + 1);
      }
      return data;
    });
    return genData;
  };
  let data1 = getData();

  const options = {
    title: {
      text: "1000 Random Data Points Range 1-500",
    },
    series: [
      {
        data: data1,
      },
    ],
    yAxis: addY,
    xAxis: addX,
  };

  return (
    <Grid container sx={12} direction={"column"} textAlign={"left"}>
      <Grid item sx={12} sm={12} md={12} lg={12}>
        <HighchartsReact highcharts={Highcharts} options={options} />
        <Grid />
        <Grid
          container
          direction={"column"}
          item
          sx={12}
          sm={12}
          md={12}
          lg={12}
        >
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
              <Button onClick={handleSetY}>Set</Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
