// import React, { useEffect } from "react";
// import Highcharts from "highcharts";
// import HighchartsReact from "highcharts-react-official";

// export const BezierCurve = () => {
//   useEffect(() => {
//     const getLinearInterpolatedValue = (t, p1, p2) => (1 - t) * p1 + t * p2;

//     const getLinearInterpolatedSegment = (...args) => {
//       const [t, p1, p2, ...rest] = args;
//       return rest.length > 0
//         ? [
//             getLinearInterpolatedValue(t, p1, p2),
//             ...getLinearInterpolatedSegment(t, p2, ...rest),
//           ]
//         : [getLinearInterpolatedValue(t, p1, p2)];
//     };

//     const findPointOnBezierCurve = (t, ps) =>
//       ps.length > 1
//         ? findPointOnBezierCurve(t, getLinearInterpolatedSegment(t, ...ps))
//         : ps[0];

//     const subdividePoints = (points, years) => {
//       if (points.length === 0 || years === 0) {
//         return points;
//       }
//       const step = 1 / years / 12;
//       const newPoints = [];
//       for (let i = 0; i <= years * 12; i++) {
//         newPoints.push(findPointOnBezierCurve(step * i, points));
//       }
//       return newPoints;
//     };

//     const options = {
//       plotOptions: {
//         series: {
//           marker: {
//             enabled: false,
//             states: {
//               hover: {
//                 enabled: false,
//               },
//             },
//           },
//         },
//       },
//       chart: {
//         type: "spline",
//       },
//       title: {
//         text: "Spline Chart",
//       },

//       series: [
//         {
//           data: subdividePoints([2, 4, 2, 3], 0),
//         },
//       ],
//     };

//     const chart = new Highcharts.Chart("container", options);
//   }, []);

//   return <div id="container"></div>;
// };

// change to 1 by 1
import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export const BezierCurve = () => {
  useEffect(() => {
    const getLinearInterpolatedValue = (t, p1, p2) => (1 - t) * p1 + t * p2;

    const getLinearInterpolatedSegment = (...args) => {
      const [t, p1, p2, ...rest] = args;
      return rest.length > 0
        ? [
            getLinearInterpolatedValue(t, p1, p2),
            ...getLinearInterpolatedSegment(t, p2, ...rest),
          ]
        : [getLinearInterpolatedValue(t, p1, p2)];
    };

    const findPointOnBezierCurve = (t, ps) =>
      ps.length > 1
        ? findPointOnBezierCurve(t, getLinearInterpolatedSegment(t, ...ps))
        : ps[0];

    const subdividePoints = (points, steps) => {
      if (points.length === 0 || steps === 0) {
        return points;
      }
      const newPoints = [];
      for (let i = 0; i <= steps; i++) {
        const t = i / steps;
        newPoints.push(findPointOnBezierCurve(t, points));
      }
      return newPoints;
    };

    const options = {
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
      chart: {
        type: "spline",
      },
      title: {
        text: "Spline Chart",
      },

      series: [
        {
          data: subdividePoints([5, 10, 0, 5], 10),
        },
      ],
    };

    const chart = new Highcharts.Chart("container", options);
  }, []);

  return <div id="container"></div>;
};
