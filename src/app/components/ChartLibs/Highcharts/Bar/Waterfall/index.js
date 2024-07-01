import React, { useEffect, useMemo, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export const Waterfall = () => {
  //   const [data, setData] = useState([5, -3, 8, -6, 4]);

  // แบบแรกแต่ยังอาจจะมีbugอยู่แต่สามารถทำได้
  // const [data, setData] = useState([
  //   { name: "A", min: 10, max: 20 },
  //   { name: "B", min: -20, max: -35 },
  //   { name: "C", min: 20, max: 25 },
  //   // 10, -10, 20,
  // ]);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const randomValue = Math.floor(Math.random() * 10) - 5;
  //     console.log(randomValue);
  //     const newData = data.flatMap((value) => [
  //       {
  //         name: value.name,
  //         min: value.min + randomValue,
  //         max:
  //           value.min < 0
  //             ? Math.min(value.min + randomValue, value.max)
  //             : Math.max(value.min + randomValue, value.max),
  //       },
  //     ]);
  //     console.log(newData);
  //     setData(newData);
  //   }, 3000);

  //   return () => clearInterval(interval);
  // }, [data]);

  const [data, setData] = useState([
    { name: "A", value: 0, min: -20, max: 30 },
    { name: "B", value: -20, min: -35, max: 0 },
    { name: "C", value: 33, min: 0, max: 35 },
    // 10, -10, 20,
  ]);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const randomValue = Math.floor(Math.random() * 10) - 5;
  //     console.log(randomValue);
  //     const newData = data.flatMap((value) => [
  //       {
  //         name: value.name,
  //         value: value.value + randomValue,
  //         min: Math.min(value.value + randomValue, value.min),
  //         max: Math.max(value.value + randomValue, value.max),
  //       },
  //     ]);
  //     console.log("newData", newData);
  //     setData(newData);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, [data]);

  // let getData = data.map((item) => item.min);
  // console.log(getData);

  const options = useMemo(
    () => ({
      chart: {
        type: "column",
      },
      title: {
        text: "with negative val",
      },
      xAxis: {
        categories: data.map((item) => item.name),
      },
      yAxis: {
        // min: -10,
      },
      plotOptions: {
        series: {
          stacking: "normal",
        },
      },
      series: [
        //-------------------------------------------------have dash
        // {
        //   name: "Max",
        //   data: data.map((item) =>
        //     // item.value < 0 ? 0 : item.max - item.value
        //     {
        //       if (item.value < 0) {
        //         return 0;
        //       } else if (item.value > 0) {
        //         return item.max - item.value;
        //       } else if (item.value === 0) {
        //         return item.max;
        //       }
        //     }
        //   ),
        //   dashStyle: "dash",
        //   borderColor: "blue",
        //   borderWidth: 2,
        //   color: "none",
        //   tooltip: {
        //     pointFormat: `max`,
        //   },
        // },
        // {
        //   name: "Min",
        //   data: data.map((item) =>
        //     //value -15 min -20 max 35
        //     // item.value > 0 ? 0 : item.min - item.value
        //     {
        //       if (item.value > 0) {
        //         return 0;
        //       } else if (item.value < 0) {
        //         return item.min - item.value;
        //       } else if (item.value === 0) {
        //         return item.min;
        //       }
        //     }
        //   ),
        //   dashStyle: "dash",
        //   borderColor: "blue",
        //   borderWidth: 2,
        //   color: "none",
        //   tooltip: {
        //     pointFormat: `min`,
        //   },
        // },
        // {
        //   name: "Value",
        //   data: data.map((item) => item.value),
        // },
        //---------------------------------------------------no dash & null
        // {
        //   name: "Max",
        //   data: data.map((item) =>
        //     // item.value < 0 ? 0 : item.max - item.value
        //     {
        //       if (item.value < 0) {
        //         return 0;
        //       } else if (item.value > 0) {
        //         return item.max - item.value;
        //       } else if (item.value === 0) {
        //         return null;
        //       }
        //     }
        //   ),
        //   dashStyle: "dash",
        //   borderColor: "blue",
        //   borderWidth: 2,
        //   color: "none",
        //   tooltip: {
        //     pointFormat: `max`,
        //   },
        // },
        // {
        //   name: "Min",
        //   data: data.map((item) =>
        //     //value -15 min -20 max 35
        //     // item.value > 0 ? 0 : item.min - item.value
        //     {
        //       if (item.value > 0) {
        //         return 0;
        //       } else if (item.value < 0) {
        //         return item.min - item.value;
        //       } else if (item.value === 0) {
        //         return null;
        //       }
        //     }
        //   ),
        //   dashStyle: "dash",
        //   borderColor: "blue",
        //   borderWidth: 2,
        //   color: "none",
        //   tooltip: {
        //     pointFormat: `min`,
        //   },
        // },
        // {
        //   name: "Value",
        //   data: data.map((item) => item.value),
        // },
        //------------------------------------------------------No dash return 0
        {
          name: "Max",
          data: data.map((item) =>
            // item.value < 0 ? 0 : item.max - item.value
            {
              if (item.value < 0) {
                return 0;
              } else if (item.value > 0) {
                return item.max - item.value;
              } else if (item.value === 0) {
                return 0;
              }
            }
          ),
          dashStyle: "dash",
          borderColor: "blue",
          borderWidth: 2,
          color: "none",
          tooltip: {
            pointFormat: `max`,
          },
        },
        {
          name: "Min",
          data: data.map((item) =>
            //value -15 min -20 max 35
            // item.value > 0 ? 0 : item.min - item.value
            {
              if (item.value > 0) {
                return 0;
              } else if (item.value < 0) {
                return item.min - item.value;
              } else if (item.value === 0) {
                return 0;
              }
            }
          ),
          dashStyle: "dash",
          borderColor: "blue",
          borderWidth: 2,
          color: "none",
          tooltip: {
            pointFormat: `min`,
          },
        },
        {
          name: "Value",
          data: data.map((item) => item.value),
        },
        //------------------------------------------------------Default
        // {
        //   name: "Max",
        //   data: [10, -5, 5],
        //   dashStyle: "dash",
        //   borderColor: "blue",
        //   borderWidth: 2,
        //   color: "none",
        // },
        // {
        //   name: "Max",
        //   data: data.map((item) =>
        //     item.value < 0 ? 0 : item.max - item.value
        //   ),
        //   dashStyle: "dash",
        //   borderColor: "blue",
        //   borderWidth: 2,
        //   color: "none",
        //   tooltip: {
        //     pointFormat: `max`,
        //   },
        // },
        // {
        //   name: "Min",
        //   data: data.map((item) =>
        //     //value -15 min -20 max 35
        //     item.value > 0 ? 0 : item.min - item.value
        //   ),
        //   dashStyle: "dash",
        //   borderColor: "blue",
        //   borderWidth: 2,
        //   color: "none",
        //   tooltip: {
        //     pointFormat: `min`,
        //   },
        // },
        // {
        //   name: "Value",
        //   data: data.map((item) => item.value),
        // },
        //-------------------------------------------------------
      ],
    }),
    [data]
  );

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
