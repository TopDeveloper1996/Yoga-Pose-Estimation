// src/components/MonthlyChart.js
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// import MonthlyChart from "../component/rechart";
// const monthlyData2023 = [
//   { month: 'January', value: 120 },
//   { month: 'February', value: 150 },
//   { month: 'March', value: 170 },
//   { month: 'April', value: 200 },
//   { month: 'May', value: 230 },
//   { month: 'June', value: 250 },
//   { month: 'July', value: 300 },
//   { month: 'August', value: 220 },
//   { month: 'September', value: 180 },
//   { month: 'October', value: 200 },
//   { month: 'November', value: 215 },
//   { month: 'December', value: 190 },
// ];
// Register required components of Chart.js
const MonthlyChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default MonthlyChart;
