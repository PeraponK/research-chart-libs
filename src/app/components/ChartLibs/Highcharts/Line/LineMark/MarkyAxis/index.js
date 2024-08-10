import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts/highstock";
import React, { useEffect, useMemo, useState } from "react";
import HighchartsBoost from "highcharts/modules/boost";
import HighchartsZoom from "highcharts/modules/mouse-wheel-zoom";

const MarkyAxis = () => {
  HighchartsBoost(Highcharts);
  HighchartsZoom(Highcharts);
  const getData = () => {
    let base = +new Date(1988, 9, 3);
    let oneDay = 24 * 3600 * 1000;
    const genData = useMemo(() => {
      let data = [[base, Math.random() * 300]];
      for (let i = 1; i < 10; i++) {
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

  const click = (event) => {
    // console.log("y", event.yAxis[0].value);
    // console.log("x", event.xAxis[0].value);
    handleLine(event.yAxis[0].value);
  };

  const handleLine = (y) => {
    if (range.length === 0) {
      handleAddLine(y);
    } else {
      range.map((item) => {
        if (item.range === y) {
          console.log("delete");
          handleDeleteLine(y);
        } else {
          console.log("add");
          handleAddLine(y);
        }
      });
    }
  };

  const handleDeleteLine = (y) => {
    const updateLine = range.filter((item) => item.range !== y);
    setRange(updateLine);
  };

  const handleAddLine = (y) => {
    const addData = {
      id: range.length + 1,
      range: y,
    };
    setRange([...range, addData]);
  };

  const [range, setRange] = useState([]);

  const plotlines = range.map((item) => ({
    color: "red",
    width: 1,
    value: item.range,
  }));
  //   console.log(range);

  let options = useMemo(() => {
    let options = {
      boost: {
        useGPUTranslations: true,
        seriesThreshold: 5,
      },
      chart: {
        zoomType: "x",
        events: { click: click },
        height: 400,
        // width: 1500,
      },
      title: {
        text: "My chart",
      },
      subtitle: {
        text: "try subtitle",
      },

      //   plotOptions: {
      //     series: {
      //       marker: {
      //         enabled: false,
      //         states: {
      //           hover: {
      //             enabled: false,
      //           },
      //         },
      //       },
      //     },
      //   },
      series: [
        {
          data: data1,
        },
      ],
      legend: {
        align: "right",
      },
      yAxis: {
        plotLines: plotlines,
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
  });

  return (
    <HighchartsReact
      highcharts={Highcharts}
      constructorType={"stockChart"}
      options={options}
    />
  );
};
export default MarkyAxis;
