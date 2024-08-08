// components/HomePage.js
"use client"
import React from 'react';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const HomePage = () => {
  const data = {
    labels: ['Nov 13, 2017', 'Nov 15, 2017', 'Nov 19, 2017', 'Nov 23, 2017', 'Nov 25, 2017', 'Nov 27, 2017'],
    datasets: [
      {
        label: 'Scores',
        data: [41, 33, 26, 57, 85],
        backgroundColor: 'rgba(128, 0, 128, 0.5)',
        borderColor: 'rgba(128, 0, 128, 1)',
        borderWidth: 1,
        pointBackgroundColor: 'rgba(128, 0, 128, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(128, 0, 128, 1)',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        min: 0,
        ticks: {
          stepSize: 20,
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  const scores = [
    { date: 'Nov 23, 2017 at 2:25 PM', score: 63 },
    { date: 'Nov 19, 2017 at 6:43 PM', score: 29 },
    { date: 'Nov 15, 2017 at 8:19 PM', score: 55 },
    { date: 'Nov 13, 2017 at 4:22 PM', score: 13 },
  ];

  const averageScore = 73;
  const examsTaken = 12;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Recent Test Scores</h2>
      <div className="relative w-full h-64">
        <Line data={data} options={options} />
      </div>
      <div className="flex justify-around my-4">
        <div className="bg-blue-500 text-white text-center p-4 rounded-md">
          <h3 className="text-xl">Average Score</h3>
          <p className="text-3xl font-bold">{averageScore}%</p>
        </div>
        <div className="bg-orange-500 text-white text-center p-4 rounded-md">
          <h3 className="text-xl">Exams Taken</h3>
          <p className="text-3xl font-bold">{examsTaken}</p>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {scores.map((score, index) => (
          <div key={index} className="flex justify-between p-4 border-b">
            <div>{moment(score.date).format('MMM D, YYYY [at] h:mm A')}</div>
            <div className={`font-bold ${score.score >= 50 ? 'text-green-500' : 'text-red-500'}`}>
              {score.score}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
