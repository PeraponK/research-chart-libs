import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import React, { useMemo, useState } from "react";
import HighchartsBoost from "highcharts/modules/boost";
import HighchartsZoom from "highcharts/modules/mouse-wheel-zoom";

export const LineSD = () => {
  HighchartsBoost(Highcharts);
  HighchartsZoom(Highcharts);
  const getData = () => {
    let base = +new Date(1988, 9, 3);
    let oneDay = 24 * 3600 * 1000;
    const genData = useMemo(() => {
      let data = [[base, Math.random() * 300]];
      for (let i = 1; i < 50000; i++) {
        let now = new Date((base += oneDay));
        data.push([
          +now,
          Math.round((Math.random() - 0.5) * 20 + data[i - 1][1]),
        ]);
      }
      return data;
    }, [base]);
    return genData;
  };

  let data1 = getData();
  let data2 = getData();
  let data3 = getData();
  let data4 = getData();
  let data5 = getData();
  let data6 = getData();
  let data7 = getData();
  let data8 = getData();
  let data9 = getData();
  let data10 = getData();

  const handleAddTemp = (x, y) => {
    const addData = {
      id: range.length + 1,
      minRange: x,
      maxRange: y,
    };
    setRange([...range, addData]);
  };

  const selected = (event) => {
    event.preventDefault();
    handleAddTemp(event.xAxis[0].min, event.xAxis[0].max);
  };

  const [range, setRange] = useState([]);

  const plotbands = range.map((item) => ({
    color: "#E0FBE2",
    from: item.minRange,
    to: item.maxRange,
  }));

  const zones = range.flatMap((item) => [
    {
      value: item.minRange,
    },
    {
      color: "#6FCC9F",
      value: item.maxRange,
    },
  ]);
  function calculateStandardDeviation(data) {
    const n = data.length;
    const mean = data.reduce((acc, val) => acc + val, 0) / n;
    const variance =
      data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
    const standardDeviation = Math.sqrt(variance);
    return standardDeviation;
  }
  const data = [10, 20, 30, 25, 35, 45, 40, 50, 60, 55, 65, 70];
  const standardDeviation = calculateStandardDeviation(data);

  let options = useMemo(() => {
    let options = {
      title: {
        text: "Historical Chart with Standard Deviation Band",
      },
      xAxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yAxis: {
        title: {
          text: "Value",
        },
      },
      series: [
        {
          name: "Data",
          data: data,
        },
      ],
      plotBands: [
        {
          from: data[data.length - 1] - standardDeviation,
          to: data[data.length - 1] + standardDeviation,
          color: "rgba(68, 170, 213, 0.2)",
          label: {
            text: "Standard Deviation Band",
            align: "center",
          },
        },
      ],
    };
    return options;
  });

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={options}
    />
  );
};
