import React from 'react';
import ApexCharts from 'react-apexcharts';

interface SyncingChartProps {
  series: any[];
}

const SyncingChart: React.FC<SyncingChartProps> = ({ series }) => {
  const syncingChartOptions = {
    chart: {
      type: 'line' as const,
      height: 350,
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: true,
          zoom: true,
          zoomin: true,
          zoomout: true,
          pan: true,
          reset: true,
        },
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
    },
    stroke: {
      width: 4, // Increased from 2 to 4 for thicker lines
      curve: 'smooth' as const,
    },
    xaxis: {
      categories: [
        '11 Feb', '13 Feb', '15 Feb', '17 Feb', '19 Feb', '21 Feb',
        '23 Feb', '25 Feb', '27 Feb', '1 Mar', '17 Mar',
      ],
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
          colors: '#6B7280',
        },
      },
    },
    yaxis: {
      min: 0,
      max: 80,
      tickAmount: 4,
      labels: {
        style: {
          fontSize: '12px',
          fontFamily: 'Inter, sans-serif',
          colors: '#6B7280',
        },
      },
    },
    title: {
      text: 'Keyword Trend Syncing',
      align: 'center' as const,
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        fontFamily: 'Inter, sans-serif',
        color: '#1F2937',
      },
    },
    colors: ['#3B82F6', '#f7b801', '#fb8500'], // Matching the colors in the image
    legend: {
      show: false, // No legend in the image
    },
    markers: {
      size: 5,
      strokeWidth: 2,
      strokeColors: '#fff',
      hover: {
        size: 7,
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
      },
    },
    grid: {
      borderColor: '#E5E7EB',
      strokeDashArray: 4,
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <ApexCharts
        options={syncingChartOptions}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default SyncingChart;