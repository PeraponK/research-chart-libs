import HighchartsReact from "highcharts-react-official";
import Highcharts, { chart } from "highcharts/highstock";
import React, { useEffect, useMemo, useRef, useState } from "react";
import HighchartsBoost from "highcharts/modules/boost";
import HighchartsZoom from "highcharts/modules/mouse-wheel-zoom";

const LineSD = () => {
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
      const { isNumber } = H;
      H.Axis.prototype.getPlotBandPath = function (from, to, options) {
        const { start, end } = options;
        if (options === void 0) {
          options = this.options;
        }
        var toPath = this.getPlotLinePath({
            value: to,
            force: true,
            acrossPanes: options.acrossPanes,
          }),
          result = [],
          horiz = this.horiz,
          outside =
            !isNumber(this.min) ||
            !isNumber(this.max) ||
            (from < this.min && to < this.min) ||
            (from > this.max && to > this.max);
        var path = this.getPlotLinePath({
            value: from,
            force: true,
            acrossPanes: options.acrossPanes,
          }),
          i,
          // #4964 check if chart is inverted or plotband is on yAxis
          plus = 1,
          isFlat;
        if (path && toPath) {
          // Flat paths don't need labels (#3836)
          if (outside) {
            isFlat = path.toString() === toPath.toString();
            plus = 0;
          }
          // Go over each subpath - for panes in Highcharts Stock
          for (i = 0; i < path.length; i += 2) {
            var pathStart = path[i],
              pathEnd = path[i + 1],
              toPathStart = toPath[i],
              toPathEnd = toPath[i + 1];
            // Type checking all affected path segments. Consider
            // something smarter.
            if (
              (pathStart[0] === "M" || pathStart[0] === "L") &&
              (pathEnd[0] === "M" || pathEnd[0] === "L") &&
              (toPathStart[0] === "M" || toPathStart[0] === "L") &&
              (toPathEnd[0] === "M" || toPathEnd[0] === "L")
            ) {
              // Add 1 pixel when coordinates are the same
              if (horiz && toPathStart[1] === pathStart[1]) {
                toPathStart[1] += plus;
                toPathEnd[1] += plus;
              } else if (!horiz && toPathStart[2] === pathStart[2]) {
                toPathStart[2] += plus;
                toPathEnd[2] += plus;
              }
              if (start !== void 0 && end !== void 0) {
                const startPx = this.chart.xAxis[0].toPixels(start),
                  endPx = this.chart.xAxis[0].toPixels(end);
                result.push(
                  ["M", startPx, pathStart[2]],
                  ["L", endPx, pathEnd[2]],
                  ["L", endPx, toPathEnd[2]],
                  ["L", startPx, toPathStart[2]],
                  ["Z"]
                );
              } else {
                result.push(
                  ["M", pathStart[1], pathStart[2]],
                  ["L", pathEnd[1], pathEnd[2]],
                  ["L", toPathEnd[1], toPathEnd[2]],
                  ["L", toPathStart[1], toPathStart[2]],
                  ["Z"]
                );
              }
            }
            result.isFlat = isFlat;
          }
        } else {
          // outside the axis area
          path = null;
        }
        return result;
      };
    })(Highcharts);
  });

  const click = (event) => {
    // console.log(...event.yAxis);
    // console.log(...event.xAxis);
  };
  // const selected = (event) => {
  //   console.log(new Date(event.xAxis[0].min));
  //   console.log(new Date(event.xAxis[0].max));
  //   console.log(event);
  //   console.log(event.xAxis[0].min);
  //   console.log(event.xAxis[0].max);
  //   event.preventDefault();
  //   handleAddTemp(event.xAxis[0].min, event.xAxis[0].max);
  // };

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
        // events: { click: click },
        height: 400,
        // width: 1500,
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
      rangeSelector: {
        buttons: [
          {
            type: "all",
            text: "All",
            events: {
              click: function () {
                console.log("Set filter to all");
              },
            },
          },
        ],
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
      // xAxis: {
      //   plotBands: [
      //     {
      //       from: new Date("2020-01-01"),
      //       to: new Date("2030-01-01"),
      //       color: "#6FCC9F",
      //       // start: new Date("2020-01-01"),
      //       // end: new Date("2030-01-01"),
      //     },
      //   ],
      // },

      yAxis: {
        crosshair: true,
        plotBands: [
          {
            from: 0,
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
  }, [click]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={options}
    />
  );
};
export default LineSD;
