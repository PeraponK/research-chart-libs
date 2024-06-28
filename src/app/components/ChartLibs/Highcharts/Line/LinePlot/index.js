import HighchartsReact from "highcharts-react-official";
import React, { useMemo, useState } from "react";
import Highcharts, { Legend, chart, charts, color } from "highcharts";
import HighchartsBoost from "highcharts/modules/boost";
import HighchartsZoom from "highcharts/modules/mouse-wheel-zoom";

export const LinePlot = () => {
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

  const handleAddTemp = (x, y) => {
    const addData = {
      id: range.length + 1,
      minRange: x,
      maxRange: y,
    };
    setRange([...range, addData]);
    // console.log(range);
  };

  let dataMarker = [];
  for (let i = 0; i < 100; i++) {
    dataMarker.push(Math.floor(Math.random() * 100) + 1);
  }

  const handleDataMarker = dataMarker.map((item) => {
    const setMarker = {
      y: item,
      marker: {
        symbol:
          item > 80
            ? "triangle"
            : "url(https://cdn-icons-png.freepik.com/256/272/272340.png?semt=ais_hybrid)",
        width: 20,
        height: 20,
      },
      alert: item > 80 ? ">=80%" : "<80%",
    };
    return setMarker;
  });

  const selected = (event) => {
    event.preventDefault();
    console.log(event);
    console.log(event.xAxis[0].min, event.xAxis[0].max);
    handleAddTemp(event.xAxis[0].min, event.xAxis[0].max);
  };

  //range data
  const [range, setRange] = useState([
    // { id: 2, minRange: 4, maxRange: 6 },
    // { id: 1, minRange: 1, maxRange: 2 },
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
  //test zones
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
  const sortZone = zones.sort((a, b) => (a.value || 0) - (b.value || 0));
  //options for highchart
  let options = useMemo(() => {
    let options = {
      boost: {
        useGPUTranslations: true,
        // Chart-level boost when there are more than 5 series in the chart
        seriesThreshold: 5,
      },
      chart: {
        zooming: {
          mouseWheel: {
            type: "x",
          },
        },

        zoomType: "x",
        // events: { selection: selected },
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
            enabled: true,
            states: {
              hover: {
                enabled: true,
              },
            },
          },
        },
      },

      series: [
        {
          data: handleDataMarker,
          point: {
            events: {
              click: function () {
                alert(this.alert);
              },
            },
          },
        },
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
      },
    };
    return options;
  });

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
