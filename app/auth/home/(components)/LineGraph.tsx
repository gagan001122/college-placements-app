'use client'
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface LineGraphProps {
  data: {
    months: {};
  };
}

const LineGraph = ({ data } : LineGraphProps) => {
  console.log(data)
  const chartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      if (ctx) {
        new Chart(ctx, {
          type: 'line',
          data: {
            labels: Object.keys(data.months),
            datasets: [
              {
                label: 'Placement Drives',
                data: Object.values(data.months),
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
                fill: false,
              },
            ],
          },
        });
      }
    }
  }, [data]);

  return <canvas ref={chartRef} />;
};

export default LineGraph
