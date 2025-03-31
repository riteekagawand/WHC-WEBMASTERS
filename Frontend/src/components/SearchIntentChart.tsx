import React from 'react';
import ApexCharts from 'react-apexcharts';

interface SearchIntentChartProps {
  data: number[];
}

const SearchIntentChart: React.FC<SearchIntentChartProps> = ({ data }) => {
  const circleChartOptions = {
    chart: {
      type: 'radialBar' as const, // Changed from 'donut' to 'radialBar'
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
    },
    labels: ['Informational', 'Commercial', 'Transactional'],
    colors: ['#6E3F8B', '#8E61C8', '#B194CA'], // Modern colors
    plotOptions: {
      radialBar: {
        dataLabels: {
          total: {
            show: true,
            label: 'Total',
            color: '#1F2937',
            formatter: () => '100%',
          },
        },
        track: {
          background: '#E5E7EB', // Optional: adds a track background for better visualization
          strokeWidth: '70%',
        },
        barHeight: '70%', // Adjusts the height of each radial bar
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
        fontWeight: 'bold',
      },
    },
    legend: {
      position: 'bottom' as const,
      fontSize: '14px',
      fontFamily: 'Inter, sans-serif',
      labels: {
        colors: '#1F2937',
      },
    },
    title: {
      text: 'Search Intent Distribution',
      align: 'center' as const,
      style: {
        fontSize: '18px',
        fontWeight: 'bold',
        fontFamily: 'Inter, sans-serif',
        color: '#1F2937',
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif',
      },
    },
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
      <ApexCharts
        options={circleChartOptions}
        series={data}
        type="radialBar"
        height={350}
      />
    </div>
  );
};

export default SearchIntentChart;