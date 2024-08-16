// import { DrawBezier } from "@/app/components/ChartLibs/Highcharts/Line/DrawBezier";
// import { HighStock } from "@/app/components/ChartLibs/Highcharts/Line/HighStock";
// import { MarkxAxis } from "@/app/components/ChartLibs/Highcharts/Line/LineMark/MarkxAxis";
// import { MarkyAxis } from "@/app/components/ChartLibs/Highcharts/Line/LineMark/MarkyAxis";
// import { LineSD } from "@/app/components/ChartLibs/Highcharts/Line/LineSD";
// import { Scatter } from "@/app/components/ChartLibs/Highcharts/Scatter";
import DrawBezierEchart from "@/app/components/ChartLibs/Echart/BezierCurve";
import EchartBezierPlot from "@/app/components/ChartLibs/Echart/BezierCurve/EchartBezierPlot";
import OnEvent from "@/app/components/ChartLibs/Echart/OnEvent";
import { Waterfall } from "@/app/components/ChartLibs/Highcharts/Bar/Waterfall";
import BezierCurvePath from "@/app/components/ChartLibs/Highcharts/Line/BezierCurvePath";
import DrawBezier2 from "@/app/components/ChartLibs/Highcharts/Line/DrawBezier2";
import DrawBezierV3 from "@/app/components/ChartLibs/Highcharts/Line/DrawBezierV3";
import DrawBezierV3Display from "@/app/components/ChartLibs/Highcharts/Line/DrawBezierV3/DrawBezierV3Display";
import LineScale from "@/app/components/ChartLibs/Highcharts/Line/LineScale";
import {
  parsedArrayData,
  readCSV,
} from "@/app/components/ChartLibs/Highcharts/Scatter/data";
import { ScatterPlot } from "@/app/components/ChartLibs/Highcharts/Scatter/Plot";
import { jsonDataScatter } from "@/app/components/ChartLibs/Highcharts/Scatter/Plot/data";
import PlotyScatterPlot from "@/app/components/ChartLibs/ploty/Scatter";
import { TestCrop } from "@/app/components/Crop/react-easy-crop";
import ImageCropper from "@/app/components/Crop/react-image-crop";
import StepperBezier from "@/app/components/Stepper";
import { Box, Grid } from "@mui/material";
import React, { useEffect, useMemo, useState, Suspense } from "react";

const MarkxAxis = React.lazy(() =>
  import("@/app/components/ChartLibs/Highcharts/Line/LineMark/MarkxAxis/")
);
const MarkyAxis = React.lazy(() =>
  import("@/app/components/ChartLibs/Highcharts/Line/LineMark/MarkxAxis/index")
);
const HighStock = React.lazy(() =>
  import("@/app/components/ChartLibs/Highcharts/Line/HighStock/")
);
const LineSD = React.lazy(() =>
  import("@/app/components/ChartLibs/Highcharts/Line/LineSD")
);
const DrawBezier = React.lazy(() =>
  import("@/app/components/ChartLibs/Highcharts/Line/DrawBezier")
);
const Scatter = React.lazy(() =>
  import("@/app/components/ChartLibs/Highcharts/Scatter")
);

const MainPage = () => {
  const [dataScatter, setDataScatter] = useState([]);
  useEffect(() => {
    setDataScatter(jsonDataScatter);
  }, []);

  return (
    <Grid
      container
      xs={12}
      sm={12}
      md={12}
      lg={12}
      direction="column"
      spacing={2}
    >
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        direction="row"
        spacing={2}
      >
        <Grid item xs={12} sm={12} md={12} lg={6}>
          <StepperBezier />
          {/* <ImageCropper /> */}
          {/* <TestCrop /> */}
          {/* <Waterfall /> */}
          {/* <ScatterPlot series={dataScatter} /> */}
          {/* <HighStock /> */}
          {/* <LineSD /> */}
          {/* <DrawBezierEchart /> */}
          {/* <OnEvent /> */}
          {/* <DrawBezierV3 /> */}
          {/* <EchartBezierPlot /> */}

          <Suspense fallback={<div>Loading...</div>}></Suspense>
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6}>
          <Suspense fallback={<div>Loading...</div>}>
            {/* <EchartBezierPlot /> */}

            {/* <DrawBezierV3Display /> */}
          </Suspense>
        </Grid>
      </Grid>
      <Grid container item xs={12} sm={12} md={12} lg={12} spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          {/* <DrawBezier /> */}
          {/* <LineSD /> */}
          {/* <DrawBezier2 /> */}
          {/* <PlotyScatterPlot series={dataScatter} /> */}
          {/* <BezierCurvePath /> */}
          {/* <HighStock /> */}
          {/* <Scatter series={dataScatter} drawData={clusterData} /> */}
          {/* <ScatterPlot series={dataScatter} /> */}
          <Suspense fallback={<div>Loading...</div>}>
            {/* <MarkxAxis /> */}
          </Suspense>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6}>
          {/* <LineScale /> */}
          <Suspense fallback={<div>Loading...</div>}>
            {/* <MarkyAxis /> */}
          </Suspense>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default MainPage;

// const [data, setData] = useState([]);
// const [clusterData, setClusterData] = useState([]);
// const [check, setCheck] = useState([]);

// //ยังไม่รู้จะทำแบบไหน
// const data_2023 = "public/data_2023.csv";
// const data_2024 = "public/data_2024.csv";

// useEffect(() => {
//   const fetchData = async () => {
//     let parsedData = await parsedArrayData([data_2023, data_2024]);
//     setData(parsedData);
//   };
//   fetchData();
// }, []);

// //ยังไม่รู้จะทำแบบไหน
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
//   const fil = getData.filter((item) => !item.some((value) => isNaN(value)));
//   return fil;
//   // return getData;
// }, [data]);
