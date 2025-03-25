import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts'; // Import ApexOptions for typing
import analyticsData from '../data/analyticsData.json'; // Direct import

interface ChartData {
  activeVisitors: {
    name: string;
    data: number[];
  };
  popularProducts: {
    name: string;
    data: number[];
    categories: string[];
  };
}

const Analytics: React.FC = () => {
  const chartData: ChartData = analyticsData; // Use the imported data directly

  // Data for Active Visitors (Spline Area Chart)
  const activeVisitorsSeries = [
    {
      name: chartData.activeVisitors.name,
      data: chartData.activeVisitors.data,
    },
  ];

  const activeVisitorsOptions: ApexOptions = {
    chart: {
      type: 'area' as const, // Changed to 'area' for Spline Area chart
      height: 350,
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth' as const, // Smooth curve for spline effect
      colors: ['#8B5CF6'], // Violet stroke
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: '#8B5CF6',
            opacity: 0.7,
          },
          {
            offset: 100,
            color: '#8B5CF6',
            opacity: 0.3,
          },
        ],
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      labels: {
        style: {
          colors: '#6B7280',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6B7280',
        },
      },
    },
    grid: {
      borderColor: '#E5E7EB',
    },
  };

  // Data for Popular Products (Bar Chart)
  const popularProductsSeries = [
    {
      name: chartData.popularProducts.name,
      data: chartData.popularProducts.data,
    },
  ];

  const popularProductsOptions: ApexOptions = {
    chart: {
      type: 'bar' as const,
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
      categories: chartData.popularProducts.categories,
      labels: {
        style: {
          colors: '#6B7280',
        },
      },
    },
    yaxis: {
      title: {
        text: 'Number of Sales',
        style: {
          color: '#6B7280',
        },
      },
      labels: {
        style: {
          colors: '#6B7280',
        },
      },
    },
    fill: {
      colors: ['#8B5CF6'], // Violet fill
    },
    grid: {
      borderColor: '#E5E7EB',
    },
  };

  return (
    <div className="bg-white min-h-screen p-6">
      <h1 className="text-3xl font-semibold text-violet-700 text-center mb-8">
        HerSpace Analytics Dashboard
      </h1>

      {/* Metrics Section */}
      <div className="flex flex-wrap justify-around gap-4 mb-8">
        {/* Active Visitors */}
        <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4 shadow-md flex-1 min-w-[250px] max-w-[300px]">
          <div className="w-12 h-12 bg-violet-500 rounded-full flex items-center justify-center">
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700">Active Visitors</h3>
            <p className="text-2xl font-semibold text-gray-900">400</p>
            <p className="text-sm text-gray-500">+15% from last month</p>
          </div>
        </div>

        {/* Total Visitors */}
        <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4 shadow-md flex-1 min-w-[250px] max-w-[300px]">
          <div className="w-12 h-12 bg-violet-500 rounded-full flex items-center justify-center">
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700">Total Visitors</h3>
            <p className="text-2xl font-semibold text-gray-900">12,345</p>
            <p className="text-sm text-gray-500">+10% from last month</p>
          </div>
        </div>

        {/* User Count */}
        <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4 shadow-md flex-1 min-w-[250px] max-w-[300px]">
          <div className="w-12 h-12 bg-violet-500 rounded-full flex items-center justify-center">
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700">User Count</h3>
            <p className="text-2xl font-semibold text-gray-900">3,210</p>
            <p className="text-sm text-gray-500">+8% from last month</p>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4 shadow-md flex-1 min-w-[250px] max-w-[300px]">
          <div className="w-12 h-12 bg-violet-500 rounded-full flex items-center justify-center">
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700">Conversion Rate</h3>
            <p className="text-2xl font-semibold text-gray-900">4.5%</p>
            <p className="text-sm text-gray-500">+0.5% from last month</p>
          </div>
        </div>

        {/* Average Time on Site */}
        <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4 shadow-md flex-1 min-w-[250px] max-w-[300px]">
          <div className="w-12 h-12 bg-violet-500 rounded-full flex items-center justify-center">
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700">Avg. Time on Site</h3>
            <p className="text-2xl font-semibold text-gray-900">6m 32s</p>
            <p className="text-sm text-gray-500">+1m 10s from last month</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="flex flex-wrap justify-around gap-4">
        {/* Active Visitors Chart (Spline Area) */}
        <div className="bg-gray-50 rounded-lg p-6 shadow-md flex-1 min-w-[700px] max-w-[500px]">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Active Visitors Over Time</h3>
          <Chart
            options={activeVisitorsOptions}
            series={activeVisitorsSeries}
            type="area"
            height={350}
          />
        </div>

        {/* Popular Products Chart */}
        <div className="bg-gray-50 rounded-lg p-6 shadow-md flex-1 min-w-[300px] max-w-[500px]">
          <h3 className="text-lg font-medium text-gray-700 mb-4">Popular Products</h3>
          <Chart
            options={popularProductsOptions}
            series={popularProductsSeries}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default Analytics;