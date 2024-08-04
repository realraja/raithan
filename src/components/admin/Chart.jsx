import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const Chart = () => {
  const doughnutData = {
    labels: ['In-Store Sales'],
    datasets: [
      {
        label: 'In-Store Sales',
        data: [30],
        backgroundColor: ['#7E22CE'],
      },
    ],
  };

  const lineData = {
    labels: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    datasets: [
      {
        label: 'University Survey',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: '#7E22CE',
        borderColor: '#7E22CE',
      },
    ],
  };

  return (
    <div className="flex max-sm:flex-col max-sm:justify-center max-sm:items-center gap-4 ">
      <div className="bg-gray-800 text-white p-4 shadow rounded-lg w-2/5 max-sm:w-full">
        <Doughnut data={doughnutData} />
      </div>
      <div className="bg-gray-800 text-white p-4 shadow rounded-lg w-3/5 max-sm:w-full">
        <Line data={lineData} />
      </div>
    </div>
  );
};

export default Chart;
