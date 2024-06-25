import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import React, { useEffect, useMemo, useState } from "react";
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

  const handleAddTemp = (x, y) => {
    const addData = {
      id: range.length + 1,
      minRange: x,
      maxRange: y,
    };
    setRange([...range, addData]);
  };
  useEffect(() => {
    (function (H) {
      H.wrap(H.PlotLineOrBand.prototype, "render", function (proceed, lines) {
        let ret = proceed.apply(this, Array.prototype.slice.call(arguments, 1));
        let { start, end } = ret.options,
          path = ret.svgElem.attr("d").split(" "),
          // [x1Index, y1Index, x2Index, y2Index] = [1, 2, 4, 5],
          // [x3Index, y3Index, x4Index, y4Index] = [7, 8, 10, 11],
          [x1Index, x2Index, x3Index, x4Index] = [1, 4, 7, 10],
          [y1Index, y2Index, y3Index, y4Index] = [2, 5, 8, 11],
          isPlotLineVertical =
            Math.abs(path[x1Index] - path[x2Index]) < 0.00001;

        if (isPlotLineVertical) {
          if (start) {
            path[y1Index] = ret.axis.chart.yAxis[0].toPixels(start);
            path[y4Index] = ret.axis.chart.yAxis[0].toPixels(start);
          }
          if (end) {
            path[y2Index] = ret.axis.chart.yAxis[0].toPixels(end);
            path[x3Index] = ret.axis.chart.yAxis[0].toPixels(end);
          }
        } else {
          if (start) {
            path[x1Index] = ret.axis.chart.xAxis[0].toPixels(start);
            path[x4Index] = ret.axis.chart.xAxis[0].toPixels(start);
          }
          if (end) {
            path[x2Index] = ret.axis.chart.xAxis[0].toPixels(end);
            path[x3Index] = ret.axis.chart.xAxis[0].toPixels(end);
          }
        }

        ret.svgElem.attr({ d: path.join(" ") });

        return ret;
      });
    })(Highcharts);
  }, []);

  const click = (event) => {
    console.log(...event.yAxis);
    console.log(...event.xAxis);
  };
  const selected = (event) => {
    console.log(new Date(event.xAxis[0].min));
    console.log(new Date(event.xAxis[0].max));
    console.log(event);
    console.log(event.xAxis[0].min);
    console.log(event.xAxis[0].max);
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
  // console.log(zones);
  const sortZone = zones.sort((a, b) => (a.value || 0) - (b.value || 0));

  let options = useMemo(() => {
    let options = {
      boost: {
        useGPUTranslations: true,
        seriesThreshold: 5,
      },
      chart: {
        zoomType: "x",
        events: { click: click },
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
        },
      ],
      legend: {
        align: "right",
      },

      yAxis: {
        crosshair: true,
        plotBands: [
          {
            from: 1,
            to: 300,
            color: "#6FCC9F",
            start: 1,
            end: 1324534544321,
          },
          {
            from: 300,
            to: 500,
            color: "#6FCC9F",
            start: 1324534544321,
            end: 2915532330810,
          },
          {
            from: 500,
            to: 800,
            color: "#6FCC9F",
            start: 2915532330810,
            end: 3594998918918,
          },

          {
            from: 500,
            to: 100,
            color: "#6FCC9F",
            start: 3594998918918,
            end: 4907001600000,
          },
        ],
      },
      tooltip: {
        formatter: function () {
          return (
            "Date : <b>" +
            new Date(this.x) +
            "</b>, value <b>" +
            this.y +
            "</b>, in series " +
            this.series.name
          );
        },
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
