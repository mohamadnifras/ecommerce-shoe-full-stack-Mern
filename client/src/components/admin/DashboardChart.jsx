import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, ArcElement, Tooltip, Legend);

function DashboardChart({data}) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Pie Chart",
      },
    },
  };
  return (
    <div className="w-full h-[300px] sm:h-[400px]">
      <Pie data={data} options={options} />
    </div>
  );
}

export default DashboardChart;
