import React from 'react';
import ApexCharts from 'react-apexcharts';

interface SearchIntentChartProps {
  data: number[];
}

const SearchIntentChart: React.FC<SearchIntentChartProps> = ({ data }) => {
  const circleChartOptions = {
    chart: {
      type: 'donut' as const,
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
      },
    },
    labels: ['Informational', 'Commercial', 'Transactional'],
    colors: ['#3B82F6', '#10B981', '#F59E0B'], // Modern colors
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total',
              color: '#1F2937',
              formatter: () => '100%',
            },
          },
        },
        startAngle: -90,
        endAngle: 270,
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
        type="donut"
        height={350}
      />
    </div>
  );
};

export default SearchIntentChart;