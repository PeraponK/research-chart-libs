"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { ScatterPlot } from "./Plot";
import zIndex from "@mui/material/styles/zIndex";

const Scatter = (props) => {
  const { series, drawData } = props;
  // console.log(series, drawData);
  console.log(series);
  // const [data, setData] = useState([]);
  // const [clusterData, setClusterData] = useState([]);
  // const [check, setCheck] = useState([]);

  // // const test = async () => {
  // //   let parsedData = await readCSV("public/master_tablein-1.csv");
  // //   setData(parsedData);
  // // };

  // const csvFilePath = "public/master_tablein-1.csv";
  // const data_2023 = "public/data_2023.csv";
  // const data_2024 = "public/data_2024.csv";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     let parsedData = await parsedArrayData([data_2023, data_2024]);
  //     setData(parsedData);
  //   };
  //   fetchData();
  // }, []);

  // const cluster_22 = "public/cluster_22.csv";
  // const cluster_31 = "public/cluster_31.csv";
  // const cluster_38 = "public/cluster_38.csv";
  // const cluster_40 = "public/cluster_40.csv";
  // const cluster_53 = "public/cluster_53.csv";
  // const cluster_55 = "public/cluster_55.csv";

  // const cluster_data = cluster_22;

  // useEffect(() => {
  //   const fetchCluster = async () => {
  //     let parsedData = await readCSV(cluster_data);
  //     setClusterData(parsedData);
  //     setCheck(cluster_data);
  //   };
  //   fetchCluster();
  // }, []);

  // const cluster1 = {
  //   clusterId: 1,
  //   lowest: 4800,
  //   xClusterCenter: 859.246,
  //   yClusterCenter: 101.792,
  //   xSd: 12.519,
  //   ySd: 9.189,
  //   angleDeg: -145.778,
  //   sdMultiple: 3,
  //   th: 10,
  // };
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
  // console.log(data);

  //ขนาดองศาใกล้เคียง แปลว่าไม่ได้
  function calculateClusterParameters(clusterData) {
    // console.log("length", clusterData.length);
    if (clusterData.length > 0) {
      // console.log("in calculate", clusterData);
      // console.log("ClusterData", clusterData);
      console.log("cluster Data", clusterData);
      const cx = clusterData[0].X_CLUSTER_CENTER;
      const cy = clusterData[0].Y_CLUSTER_CENTER;
      const rx = clusterData[0].X_SD * clusterData[0].SD_MULTIPLIER;
      const ry = clusterData[0].Y_SD * clusterData[0].SD_MULTIPLIER;
      // const angleRad = clusterData[0].ANGLE_DEG * (Math.PI / 180);

      const angleRad = clusterData[0].ANGLE_DEG * (180 / Math.PI);
      const sd = clusterData[0].SD_MULTIPLIER;

      // console.log("check this !!", cx, cy, rx, ry);
      return { cx, cy, rx, ry, angleRad, sd };
    } else {
      return false;
    }
  }
  //เจอปัญหาjavascript เวลา - จะปกติ แต่พอเป็น+ ดันเป็นstringซะ
  const drawEllipse = useCallback(
    (chart) => {
      //------------------------------------------------------------------------------ลองเอา่ค่าตรง .rect มาบวกลบแล้วค่อยทำเป็นpixelดูไหม?
      if (chart.xAxis !== undefined && chart.yAxis !== undefined) {
        const cResult = calculateClusterParameters(drawData);

        // Add a custom circle to the chart using the renderer

        // Create the ellipse element
        // const x1 = chart.xAxis[0].toPixels(cResult.cx - cResult.rx);
        // const x2 = chart.xAxis[0].toPixels(
        //   Number(cResult.cx) + Number(cResult.rx)
        // );

        // const y1 = chart.yAxis[0].toPixels(cResult.cy - cResult.ry);
        // const y2 = chart.yAxis[0].toPixels(
        //   Number(cResult.cy) + Number(cResult.ry)
        // );
        // const angleX = chart.xAxis[0].toPixels(cResult.cx);
        // const angleY = chart.yAxis[0].toPixels(cResult.cy);
        // const rectClass = "operating-point-ellipse";
        // document.querySelectorAll(`.${rectClass}`).forEach((el) => el.remove());
        // chart.renderer
        //   .createElement("ellipse")
        //   .attr({
        //     cx: x1,
        //     cy: y2,
        //     rx: x2 - x1,
        //     ry: y1 - y2,
        //     "stroke-width": 1,
        //     stroke: "green",
        //     fill: "green",
        //     "fill-opacity": 0.2,
        //     zIndex: 10,
        //   })
        //   .addClass(rectClass)
        //   .add()

        //   // Rotate the ellipse around its center
        //   .attr({
        //     transform: `rotate(${cResult.angleRad}, ${angleX}, ${angleY})`,
        //   });

        const x1 = chart.xAxis[0].toPixels(cResult.cx - cResult.rx);
        const x2 = chart.xAxis[0].toPixels(
          Number(cResult.cx) + Number(cResult.rx)
        );

        const y1 = chart.yAxis[0].toPixels(cResult.cy - cResult.ry);
        const y2 = chart.yAxis[0].toPixels(
          Number(cResult.cy) + Number(cResult.ry)
        );
        const angleX = chart.xAxis[0].toPixels(cResult.cx);
        const angleY = chart.yAxis[0].toPixels(cResult.cy);
        // console.log(x1, x2, y1, y2, angleX, angleY);
        const rectClass = "operating-point-ellipse";
        document.querySelectorAll(`.${rectClass}`).forEach((el) => el.remove());
        const ellipse = chart.renderer
          .rect(x1, y2, x2 - x1, y1 - y2, "50%")
          .attr({
            "stroke-width": 1,
            stroke: "green",
            fill: "green",
            "fill-opacity": 0.2,
            zIndex: 3,
          })
          .addClass(rectClass)
          .add();
        // console.log(angleX, angleY);
        ellipse.attr({
          transform: `rotate(${cResult.angleRad}, ${angleX}, ${angleY})`,
          // transform: "rotate(0)",
        });
      }
    },
    [drawData]
  );

  // const dataScatter = useMemo(() => {
  //   let getData = [];
  //   if (check === "public/cluster_22.csv") {
  //     data.map((item) =>
  //       getData.push([
  //         parseFloat(item.NYA_DCS_G6710A_Cylinder_1),
  //         parseFloat(item.NYA_DCS_G6710A_Intake_Manifold),
  //       ])
  //     );
  //   } else if (check === "public/cluster_31.csv") {
  //     data.map((item) =>
  //       getData.push([
  //         parseFloat(item.NYA_DCS_G6710A_Cylinder_10),
  //         parseFloat(item.NYA_DCS_G6710A_Intake_Manifold),
  //       ])
  //     );
  //   } else if (check === "public/cluster_38.csv") {
  //     data.map((item) =>
  //       getData.push([
  //         parseFloat(item.NYA_DCS_G6710A_CoolantTemp_LB),
  //         parseFloat(item.NYA_DCS_G6710A_OilTemp),
  //       ])
  //     );
  //   } else if (check === "public/cluster_40.csv") {
  //     data.map((item) =>
  //       getData.push([
  //         parseFloat(item.NYA_DCS_G6710A_Intake_Manifold),
  //         parseFloat(item.NYA_DCS_G6710A_CoolantTemp_LB),
  //       ])
  //     );
  //   } else if (check === "public/cluster_53.csv") {
  //     data.map((item) =>
  //       getData.push([
  //         parseFloat(item.NYA_DCS_G6710A_Rear_Bear_Temp),
  //         parseFloat(item.NYA_DCS_VI6712A_VELOCITY),
  //       ])
  //     );
  //   } else if (check === "public/cluster_55.csv") {
  //     data.map((item) =>
  //       getData.push([
  //         parseFloat(item.NYA_DCS_VI6710A_VELOCITY),
  //         parseFloat(item.AVG_ALL_CYLINDER),
  //       ])
  //     );
  //   }
  //   return getData;
  // }, [data]);

  return (
    <div>
      <ScatterPlot series={series} drawEllipse={drawEllipse} />
    </div>
  );
};

export default Scatter;

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
