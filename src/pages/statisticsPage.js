import { useEffect, useState } from "react";

import { BarChart } from "@mui/x-charts/BarChart";
import { LineChart } from "@mui/x-charts";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import { dataset } from "./data.js";

import DropdownYearly from "../components/dropdownYearly";
import DropdownMonthly from "../components/dropdownMonthly";
import TotalDataTable from "../components/totalDataTable.js";
import AverageDataTable from "../components/AverageDataTable.js";

const chartSetting = {
  width: 1410,
  height: 400,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

const combinedData = dataset.map((item) => ({
  dateMonth: `${item.month} ${item.year}`,
  london: item.london,
  paris: item.paris,
  newYork: item.newYork,
}));

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

  const handlePrev = () => {
    if (startIndex > 0) setStart(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex + 11 < dataset.length - 1) setStart(startIndex + 1);
  };

  const handleYearly = (year) => {};

  const handleMonthly = (month) => {};

  useEffect(() => {}, []);

  const PreviousButton = (props) => (
    <button
      {...props}
      className="flex text-primary  hover:text-blue-200 font-bold w-20 h-20 items-center justify-center"
      onClick={handlePrev}
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
  );

  const NextButton = (props) => (
    <button
      {...props}
      id="chart-right"
      className="flex text-primary hover:text-blue-200 font-bold w-20 h-20 items-center justify-center"
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
  );

  return (
    <div id="chartView" className="w-full">
      <div className="flex flex-col md:h-screen mx-1">
        <div className="w-full h-10 bg-primary rounded my-2 content-center shadow-md shadow-gray-500">
          <span className="text-white font-semibold mx-4">Yoga Statistics</span>
        </div>

        <div className="inline-flex w-full h-10 content-center items-center justify-between">
          <div className="inline-flex items-center">
            <DropdownYearly onChange={handleYearly} />
            <DropdownMonthly onChange={handleMonthly} />
          </div>
          <div className="flex mr-2 items-center">
            <button
              className="flex text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:bg-primary focus:text-white font-medium text-center ml-4 md:w-24 h-8 border-x-2 border-y-2 rounded border-primary px-2 items-center justify-center"
              onClick={() => HandleTotalorAverage(true)}
            >
              Total
            </button>
            <button
              className="flex text-primary focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:bg-primary focus:text-white font-medium text-center ml-4 md:w-24 h-8 border-x-2 border-y-2 rounded border-primary px-2 items-center justify-center"
              onClick={() => HandleTotalorAverage(false)}
            >
              Average
            </button>
          </div>
        </div>

        <div className="mt-2 flex w-full flex-1 flex-col items-center justify-center rounded border-x border-y bg-white shadow-md shadow-gray-400">
          <div className="flex flex-row justify-center items-center w-full">
            <PreviousButton onClick={handlePrev} />
            <div
              id="chart"
              className="flex w-4/5 md:h-1/5 bg-white rounded items-center"
            >
              {totalorAverage ? (
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
                />
              ) : (
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
                />
              )}
            </div>
            <NextButton onClick={handleNext} />
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
        <div className="flex flex-1 flex-col py-2">
          <div className="mt-2 flex h-12 w-full items-center rounded bg-primary shadow-md shadow-gray-400">
            <span className="ml-4 p-1 text-[15px] font-semibold text-white">
              8TH August 24
            </span>
          </div>
          <div className="flex flex-col flex-1 border shadow-md shadow-gray-400 rounded-md mt-2 overflow-auto">
            {totalorAverage ? <TotalDataTable /> : <AverageDataTable />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsPage;
