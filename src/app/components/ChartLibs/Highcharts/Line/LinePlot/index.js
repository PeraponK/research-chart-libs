import HighchartsReact from "highcharts-react-official";
import React, { useMemo, useState } from "react";
import Highcharts, { Legend, chart, charts, color } from "highcharts";
import HighchartsBoost from "highcharts/modules/boost";
// let data2 = [[base, Math.random() * 300]];
// for (let i = 1; i < 500; i++) {
//   let now = new Date((base += oneDay));
//   data2.push([+now, Math.round((Math.random() - 0.5) * 20 + data2[i - 1][1])]);
// }

export const LinePlot = () => {
  HighchartsBoost(Highcharts);
  const getData = () => {
    let base = +new Date(1988, 9, 3);
    let oneDay = 24 * 3600 * 1000;
    const genData = useMemo(() => {
      let data = [[base, Math.random() * 300]];
      for (let i = 1; i < 5000; i++) {
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
    // console.log(range);
  };

  const selected = (event) => {
    event.preventDefault();
    console.log(event);
    console.log(event.xAxis[0].min, event.xAxis[0].max);
    handleAddTemp(event.xAxis[0].min, event.xAxis[0].max);
  };

  //range data
  const [range, setRange] = useState([
    // { id: 1, minRange: 1, maxRange: 2 },
    // { id: 2, minRange: 4, maxRange: 6 },
    // { id: 3, minRange: 8, maxRange: 10 },
  ]);
  //population data
  const [pop, setPop] = useState([
    {
      name: "Thailand",
      pop: 71.1,
      cost: 50,
    },
    {
      name: "Singapore",
      pop: 50.7,
      cost: 70,
    },
    {
      name: "Finland",
      pop: 61.7,
      cost: 40,
    },
    {
      name: "China",
      pop: 259.4,
      cost: 35,
    },
  ]);

  //map plotbands
  const plotbands = range.map((item) => ({
    color: "#E0FBE2",
    from: item.minRange,
    to: item.maxRange,
  }));
  //console.log(plotbands);
  //test data
  const test = [
    {
      color: "#F075AA",
      value: 1,
    },
    {
      color: "#102C57",
      value: 2,
    },
    {
      color: "#F075AA",
      value: 4,
    },
    {
      color: "#102C57",
      value: 6,
    },
    {
      color: "#F075AA",
      value: 8,
    },
    {
      color: "#102C57",
      value: 10,
    },
  ];
  //console.log(test);

  //map zones
  const zones = range.flatMap((item) => [
    {
      // color: "#F075AA",
      value: item.minRange,
    },
    {
      color: "#6FCC9F",
      value: item.maxRange,
    },
  ]);
  //options for highchart
  let options = useMemo(() => {
    let options = {
      boost: {
        useGPUTranslations: true,
        // Chart-level boost when there are more than 5 series in the chart
        seriesThreshold: 5,
      },
      chart: {
        // zooming: {
        //   mouseWheel: true,
        //   type: "xy",
        // },
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
          zones: zones,
          zoneAxis: "x",
        },
        {
          name: "data2",
          data: data2,
          zones: zones,
          zoneAxis: "x",
        },
        {
          name: "data3",
          data: data3,
          zones: zones,
          zoneAxis: "x",
        },
        {
          name: "data4",
          data: data4,
          zones: zones,
          zoneAxis: "x",
        },
        {
          name: "data5",
          data: data5,
          zones: zones,
          zoneAxis: "x",
        },
        {
          name: "data6",
          data: data6,
          zones: zones,
          zoneAxis: "x",
        },
        {
          name: "data7",
          data: data7,
          zones: zones,
          zoneAxis: "x",
        },
        {
          name: "data8",
          data: data8,
          zones: zones,
          zoneAxis: "x",
        },
        {
          name: "data9",
          data: data9,
          zones: zones,
          zoneAxis: "x",
        },
        {
          name: "data10",
          data: data10,
          zones: zones,
          zoneAxis: "x",
        },

        // {
        //   type: "area",

        //   data: [
        //     29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5,
        //     //   { y: 216.4, marker: { fillColor: "#BF0B23", radius: 2 } },
        //     194.1, 95.6, 54.4,
        //   ],
        //   zoneAxis: "x",
        //   zones: zones,
        // },

        // {
        //   // type: "area",
        //   name: "second data",
        //   data: data2,
        //   // data: [
        //   //   29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5,
        //   //   //   { y: 216.4, marker: { fillColor: "#BF0B23", radius: 2 } },
        //   //   194.1, 95.6, 54.4,
        //   // ],
        //   zoneAxis: "x",
        //   zones: zones,
        // },
      ],
      legend: {
        align: "right",
      },

      tooltip: {
        formatter: function () {
          return (
            "The value for <b>" +
            this.x +
            "</b> is <b>" +
            this.y +
            "</b>, in series " +
            this.series.name
          );
        },
      },
      xAxis: {
        crosshair: true,
        plotBands: plotbands,
      },
      yAxis: {
        crosshair: true,
        //   plotBands: [
        //     {
        //       color: "orange", // Color value
        //       from: 50, // Start of the plot band
        //       to: 30, // End of the plot band
        //     },
        //   ],
      },
    };
    return options;
  });

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};