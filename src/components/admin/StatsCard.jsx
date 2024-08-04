import React from 'react';

const StatsCard = ({ title, value, increase }) => {
  return (
    <div className="bg-gray-800 text-white shadow rounded-lg p-4">
      <div className="text-gray-200">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-green-500">{increase}</div>
    </div>
  );
};

export default StatsCard;
