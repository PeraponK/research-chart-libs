"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { readCSV } from "./data";
import { ScatterPlot } from "./Plot";

export const Scatter = () => {
  const [data, setData] = useState([]);

  // const test = async () => {
  //   let parsedData = await readCSV("public/master_tablein-1.csv");
  //   setData(parsedData);
  // };

  //จะfetchdata ทุกครั้งที่มีการเปลี่ยนแปลงอันนี่ต้องส่งค่าprops ที่จะใส่ลง readCSV ถ้าค่าที่ส่งมาเปลี่ยนก็ให้ทำงานอีกรอบ?
  useEffect(() => {
    const fetchData = async () => {
      let parsedData = await readCSV("public/master_tablein-1.csv");
      setData(parsedData);
    };
    fetchData();
  }, []);

  const cluster1 = {
    clusterId: 1,
    lowest: 4800,
    xClusterCenter: 859.246,
    yClusterCenter: 101.792,
    xSd: 12.519,
    ySd: 9.189,
    angleDeg: -145.778,
    sdMultiple: 3,
    th: 10,
  };
  // drawEllipse(this, 859.246, 101.792, 12.519, 9.189, -145.778);

  //ต้องทำpropที่ส่งค่ามาใช้แทนcluster1 ใช้ useEffect เพราะจะได้setค่าclusterdata ไปใช้ทุกครั้งที่ค่าcluster1เปลี่ยน?

  useEffect(() => {
    drawEllipse(Highcharts);
  }, []);

  // const calculateClusterParameters = useMemo((cluster) => {
  //   const angleRad = Math.abs(cluster.angleDeg * (Math.PI / 180));
  //   console.log("Rad", angleRad);

  //   return { angleRad };
  // },[cluster]);

  function calculateClusterParameters(cluster) {
    const cx = cluster.xClusterCenter;
    const cy = cluster.yClusterCenter;
    const rx = cluster.xSd;
    const ry = cluster.ySd;
    const angleRad = Math.abs(cluster.angleDeg * (Math.PI / 180));

    return { cx, cy, rx, ry, angleRad };
  }

  const drawEllipse = useCallback(
    (chart) => {
      if (chart.xAxis !== undefined && chart.yAxis !== undefined) {
        const cResult = calculateClusterParameters(cluster1);
        const x1 = chart.xAxis[0].toPixels(cResult.cx - cResult.rx);
        const x2 = chart.xAxis[0].toPixels(cResult.cx + cResult.rx);
        const y1 = chart.yAxis[0].toPixels(cResult.cy - cResult.ry);
        const y2 = chart.yAxis[0].toPixels(cResult.cy + cResult.ry);
        const angleX = chart.xAxis[0].toPixels(cResult.cx);
        const angleY = chart.yAxis[0].toPixels(cResult.cy);
        const rectClass = "operating-point-ellipse";
        document.querySelectorAll(`.${rectClass}`).forEach((el) => el.remove());
        const ellipse = chart.renderer
          .rect(x1, y2, x2 - x1, y1 - y2, "50%")
          .attr({
            "stroke-width": 1,
            stroke: "green",
            fill: "green",
            "fill-opacity": 0.2,
            zIndex: 10,
          })
          .addClass(rectClass)
          .add();
        console.log(angleX, angleY);
        ellipse.attr({
          transform: `rotate(${cResult.angleRad}, ${angleX}, ${angleY})`,
        });
      }
    },
    [cluster1]
  );

  const dataScatter = useMemo(() => {
    let getData = [];
    data.map((item) =>
      getData.push([
        parseFloat(item.BYA_PLC_GE3010C_ExhaustTemp_LB),
        parseFloat(item.BYA_PLC_TT3201_PV),
      ])
    );
    return getData;
  }, [data]);

  return (
    <div>
      <ScatterPlot dataset={dataScatter} drawEllipse={drawEllipse} />
    </div>
  );
};

//
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
