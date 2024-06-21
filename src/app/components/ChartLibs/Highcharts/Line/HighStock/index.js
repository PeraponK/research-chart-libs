import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import React, { useMemo, useState } from "react";
import HighchartsBoost from "highcharts/modules/boost";
import HighchartsZoom from "highcharts/modules/mouse-wheel-zoom";

export const HighStock = () => {
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
  const sortZone = zones.sort((a, b) => (a.value || 0) - (b.value || 0));

  let options = useMemo(() => {
    let options = {
      boost: {
        useGPUTranslations: true,
        seriesThreshold: 5,
      },
      chart: {
        zoomType: "x",
        events: { selection: selected },
        height: 700,
        width: 1500,
      },
      title: {
        text: "My chart",
      },
      subtitle: {
        text: "try subtitle",
      },
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
      series: [
        {
          name: "data1",
          data: data1,
          zones: sortZone,
          zoneAxis: "x",
        },
        {
          name: "data2",
          data: data2,
          zones: sortZone,
          zoneAxis: "x",
        },
        {
          name: "data3",
          data: data3,
          zones: sortZone,
          zoneAxis: "x",
        },
        {
          name: "data4",
          data: data4,
          zones: sortZone,
          zoneAxis: "x",
        },
        {
          name: "data5",
          data: data5,
          zones: sortZone,
          zoneAxis: "x",
        },
        {
          name: "data6",
          data: data6,
          zones: sortZone,
          zoneAxis: "x",
        },
        {
          name: "data7",
          data: data7,
          zones: sortZone,
          zoneAxis: "x",
        },
        {
          name: "data8",
          data: data8,
          zones: sortZone,
          zoneAxis: "x",
        },
        {
          name: "data9",
          data: data9,
          zones: sortZone,
          zoneAxis: "x",
        },
        {
          name: "data10",
          data: data10,
          zones: sortZone,
          zoneAxis: "x",
        },
      ],
      legend: {
        align: "right",
      },
      xAxis: {
        crosshair: true,
        plotBands: plotbands,
      },
      yAxis: {
        crosshair: true,
      },
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
