import * as React from "react";
import DropdownYearly from "../components/dropdownYearly";
import DropdownMonthly from "../components/dropdownMonthly";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { dataset } from "./data.js";
import { LineChart } from "@mui/x-charts";
import { useState } from "react";

const chartSetting = {
  width: 1410,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};
// const valueFormatter = (value) => `${value}mm`;
const clickHandler = (
  event, // The mouse event.
  params // An object that identifies the clicked elements.
) => {};

// Data from axis click
// {
//   "dataIndex": 0,
//   "axisValue": "0",
//   "seriesValues": {
//     "series-1": 3,
//     "series-2": 4,
//     "series-3": 4
//   }
// }
const combinedData = dataset.map((item) => ({
  dateMonth: `${item.month} ${item.year}`, // Create combined key
  london: item.london,
  paris: item.paris,
  newYork: item.newYork,
}));
// const nowData = dataset.filter(
//   (_, index) => _.month === "Aug" && _.year === "24"
// );
const startId = dataset.findIndex(
  (obj) => obj.month === "Aug" && obj.year === "24"
);

const StatisticsPage = () => {
  const [totalorAverage, setTotalorAverage] = useState(true);
  const [startIndex, setStart] = useState(startId - 11);
  const [lastIndex, setLast] = useState(startId);
  const [selectedIndex, setSelect] = useState(11);

  const HandleTotalorAverage = (flag) => {
    setTotalorAverage(flag);
  };

  return (
    <div id="chartView" className="w-full">
      <div className="flex flex-col md:h-screen mx-1">
        <div className="w-full h-10 bg-[#004392] rounded my-2 content-center shadow-md shadow-gray-500">
          <span className="text-white font-semibold mx-4">Yoga Statistics</span>
        </div>

        <div
          id="chart-controller"
          className="inline-flex w-full h-10 content-center items-center justify-between"
        >
          <div className="inline-flex items-center">
            <DropdownYearly />
            <DropdownMonthly />
          </div>
          <div className="flex mr-2 items-center">
            <button
              className="flex text-[#004392] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:bg-[#004392] focus:text-white font-medium text-center ml-4 md:w-24 h-8 border-x-2 border-y-2 rounded border-[#004392] px-2 items-center justify-center"
              onClick={() => HandleTotalorAverage(true)}
            >
              Total
            </button>
            <button
              className="flex text-[#004392] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:bg-[#004392] focus:text-white font-medium text-center ml-4 md:w-24 h-8 border-x-2 border-y-2 rounded border-[#004392] px-2 items-center justify-center"
              onClick={() => HandleTotalorAverage(false)}
            >
              Average
            </button>
          </div>
        </div>
        <div
          id="webcamView"
          className="flex  flex-col  mt-2 w-full bg-white rounded border-x border-y shadow-gray-400 shadow-md items-center justify-center"
        >
          <div className="flex flex-row justify-center items-center w-full">
            <button
              id="chart-left"
              className="flex text-[#004392]  hover:text-blue-200 font-bold w-20 h-20 items-center justify-center"
              onClick={() => {
                if (startIndex > 0) setStart(startIndex - 1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 md:size-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </button>
            <div
              id="chart"
              className="flex w-4/5 md:h-1/5 bg-white rounded items-center"
            >
              {totalorAverage && (
                <BarChart
                  dataset={combinedData.slice(startIndex, startIndex + 12)}
                  xAxis={[
                    {
                      scaleType: "band",
                      dataKey: "dateMonth",
                      categoryGapRatio: 0.7,
                    },
                  ]}
                  grid={{ horizontal: true }}
                  yAxis={[{}]}
                  series={[{ dataKey: "london", color: "#004392" }]}
                  {...chartSetting}
                  onItemClick={() => {}}
                  onAxisClick={() => {}}
                  slotProps={{
                    // Custom loading message
                    loadingOverlay: {
                      message: "Data should be available soon.",
                    },
                    // Custom message for empty chart
                    noDataOverlay: { message: "Select some data to display." },
                  }}
                ></BarChart>
              )}
              {!totalorAverage && (
                <LineChart
                  dataset={combinedData.slice(startIndex, startIndex + 12)}
                  grid={{ horizontal: true }}
                  xAxis={[
                    {
                      scaleType: "band",
                      dataKey: "dateMonth",
                      categoryGapRatio: 0.7,
                    },
                  ]}
                  yAxis={[{}]}
                  series={[
                    { dataKey: "london", color: "#FF2366" },
                    { dataKey: "paris", color: "#02BC77" },
                    { dataKey: "newYork", color: "#4791FF" },
                  ]}
                  {...chartSetting}
                  onItemClick={() => {}}
                  onAxisClick={() => {}}
                ></LineChart>
              )}
            </div>
            <button
              id="chart-right"
              className="flex text-[#004392] hover:text-blue-200 font-bold w-20 h-20 items-center justify-center"
              onClick={() => {
                if (startIndex + 11 < dataset.length - 1)
                  setStart(startIndex + 1);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6 md:size-16"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
          <div
            id="chart-label"
            className="mb-2 mr-2 flex flex-row w-full items-center justify-end"
            style={
              !totalorAverage ? { visibility: "" } : { visibility: "hidden" }
            }
          >
            <div className="flex  items-center justify-center text-center">
              <button className="rounded-full bg-[#FF2366] w-4 h-4"></button>
              <span className="ml-2 mr-8 text-[12px]">My</span>
              <button className="rounded-full bg-[#02BC77] w-4 h-4"></button>
              <span className="ml-2 mr-8 text-[12px]">Top</span>
              <button className="rounded-full bg-[#4791FF] w-4 h-4"></button>
              <span className="ml-2 mr-8 text-[12px]">Group Avg</span>
            </div>
          </div>
        </div>
        <div
          id="table-name"
          className="mt-2 flex w-full h-12 rounded shadow-gray-400 border-x border-y shadow-md items-center"
        >
          <span className="ml-4 p-1 text-[15px] font-semibold text-[#004392]">
            8TH August 24
          </span>
        </div>

        {totalorAverage ? (
          <table
            id="table-total"
            className="mt-2 table-fixed rounded-md shadow-gray-400 shadow-md text-center text-[#004392] font-medium"
          >
            <thead className="rounded">
              <tr>
                <th className="border text-gray-800 w-10">#</th>
                <th className="border text-start pl-3  text-gray-800">Name</th>
                <th className="border  text-gray-800 w-1/12">Total Count()</th>
                <th className="border  text-gray-800 w-1/12">
                  Total Time - ()
                </th>
              </tr>
            </thead>
            <tbody className="rounded">
              <tr>
                <td className="border">1</td>
                <td className="border text-start pl-3">kapotasana (P1)</td>
                <td className="border">2</td>
                <td className="border">04:01</td>
              </tr>
              <tr>
                <td className="border">2</td>
                <td className="border text-start pl-3">kapotasana (P2)</td>
                <td className="border">3</td>
                <td className="border">02:05</td>
              </tr>
              <tr>
                <td className="border">3</td>
                <td className="border text-start pl-3">kapotasana (P3)</td>
                <td className="border">4</td>
                <td className="border">01:04</td>
              </tr>
            </tbody>
          </table>
        ) : (
          <table
            id="table-average"
            className="mt-2 table-fixed rounded-md shadow-gray-400 shadow-md text-center text-[#004392] font-medium"
          >
            <thead className="rounded">
              <tr>
                <th className="border text-gray-800 w-10" rowSpan={2}>
                  #
                </th>
                <th
                  className="border text-start pl-3  text-gray-800"
                  rowSpan={2}
                >
                  Name
                </th>

                <th className="border  text-gray-800 w-1/12" colSpan={3}>
                  My
                </th>

                <th className="border  text-gray-800 w-1/12" colSpan={3}>
                  Top
                </th>

                <th className="border  text-gray-800 w-1/12" colSpan={3}>
                  Total Avg
                </th>
              </tr>
              <tr>
                <th className="border  text-gray-800 w-1/12">Days</th>
                <th className="border  text-gray-800 w-1/12">Count</th>
                <th className="border  text-gray-800 w-1/12">Time</th>

                <th className="border  text-gray-800 w-1/12">Days</th>
                <th className="border  text-gray-800 w-1/12">Count</th>
                <th className="border  text-gray-800 w-1/12">Time</th>

                <th className="border  text-gray-800 w-1/12">Days</th>
                <th className="border  text-gray-800 w-1/12">Count</th>
                <th className="border  text-gray-800 w-1/12">Time</th>
              </tr>
            </thead>
            <tbody className="rounded">
              <tr>
                <td className="border">1</td>
                <td className="border text-start pl-3">kapotasana (P1)</td>

                <td className="border">10</td>
                <td className="border">23</td>
                <td className="border">02:12:09</td>

                <td className="border">10</td>
                <td className="border">23</td>
                <td className="border">02:12:09</td>

                <td className="border">10</td>
                <td className="border">23</td>
                <td className="border">02:12:09</td>
              </tr>
              <tr>
                <td className="border">2</td>
                <td className="border text-start pl-3">kapotasana (P2)</td>
                <td className="border">10</td>
                <td className="border">23</td>
                <td className="border">02:12:09</td>

                <td className="border">10</td>
                <td className="border">23</td>
                <td className="border">02:12:09</td>

                <td className="border">10</td>
                <td className="border">23</td>
                <td className="border">02:12:09</td>
              </tr>
              <tr>
                <td className="border">3</td>
                <td className="border text-start pl-3">kapotasana (P3)</td>
                <td className="border">10</td>
                <td className="border">23</td>
                <td className="border">02:12:09</td>

                <td className="border">10</td>
                <td className="border">23</td>
                <td className="border">02:12:09</td>

                <td className="border">10</td>
                <td className="border">23</td>
                <td className="border">02:12:09</td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default StatisticsPage;
