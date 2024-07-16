"use server";
const fs = require("fs");
const Papa = require("papaparse");

const csvFilePath = "public/master_tablein-1.csv";

const data_2023 = "public/data_2023.csv";
const data_2024 = "public/data_2024.csv";
const aaa = "public/cluster_22.csv";

// Function to read csv which returns a promise so you can do async / await.

export const readCSV = async (filePath) => {
  const csvFile = fs.readFileSync(filePath);
  const csvData = csvFile.toString();
  return new Promise((resolve) => {
    Papa.parse(csvData, {
      header: true,
      complete: (results) => {
        const tryFilter = results.data.filter((item) => {
          if (Object.values(item).every((value) => value === "") === true) {
            return false;
          } else {
            return true;
          }
        });
        console.log("Complete", results.data.length, "records.");
        console.log(tryFilter);
        resolve(tryFilter);
      },
    });
  });
};

export const parsedArrayData = async (filePath) => {
  let sumData = [];
  for (let i = 0; i < filePath.length; i++) {
    console.log("filePath");
    let data = await readCSV(filePath[i]);
    sumData = [...sumData, ...data];
  }
  console.log(sumData);
  return sumData;
};

const test = async () => {
  let parsedData = await readCSV(data_2024);
  // console.log(parsedData);
};

test();
