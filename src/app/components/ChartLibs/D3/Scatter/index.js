import React, { useEffect, useMemo, useState } from "react";
import * as d3 from "d3";
import { parsedArrayData, readCSV } from "../../Highcharts/Scatter/data";
import { D3ScatterPlot } from "./Plot";

export const D3Scatter = () => {
  const [data, setData] = useState([]);
  const [clusterData, setClusterData] = useState([]);
  const [check, setCheck] = useState([]);

  // const test = async () => {
  //   let parsedData = await readCSV("public/master_tablein-1.csv");
  //   setData(parsedData);
  // };

  const csvFilePath = "public/master_tablein-1.csv";
  const data_2023 = "public/data_2023.csv";
  const data_2024 = "public/data_2024.csv";

  const dataScatter = useMemo(() => {
    let getData = [];
    if (check === "public/cluster_22.csv") {
      data.map((item) => getData.push(item));
    } else if (check === "public/cluster_31.csv") {
      data.map((item) =>
        getData.push([
          parseFloat(item.NYA_DCS_G6710A_Cylinder_10),
          parseFloat(item.NYA_DCS_G6710A_Intake_Manifold),
        ])
      );
    } else if (check === "public/cluster_38.csv") {
      data.map((item) =>
        getData.push([
          parseFloat(item.NYA_DCS_G6710A_CoolantTemp_LB),
          parseFloat(item.NYA_DCS_G6710A_OilTemp),
        ])
      );
    } else if (check === "public/cluster_40.csv") {
      data.map((item) =>
        getData.push([
          parseFloat(item.NYA_DCS_G6710A_Intake_Manifold),
          parseFloat(item.NYA_DCS_G6710A_CoolantTemp_LB),
        ])
      );
    } else if (check === "public/cluster_53.csv") {
      data.map((item) =>
        getData.push([
          parseFloat(item.NYA_DCS_G6710A_Rear_Bear_Temp),
          parseFloat(item.NYA_DCS_VI6712A_VELOCITY),
        ])
      );
    } else if (check === "public/cluster_55.csv") {
      data.map((item) =>
        getData.push([
          parseFloat(item.NYA_DCS_VI6710A_VELOCITY),
          parseFloat(item.AVG_ALL_CYLINDER),
        ])
      );
    }
    return getData;
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      let parsedData = await parsedArrayData([data_2023, data_2024]);
      setData(parsedData);
    };
    fetchData();
  }, []);
  const cluster_22 = "public/cluster_22.csv";
  const cluster_31 = "public/cluster_31.csv";
  const cluster_38 = "public/cluster_38.csv";
  const cluster_40 = "public/cluster_40.csv";
  const cluster_53 = "public/cluster_53.csv";
  const cluster_55 = "public/cluster_55.csv";

  const cluster_data = cluster_22;

  useEffect(() => {
    const fetchCluster = async () => {
      let parsedData = await readCSV(cluster_data);
      setClusterData(parsedData);
      setCheck(cluster_data);
    };
    fetchCluster();
  }, []);

  // Clean up function to remove the old SVG elements

  return (
    <div>
      <D3ScatterPlot dataset={dataScatter} />
    </div>
  );
};
