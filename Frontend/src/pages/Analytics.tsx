import React, { useRef, useEffect } from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts'; // Import ApexOptions for typing
import SummaryCard from '../components/DashboardSummary';
import analyticsData from '../data/analyticsData.json'; // Direct import of JSON data
import { FaUsers, FaMousePointer, FaClock, FaChartLine } from 'react-icons/fa';
import { RiLayout6Line } from 'react-icons/ri';
import html2canvas from 'html2canvas'; // Import html2canvas
import jsPDF from 'jspdf'; // Import jsPDF

// Define TypeScript interfaces for the JSON data structure
interface Metric {
  value: number | string;
  change: string;
  name: string;
}

interface ChartData {
  name: string;
  data: number[];
  categories?: string[];
}

// Interface for Top Pages data
interface TopPage {
  page: string;
  visitors: number;
  avgTime: string;
  bounceRate: string;
  conversion: string;
}

interface AnalyticsData {
  metrics: {
    activeVisitors: Metric;
    totalClicks: Metric;
    averageTimeOnSite: Metric;
    conversionRate: Metric;
  };
  charts: {
    activeVisitorsOverTime: ChartData;
    popularProducts: ChartData;
  };
  topPages: TopPage[];
}

const Analytics: React.FC = () => {
  // Use the imported JSON data directly
  const data: AnalyticsData = analyticsData;

  // Reference to the root div for PDF generation
  const dashboardRef = useRef<HTMLDivElement>(null);

  // Log to confirm the component renders
  useEffect(() => {
    console.log('Analytics component rendered');
    if (dashboardRef.current) {
      console.log('Dashboard content:', dashboardRef.current.innerHTML);
    }
  }, []);

  // Summary data for the metric cards
  const summaryData = [
    {
      title: data.metrics.activeVisitors.name,
      value: data.metrics.activeVisitors.value.toLocaleString(),
      change: data.metrics.activeVisitors.change,
      icon: FaUsers,
    },
    {
      title: data.metrics.totalClicks.name,
      value: data.metrics.totalClicks.value.toLocaleString(),
      change: data.metrics.totalClicks.change,
      icon: FaMousePointer,
    },
    {
      title: data.metrics.averageTimeOnSite.name,
      value: data.metrics.averageTimeOnSite.value,
      change: data.metrics.averageTimeOnSite.change,
      icon: FaClock,
    },
    {
      title: data.metrics.conversionRate.name,
      value: data.metrics.conversionRate.value,
      change: data.metrics.conversionRate.change,
      icon: FaChartLine,
    },
  ];

  // Data for Active Visitors Over Time (Spline Area Chart)
  const activeVisitorsSeries = [
    {
      name: data.charts.activeVisitorsOverTime.name,
      data: data.charts.activeVisitorsOverTime.data,
    },
  ];

  const activeVisitorsOptions: ApexOptions = {
    chart: {
      type: 'area' as const, // Spline Area chart
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
      name: data.charts.popularProducts.name,
      data: data.charts.popularProducts.data,
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
      categories: data.charts.popularProducts.categories,
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

  // Function to generate and download the PDF
  const generatePDF = async () => {
    if (!dashboardRef.current) return;

    // Capture the dashboard content as a canvas
    const canvas = await html2canvas(dashboardRef.current, {
      scale: 2, // Increase resolution for better quality
      useCORS: true, // Handle cross-origin images if any
      logging: false, // Disable logging for cleaner console
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new PDF in portrait mode, A4 size

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Add the first page
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add additional pages if the content exceeds one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Download the PDF
    pdf.save('analytics-report.pdf');
  };

  return (
    <div className="p-6 min-h-screen" ref={dashboardRef}>
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Analytics Dashboard</h1>

      {/* Navigation Tabs */}
      <div className="flex space-x-4 mb-6">
        <button className="text-gray-600 font-semibold border-b-2 border-purple-600 pb-2">
          Overview
        </button>
        <button className="text-gray-600 font-semibold">Visitors</button>
        <button className="text-gray-600 font-semibold">Behavior</button>
        <button className="text-gray-600 font-semibold">Conversions</button>
        <button className="text-gray-600 font-semibold">Settings</button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {summaryData.map((item) => (
          <SummaryCard
            key={item.title}
            title={item.title}
            value={item.value}
            change={item.change}
            icon={item.icon}
          />
        ))}
      </div>

      {/* Charts Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Analytics Charts</h2>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Active Visitors Chart (Spline Area) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-2 shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">Active Visitors Over Time</h3>
            <Chart
              options={activeVisitorsOptions}
              series={activeVisitorsSeries}
              type="area"
              height={350}
            />
          </div>

          {/* Popular Products Chart */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-5 shadow-sm border border-gray-200">
            <h3 className="text-lg font-medium text-gray-700 mb-4 text-center">Popular Products</h3>
            <Chart
              options={popularProductsOptions}
              series={popularProductsSeries}
              type="bar"
              height={350}
            />
          </div>
        </div>
      </div>

      {/* Top Pages Section */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Pages</h2>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 px-4 text-sm font-medium text-gray-600">
                    <div className="flex items-center gap-2">
                      <RiLayout6Line className="size-5" />
                      <span>Page</span>
                    </div>
                  </th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-600">Visitors</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-600">Avg. Time</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-600">Bounce Rate</th>
                  <th className="py-3 px-4 text-sm font-medium text-gray-600">Conversion</th>
                </tr>
              </thead>
              <tbody>
                {data.topPages.map((page, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 px-4 text-sm text-gray-700">{page.page}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{page.visitors}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{page.avgTime}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{page.bounceRate}</td>
                    <td className="py-3 px-4 text-sm text-gray-700">{page.conversion}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Generate Full Report Button */}
      <div className="h-[50px] w-[250px] mt-12 mb-12 flex justify-center rounded-xl items-center bg-purple py-4">
        <button
          onClick={generatePDF}
          className="bg-purple-600 text-white font-semibold text-lg py-3 px-6 rounded-full hover:bg-purple-700 transition-colors"
        >
          Generate Full Report
        </button>
      </div>
    </div>
  );
};

export default Analytics;