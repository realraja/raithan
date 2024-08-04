"use client";

import React, { useEffect, useState } from 'react';
import Chart from '@/components/admin/Chart';
import StatsCard from '@/components/admin/StatsCard';

const Dashboard = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className=' max-sm:px-4 sm:px-0'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <StatsCard title="Total Students" value="3280" increase="80% Increase in 20 Days" />
        <StatsCard title="New Students" value="245" increase="50% Increase in 25 Days" />
        <StatsCard title="Total Courses" value="28" increase="76% Increase in 20 Days" />
        <StatsCard title="Fees Collection" value="$25160" increase="30% Increase in 30 Days" />
      </div>
      <Chart />
    </div>
  );
};

export default Dashboard;
