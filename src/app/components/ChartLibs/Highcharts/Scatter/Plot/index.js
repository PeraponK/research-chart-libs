"use client";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import HighchartsBoost from "highcharts/modules/boost";

import React, { useMemo } from "react";

// export const ScatterPlot = ({ series }) => {
export const ScatterPlot = ({ series, drawEllipse }) => {
  HighchartsBoost(Highcharts);
  // console.log(JSON.stringify(series));
  let options = useMemo(() => {
    let option = {
      plotOptions: {},

      boost: {
        useGPUTranslations: true,
        //   // seriesThreshold: 5,
      },
      chart: {
        zooming: {
          type: "xy",
        },

        // width: 720,
        type: "scatter",
        zoomType: "xy",
        events: {
          redraw: function () {
            // drawEllipse(this);
          },
          load: function () {
            // drawEllipse(this);
          },
        },
      },
      xAxis: {
        type: "linear",
        title: {
          text: "x",
        },
        min: 600,
        max: 1000,
      },

      // yAxis: {
      //   type: "linear",
      // },

      yAxis: { min: 90, max: 140 },
      // xAxis: { min: 600, max: 1000 },
      // yAxis: { min: -100, max: 200 },
      // xAxis: { min: 0, max: 1000 },

      // ...props,
      // tooltip: {
      //   formatter: function () {
      //     return "x :<b>" + this.x + "</b><br/>" + "y: " + this.y;
      //   },
      // },

      series: [
        {
          // boostThreshold: 50000,
          name: "data1",
          data: series,
          showInLegend: false,
          allowPointSelect: true,
          marker: {
            radius: 1,
            states: {
              select: {
                fillColor: "blue",
                lineWidth: 1,
              },
            },
          },

          // point: {
          //   events: {
          //     click: function () {
          //       alert("x : " + this.x + " y : " + this.y);
          //     },
          //   },
          // },
        },
      ],
    };
    return option;
    // }, [drawEllipse, series]);
  }, [series]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      // constructorType={"stockChart"}
    />
  );
};
