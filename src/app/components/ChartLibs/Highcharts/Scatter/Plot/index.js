"use client";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import HighchartsBoost from "highcharts/modules/boost";

import React, { useMemo } from "react";

export const ScatterPlot = ({ dataset, drawEllipse }) => {
  HighchartsBoost(Highcharts);

  let options = useMemo(() => {
    let option = {
      boost: {
        useGPUTranslations: true,
        seriesThreshold: 5,
      },
      chart: {
        height: 400,
        width: 720,
        type: "scatter",
        zooming: {
          type: "xy",
        },
        events: {
          redraw: function () {
            drawEllipse(this);
          },
          load: function () {
            drawEllipse(this);
          },
        },
      },
      yAxis: { min: 90, max: 140 },
      xAxis: { min: 600, max: 1000 },

      // ...props,

      series: [
        {
          custom: {
            lassoSelection: true,
          },
          name: "data1",
          data: dataset,
          showInLegend: false,
          allowPointSelect: true,
          marker: {
            radius: 2,
            states: {
              select: {
                fillColor: "blue",
                lineWidth: 1,
              },
            },
          },
        },
      ],
    };
    return option;
  }, [drawEllipse, dataset]);
  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}

      // constructorType={"stockChart"}
    />
  );
};
