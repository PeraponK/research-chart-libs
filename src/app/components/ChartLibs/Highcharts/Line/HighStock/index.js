import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import React, { useEffect, useMemo, useState } from "react";
import HighchartsBoost from "highcharts/modules/boost";
import HighchartsZoom from "highcharts/modules/mouse-wheel-zoom";
import HighchartsExporting from "highcharts/modules/exporting";

const HighStock = () => {
  HighchartsExporting(Highcharts);
  HighchartsBoost(Highcharts);
  HighchartsZoom(Highcharts);
  const getData = () => {
    let base = +new Date(1988, 9, 3);
    let oneDay = 24 * 3600 * 1000;
    const genData = useMemo(() => {
      let data = [[base, Math.random() * 300]];
      for (let i = 1; i < 5000; i++) {
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

  // function getData() {
  //   const data = [];
  //   for (let i = 1; i <= 200; i++) {
  //     data.push(i);
  //   }
  //   return data;
  // }
  // console.log(Highcharts);

  let data1 = getData();
  let data2 = getData();
  let data3 = getData();
  let data4 = getData();
  let data5 = getData();
  let data6 = getData();
  let data7 = getData();
  let data8 = getData();
  let data9 = getData();
  let data10 = getData();

  // const handlePlot = (x1, x2) => {
  //ex {min = 10 max = 50}
  //ex {min = 60 max = 70}
  //ex {min = 80 max = 90}
  //x1=5 x2=40 , x1=1 x2=100 , x1=55 x2=65

  const handlePlot = (x1, x2) => {
    let newRange = { minRange: x1, maxRange: x2 };

    let updatePlot = range.filter((item) => {
      if (
        newRange.minRange < item.maxRange &&
        newRange.maxRange > item.minRange
      ) {
        newRange.minRange = Math.min(newRange.minRange, item.minRange);
        newRange.maxRange = Math.max(newRange.maxRange, item.maxRange);
        return false;
      } else {
        return true;
      }
    });
    setRange([...updatePlot, newRange]);
  };

  const handleAddPlot = (x1, x2) => {
    console.log("check before add", range);
    let updatePlot = {
      minRange: x1,
      maxRange: x2,
    };
    console.log(updatePlot);
    setRange([...range, updatePlot]);
  };

  const selected = (event) => {
    // console.log(new Date(event.xAxis[0].min));
    // console.log(new Date(event.xAxis[0].max));
    // console.log(event);
    // console.log(event.xAxis[0].min);
    // console.log(event.xAxis[0].max);
    event.preventDefault();
    handlePlot(event.xAxis[0].min, event.xAxis[0].max);
  };

  const [range, setRange] = useState([
    // {
    //   minRange: 10,
    //   maxRange: 50,
    // },
    // {
    //   minRange: 60,
    //   maxRange: 70,
    // },
    // {
    //   minRange: 80,
    //   maxRange: 90,
    // },
  ]);

  useEffect(() => {
    console.log("range update:", range);
  }, [range]);

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
  console.log("zones", zones);
  const sortZone = zones.sort((a, b) => (a.value || 0) - (b.value || 0));

  let options = useMemo(() => {
    let options = {
      boost: {
        useGPUTranslations: true,
        seriesThreshold: 0,
      },
      chart: {
        zoomType: "x",
        events: { selection: selected },
        height: "400",
        // width: "800",
      },
      // scrollbar: {
      //   liveRedraw: false,
      // },
      title: {
        text: "My chart",
      },
      subtitle: {
        text: "try subtitle",
      },
      plotOptions: {
        series: {
          showInNavigator: true,
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

      credits: { enabled: false },

      series: [
        {
          name: "data1",
          data: data1,
          zones: sortZone,
          zoneAxis: "x",
        },
        {
          name: "data2",
          data: data2,
          zones: sortZone,
          zoneAxis: "x",
        },
        {
          name: "data3",
          data: data3,
          zones: sortZone,
          zoneAxis: "x",
        },
        {
          name: "data4",
          data: data4,
          zones: sortZone,
          zoneAxis: "x",
        },
        {
          name: "data5",
          data: data5,
          zones: sortZone,
          zoneAxis: "x",
        },
        {
          name: "data6",
          data: data6,
          zones: sortZone,
          zoneAxis: "x",
        },
        {
          name: "data7",
          data: data7,
          zones: sortZone,
          zoneAxis: "x",
        },
        {
          name: "data8",
          data: data8,
          zones: sortZone,
          zoneAxis: "x",
        },
        {
          name: "data9",
          data: data9,
          zones: sortZone,
          zoneAxis: "x",
        },
        {
          name: "data10",
          data: data10,
          zones: sortZone,
          zoneAxis: "x",
        },
      ],
      legend: {
        align: "right",
      },
      xAxis: {
        crosshair: true,
        plotBands: plotbands,
      },
      yAxis: {
        crosshair: true,
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

export default HighStock;
// const handlePlot = (x1, x2) => {
//   if (range.length === 0) {
//     handleAddPlot(x1, x2);
//   } else {
//     range.map((item) => {
//       if (x1 < item.minRange && x2 < item.maxRange) {
//         handleDeletePlot(item.minRange, item.maxRange);
//         handleAddPlot(x1, item.maxRange);

//         console.log("1");

//         // tempRange.push(x1);
//         // tempRange.push(item.maxRange);
//       }
//       // ไม่มีอะไรเปลีย่น
//       else if (x1 > item.minRange && x2 < item.maxRange) {
//         console.log("2");
//       }
//       // ถ้า x1 มากกว่า min และ x2 มากกว่า max ให้ push min และ x2 ไป และ remove อันเก่าออก
//       else if (x1 > item.minRange && x2 > item.maxRange) {
//         console.log("3");
//         tempRange.push(item.minRange);
//         tempRange.push(x2);
//       }
//       // ถ้า x1 น้อยกว่า min และ x2 มากกว่า max ให้ push x1 และ x2 ไป
//       else if (x1 < item.minRange && x2 > item.maxRange) {
//         console.log("4");
//         tempRange.push(x1);
//         tempRange.push(x2);
//       }
//     });
//   }
// };

// const handlePlot = (x1, x2) => {
//   let newMin;
//   let newMax;
//   let updatePlot = range.filter((item) => {
//     if (x1 < item.minRange && x2 > item.minRange) {
//       newMin = Math.min(x1, item.minRange);
//       newMax = Math.max(x2, item.maxRange);
//     } else {
//       return true;
//     }
//   });
//   setRange([...updatePlot, { minRange: newMin, maxRange: newMax }]);
// };

// const handlePlot = (x1, x2) => {
//   let newRange = { minRange: x1, maxRange: x2 };
//   let updatePlot = range.filter((item) => {
//     newRange.minRange = Math.min(x1, item.minRange);
//     newRange.maxRange = Math.max(x2, item.maxRange);
//   });
//   setRange([...updatePlot, newRange]);
// };

//ถ้าเกิดว่า มี 3 plot แล้ว แล้วอยากจะครอบ plotที่2จะทำไงให้ ไม่กระทบplotที่1 และ 3 และสร้างใหม่ครอบ 2 ได้
//------------------
//x1 = 55 x2 = 75
//ex {min = 10 max = 50}
// (x1)55<10(min) AND (x2)75>50(max) => false
//ex {min = 60 max = 70} // ตัวตั้ง
// (x1)55<60(min) AND (x2)75>70(max) => true
//ex {min = 80 max = 90}
// (x1)55<80(min) AND (x2)75>90(max) => false
//ถ้าใช้ x1<min AND x2>max จะใช้ได้ในกรณีครอบ2
//------------------
//x1 = 5 x2 = 35
//ex {min = 10 max = 50} // ตัวตั้ง
// 5<10 AND 35>50 =>FALSE
//ex {min = 60 max = 70}
// 5<60 AND 35>70 =>FALSE
//ex {min = 80 max = 90}
// 5<80 AND 35>90 =>FALSE
//----------------------------แปลว่า x1<min AND x2>max จะ fail
//5<10 AND 35<50 =>TRUE จะผ่าน และ 5<60 AND 35<70 ก็ผ่านกลายเป็นผ่านหมดก็ fail เพราะครอบไปแค่plotแรก
//ปัญหาคือจะครอบแค่ครึ่ง plot แรกยังไงให้ไม่กระทบ มันทำได้ไหมนิ ToT
//5<10 AND 35<50
//5<50 AND 35>10 สลับ min max ตรงเงื่อนไข
//5<70 AND 35>60 false
//5<90 AND 35>80 false
//----------------------------แปลว่า x1<max AND x2>min จะผ่านในเงื่อนไขplotครึ่งแรก
//ลอง plot ครอบอันที่2 แบบเดิมด้วยเงื่อนไขที่สร้างใหม่
//ex {min = 10 max = 50}
//ex {min = 60 max = 70}
//ex {min = 80 max = 90}
//x1 = 55 x2 = 75
//55<50 => false
//55<70 AND 75>60 =>true
//55<90 AND 75>80 => false
//----------------------------pass
//ครอบมันทั้งหมด x1=5 x2=100
//5<50 AND 100>10
//5<70 AND 100>60
//5<90 AND 100>80 True หมดเลยแปลว่าเข้าถูก
//ลองครอบแค่2เหลือ3โดนครอบครึ่งที่1ด้วย x1=35 x2=75
//35<50 AND 75>10 true
//35<70 AND 75>60 true
//35<90 AND 75>80 false
//---------------------------pass let's try
//ค่าในarray ไม่ถูกตัด
