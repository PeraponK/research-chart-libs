"use client";

import React, { useEffect, useMemo, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { readCSV } from "./data";

export const Scatter = () => {
  const [data, setData] = useState([]);
  const test = async () => {
    let parsedData = await readCSV("public/master_tablein-1.csv");
    setData(parsedData);
  };
  function calculateClusterParameters(cluster) {
    const cx = cluster.xClusterCenter;
    const cy = cluster.yClusterCenter;
    const xSd = cluster.xSd;
    const ySd = cluster.ySd;
    const sdMultiple = cluster.sdMultiple;
    const angleDeg = cluster.angleDeg;

    const rx = xSd * sdMultiple;
    const ry = ySd * sdMultiple;
    const angleRad = angleDeg * (Math.PI / 180);

    return { cx, cy, rx, ry, angleRad };
  }
  const cluster1 = {
    clusterId: 1,
    lowest: 4800,
    xClusterCenter: 300,
    yClusterCenter: 250,
    xSd: 40.008,
    ySd: 10.613,
    angleDeg: 90,
    sdMultiple: 2,
    th: 4,
  };

  const cResult = calculateClusterParameters(cluster1);

  useEffect(() => {
    test();
  }, []);

  let dataScatter = [];
  data.map((item) =>
    dataScatter.push([
      new Date(item.TimeStamp).getTime(),
      parseFloat(item.BYA_PLC_TT3201_PV),
    ])
  );
  console.log(dataScatter);

  const getData = () => {
    let data = [];
    for (let i = 0; i < 10; i++) {
      let x = Math.random() * 100;
      let y = Math.random() * 100;
      data.push([x, y]);
    }
    return data;
  };

  let data1 = getData();
  let data2 = getData();
  let data3 = getData();
  let data4 = getData();
  let options = useMemo(() => {
    let option = {
      chart: {
        type: "scatter",
        zooming: {
          type: "xy",
        },
        events: {
          load: function () {
            const renderer = this.renderer;
            const ellipse = renderer
              .createElement("ellipse")
              .attr({
                cx: cResult.cx,
                cy: cResult.cy,
                rx: cResult.rx,
                ry: cResult.ry,
                // rotation: cResult.angleRad,
                "stroke-width": 2,
                stroke: "blue",
                fill: "none",
                zIndex: 3,
              })
              .add();
            ellipse.attr({
              transform: `rotate(${cluster1.angleDeg}, ${cResult.cx}, ${cResult.cy})`,
            });
          },
        },
      },

      title: {
        text: "Select points by click-drag",
      },

      // xAxis: {
      //   type: "datetime",
      // },
      subtitle: {
        text: "Points can also be selected and unselected individually",
      },

      series: [
        {
          custom: {
            lassoSelection: true,
          },
          name: "data1",
          data: dataScatter,
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

        // {
        //   custom: {
        //     lassoSelection: true,
        //   },
        //   name: "data2",
        //   data: data2,
        //   showInLegend: false,
        //   allowPointSelect: true,
        //   marker: {
        //     states: {
        //       select: {
        //         fillColor: "purple",
        //         lineWidth: 1,
        //       },
        //     },
        //   },
        // },
        // {
        //   custom: {
        //     lassoSelection: true,
        //   },
        //   name: "data3",
        //   data: data3,
        //   showInLegend: false,
        //   allowPointSelect: true,
        //   marker: {
        //     states: {
        //       select: {
        //         fillColor: "green",
        //         lineWidth: 1,
        //       },
        //     },
        //   },
        // },
        // {
        //   custom: {
        //     lassoSelection: true,
        //   },
        //   name: "data4",
        //   data: data4,
        //   showInLegend: false,
        //   allowPointSelect: true,
        //   marker: {
        //     states: {
        //       select: {
        //         fillColor: "red",
        //         lineWidth: 1,
        //       },
        //     },
        //   },
        // },
      ],
    };
    return option;
  });

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      // constructorType={"stockChart"}
    />
  );
};

// useEffect(() => {
//   const polygon = [];

//   const toast = (chart, text) => {
//     const toast = chart.renderer
//       .label(text, 100, 120)
//       .attr({
//         fill: Highcharts.getOptions().colors[0],
//         padding: 10,
//         r: 5,
//         zIndex: 8,
//       })
//       .css({
//         color: "#FFFFFF",
//       })
//       .add();

//     setTimeout(() => {
//       toast.animate(
//         { opacity: 0 },
//         {
//           complete: () => {
//             toast.destroy();
//           },
//         }
//       );
//     }, 2000);
//   };

//   const pointInPolygon = (point, polygon) => {
//     const { x, y } = point;
//     let i,
//       j,
//       rel1,
//       rel2,
//       c = false;

//     for (i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
//       rel1 = polygon[i][1] > y;
//       rel2 = polygon[j][1] > y;
//       if (
//         rel1 !== rel2 &&
//         x <
//           ((polygon[j][0] - polygon[i][0]) * (y - polygon[i][1])) /
//             (polygon[j][1] - polygon[i][1]) +
//             polygon[i][0]
//       ) {
//         c = !c;
//       }
//     }

//     return c;
//   };

//   const selectPoints = (chart) => {
//     chart.series.forEach((series) => {
//       if (series.options.custom?.lassoSelection) {
//         series.points.forEach((point) => {
//           const xy = {
//             x: chart.plotLeft + point.plotX,
//             y: chart.plotTop + point.plotY,
//           };
//           if (pointInPolygon(xy, polygon)) {
//             point.select(true, true);
//           }
//         });
//       }
//     });
//   };

//   const polygonToPath = (polygon) =>
//     polygon.map((p, i) => [i ? "L" : "M", p[0], p[1]]);

//   addEvent(Chart, "click", function () {
//     const points = this.getSelectedPoints();
//     if (points.length > 0) {
//       points.forEach((point) => point.select(false));
//     }
//   });

//   addEvent(Chart, "load", function () {
//     this.container.addEventListener("mousedown", (e) => {
//       if (
//         this.series.some((series) => series.options.custom?.lassoSelection)
//       ) {
//         this.lasso = this.renderer
//           .path()
//           .attr({
//             stroke: "blue",
//             "stroke-width": 1,
//             "stroke-dasharray": "2,2",
//           })
//           .add();
//         polygon.push([e.chartX, e.chartY]);
//       }
//     });
//     this.container.addEventListener("mousemove", (e) => {
//       if (this.lasso) {
//         polygon.push([e.chartX, e.chartY]);
//         this.lasso.attr({ d: polygonToPath(polygon) });
//       }
//     });
//     this.container.addEventListener("mouseup", () => {
//       const p0 = polygon[0];
//       const hasDragged = polygon.some(
//         (p) => Math.pow(p0[0] - p[0], 2) + Math.pow(p0[1] - p[1], 2) > 10
//       );

//       if (hasDragged && this.lasso) {
//         polygon.push(polygon[0]);
//         this.lasso.attr({ d: polygonToPath(polygon) });
//         selectPoints(this);
//         polygon.length = 0;

//         toast(
//           this,
//           `<b>${
//             this.getSelectedPoints().length
//           } points selected</b><br>Click on empty space to deselect`
//         );

//         const lasso = this.lasso;
//         delete this.lasso;
//         lasso.animate(
//           { opacity: 0 },
//           {
//             complete: () => {
//               lasso.destroy();
//             },
//           }
//         );
//       } else if (this.lasso) {
//         polygon.length = 0;
//         this.lasso = this.lasso.destroy();
//       }
//     });
//   });
// }, []);
