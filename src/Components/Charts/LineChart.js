import React from "react";
import { Line } from "react-chartjs-2";
import { data } from "./Data";
export default function BarChart() {
  const options = {
    title: {
      display: true,
      text: "*Визуальный каркас графика, данные не из файла .json",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            min: 0,
            max: 1200,
            stepSize: 100,
          },
        },
      ],
    },
    maintainAspectRatio: false,
  };
  return (
    <div style={{ width: "750px", height: "700px" }}>
      <Line data={data.line} options={options} />
    </div>
  );
}
