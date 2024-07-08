"use client";

import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";

import React, { useMemo } from "react";

export const ScatterPlot = ({ dataset, drawEllipse }) => {
  // const drawEllipses = (chart) => {
  // console.log(chart);
  // console.log("chartt", chart);
  // const cResult = calculateClusterParameters(clusterData);
  // const x1 = chart.xAxis[0].toPixels(cResult.cx - cResult.rx);
  // const x2 = chart.xAxis[0].toPixels(cResult.cx + cResult.rx);
  // const y1 = chart.yAxis[0].toPixels(cResult.cy - cResult.ry);
  // const y2 = chart.yAxis[0].toPixels(cResult.cy + cResult.ry);
  // const angleX = chart.xAxis[0].toPixels(cResult.cx);
  // const angleY = chart.yAxis[0].toPixels(cResult.cy);
  // const rectClass = "operating-point-ellipse";
  // document.querySelectorAll(`.${rectClass}`).forEach((el) => el.remove());
  // const ellipse = chart.renderer
  //   .rect(x1, y2, x2 - x1, y1 - y2, "50%")
  //   .attr({
  //     "stroke-width": 1,
  //     stroke: "green",
  //     fill: "green",
  //     "fill-opacity": 0.2,
  //     zIndex: 10,
  //   })
  //   .addClass(rectClass)
  //   .add();
  // ellipse.attr({
  //   transform: `rotate(, ${angleX}, ${angleY})`,
  // });
  // };
  //   console.log(drawEllipse);

  let options = useMemo(() => {
    let option = {
      chart: {
        height: 800,
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
