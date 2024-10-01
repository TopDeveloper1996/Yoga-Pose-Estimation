// src/components/MonthlyChart.js
import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
//// import MonthlyChart from "../component/chart";

// const monthlyData2024 = {
//   labels: [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ],
//   values: [120, 150, 170, 200, 230, 250, 300, 220, 180, 200, 215, 190], // Example data
// };

Chart.register(...registerables);

const MonthlyChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    const chartInstance = new Chart(ctx, {
      type: "line", // Change this to 'bar' or other types for different styles
      data: {
        labels: data.labels,
        datasets: [
          {
            label: "Monthly Values",
            data: data.values,
            borderColor: "rgba(75, 192, 192, 1)",
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderWidth: 2,
            pointRadius: 5,
            pointHoverRadius: 7,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Values",
            },
          },
          x: {
            title: {
              display: true,
              text: "Months",
            },
          },
        },
      },
    });

    // Cleanup the chart instance on component unmount
    return () => {
      chartInstance.destroy();
    };
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default MonthlyChart;
