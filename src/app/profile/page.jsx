// components/HomePage.js
"use client";
import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ModalImage from "react-modal-image";
import { useSelector } from "react-redux";
import Link from "next/link";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Page = () => {
  const { user } = useSelector((state) => state.user);
  return (
    <div>
      <ProfileData user={user} />

      <ProfileCharts />

      <FeesHistory />
    </div>
  );
};

export default Page;

const ProfileCharts = () => {
  const data = {
    labels: [
      "Nov 13, 2017",
      "Nov 15, 2017",
      "Nov 19, 2017",
      "Nov 23, 2017",
      "Nov 25, 2017",
      "Nov 27, 2017",
    ],
    datasets: [
      {
        label: "Scores",
        data: [41, 33, 26, 57, 85],
        backgroundColor: "rgba(128, 0, 128, 0.5)",
        borderColor: "rgba(128, 0, 128, 1)",
        borderWidth: 1,
        pointBackgroundColor: "rgba(128, 0, 128, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(128, 0, 128, 1)",
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
    { date: "Nov 23, 2017 at 2:25 PM", score: 63 },
    { date: "Nov 19, 2017 at 6:43 PM", score: 29 },
    { date: "Nov 15, 2017 at 8:19 PM", score: 55 },
    { date: "Nov 13, 2017 at 4:22 PM", score: 13 },
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
      <div className="bg-gray-800 shadow-md rounded-lg overflow-hidden">
        {scores.map((score, index) => (
          <div key={index} className="flex justify-between p-4 border-b">
            <div>{moment(score.date).format("MMM D, YYYY [at] h:mm A")}</div>
            <div
              className={`font-bold ${
                score.score >= 50 ? "text-green-500" : "text-red-500"
              }`}
            >
              {score.score}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ProfileData = ({ user }) => {
  return (
    <div className="flex max-sm:flex-col justify-between gap-20 max-sm:gap-3 max-sm:justify-start min-h-[90vh] px-10 max-sm:px-5 py-5">
      <div className="flex flex-col justify-center w-1/3 max-sm:w-full items-center gap-10">
        <ModalImage
          className="h-72 w-72 rounded-full object-cover"
          small={user.avatar}
          large={user.avatar} // Replace with your actual image URL
          alt="question Image"
        />
        <button className="px-5 py-2 text-xl bg-purple-600 hover:bg-purple-700 hover:scale-110 duration-500 rounded-md">
          Change Image
        </button>
      </div>
      <div className="flex flex-col items-center w-2/3 max-sm:w-full gap-5 px-5 pt-10">
        <p className="text-xl border-b w-full text-center pb-1">Details</p>
        <div className="flex rounded-xl w-full bg-gray-800 hover:bg-gray-700 items-center py-2 px-8 gap-5 cursor-pointer ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
            />
          </svg>
          <div>
            <p className="text-sm text-gray-400"> Name </p>
            <h3 className="font-bold">{user.name}</h3>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 ml-auto">
  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
</svg>

        </div>
        <div className="flex rounded-xl w-full bg-gray-800 hover:bg-gray-700 items-center py-2 px-8 gap-5 cursor-pointer ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
            />
          </svg>
          <div>
            <p className="text-sm text-gray-400"> Phone </p>
            <h3 className="font-bold">{user.phone}</h3>
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 ml-auto">
  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
  <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
</svg>
        </div>
        <div className="flex rounded-xl w-full bg-gray-800 hover:bg-gray-700 items-center py-2 px-8 gap-5 cursor-pointer ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
              clipRule="evenodd"
            />
          </svg>

          <div>
            <p className="text-sm text-gray-400"> Status </p>
            <h3
              className={`font-bold ${
                user.verified ? "text-green-500" : "text-rose-600"
              }`}
            >
              {user.verified ? "Verified" : "Not Verified"}
            </h3>
          </div>
        </div>
        <div className="flex rounded-xl w-full bg-gray-800 hover:bg-gray-700 items-center py-2 px-8 gap-5 cursor-pointer ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="size-6"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M6 11.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
          </svg>
          <div>
            <p className="text-sm text-gray-400"> Test Done </p>
            <h3 className="font-bold">{user.quizes.length}</h3>
          </div>
        </div>
        <div className="flex rounded-xl w-full bg-gray-800 hover:bg-gray-700 items-center py-2 px-8 gap-5 cursor-pointer ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z"
              clipRule="evenodd"
            />
          </svg>

          <div>
            <p className="text-sm text-gray-400"> Questions Done </p>
            <h3 className="font-bold">{user.questions.length}</h3>
          </div>
        </div>
        <Link href={'#History'} className="flex rounded-xl w-full bg-gray-800 hover:bg-gray-700 items-center py-2 px-8 gap-5 cursor-pointer ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6"
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM9 7.5A.75.75 0 0 0 9 9h1.5c.98 0 1.813.626 2.122 1.5H9A.75.75 0 0 0 9 12h3.622a2.251 2.251 0 0 1-2.122 1.5H9a.75.75 0 0 0-.53 1.28l3 3a.75.75 0 1 0 1.06-1.06L10.8 14.988A3.752 3.752 0 0 0 14.175 12H15a.75.75 0 0 0 0-1.5h-.825A3.733 3.733 0 0 0 13.5 9H15a.75.75 0 0 0 0-1.5H9Z"
              clipRule="evenodd"
            />
          </svg>


          <div>
            <p className="text-sm text-gray-400"> Pending Fees </p>
            <h3 className="font-bold">Comming Soon</h3>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-6 ml-auto"
          >
            <path
              fillRule="evenodd"
              d="M12.97 3.97a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06l6.22-6.22H3a.75.75 0 0 1 0-1.5h16.19l-6.22-6.22a.75.75 0 0 1 0-1.06Z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};



const FeesHistory = () => {

  return(<div id="History" className="my-5 px-5 h-[50vh]">
    <p className="text-xl border-b pb-1">Fees History</p>

    <p className="my-5 text-2xl font-extralight font-sans text-center text-purple-600">Comming Soon</p>
  </div>)
}
