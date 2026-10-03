import React from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const PerformanceChart = ({
  type = "area",
  data = [],
  dataKey = "value",
  xAxisKey = "name",
  color = "#6366f1",
  title = "",
  height = 300,
}) => {
  // Make sure data is always an array
  const chartData = Array.isArray(data) ? data : [];

  // Check whether the required data exists
  const hasData =
    chartData.length > 0 &&
    chartData.some(
      (item) =>
        item &&
        item[dataKey] !== undefined &&
        item[dataKey] !== null &&
        !Number.isNaN(Number(item[dataKey]))
    );

  // Common chart settings
  const chartMargin = {
    top: 10,
    right: 20,
    left: 0,
    bottom: 10,
  };

  // Axis styling
  const tickStyle = {
    fontSize: 12,
    fill: "#64748b",
  };

  // Tooltip styling
  const tooltipStyle = {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "10px 12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  };

  // Empty state
  if (!hasData) {
    return (
      <div className="card p-6">
        {title && (
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-slate-100">
            {title}
          </h3>
        )}

        <div
          className="flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/40"
          style={{ height }}
        >
          <div className="px-6 text-center">
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300">
              No performance data available
            </p>

            <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
              Complete some practice questions or mock tests to see your
              performance here.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Area Chart
  const renderAreaChart = () => (
    <AreaChart
      data={chartData}
      margin={chartMargin}
    >
      <CartesianGrid
        strokeDasharray="3 3"
        stroke="rgba(148, 163, 184, 0.2)"
      />

      <XAxis
        dataKey={xAxisKey}
        tick={tickStyle}
        axisLine={false}
        tickLine={false}
      />

      <YAxis
        tick={tickStyle}
        axisLine={false}
        tickLine={false}
      />

      <Tooltip contentStyle={tooltipStyle} />

      <Area
        type="monotone"
        dataKey={dataKey}
        stroke={color}
        fill={color}
        fillOpacity={0.18}
        strokeWidth={3}
        activeDot={{ r: 6 }}
      />
    </AreaChart>
  );

  // Line Chart
  const renderLineChart = () => (
    <LineChart
      data={chartData}
      margin={chartMargin}
    >
      <CartesianGrid
        strokeDasharray="3 3"
        stroke="rgba(148, 163, 184, 0.2)"
      />

      <XAxis
        dataKey={xAxisKey}
        tick={tickStyle}
        axisLine={false}
        tickLine={false}
      />

      <YAxis
        tick={tickStyle}
        axisLine={false}
        tickLine={false}
      />

      <Tooltip contentStyle={tooltipStyle} />

      <Line
        type="monotone"
        dataKey={dataKey}
        stroke={color}
        strokeWidth={3}
        dot={{
          r: 4,
          fill: color,
        }}
        activeDot={{
          r: 6,
          fill: color,
        }}
      />
    </LineChart>
  );

  // Bar Chart
  const renderBarChart = () => (
    <BarChart
      data={chartData}
      margin={chartMargin}
    >
      <CartesianGrid
        strokeDasharray="3 3"
        stroke="rgba(148, 163, 184, 0.2)"
      />

      <XAxis
        dataKey={xAxisKey}
        tick={tickStyle}
        axisLine={false}
        tickLine={false}
      />

      <YAxis
        tick={tickStyle}
        axisLine={false}
        tickLine={false}
      />

      <Tooltip contentStyle={tooltipStyle} />

      <Bar
        dataKey={dataKey}
        fill={color}
        radius={[6, 6, 0, 0]}
        maxBarSize={50}
      />
    </BarChart>
  );

  // Select chart type
  const renderChart = () => {
    switch (type) {
      case "line":
        return renderLineChart();

      case "bar":
        return renderBarChart();

      case "area":
      default:
        return renderAreaChart();
    }
  };

  return (
    <div className="card p-6">
      {/* Title */}
      {title && (
        <h3 className="mb-5 text-lg font-semibold text-gray-900 dark:text-slate-100">
          {title}
        </h3>
      )}

      {/* Chart */}
      <div
        className="w-full"
        style={{
          height: `${height}px`,
          minHeight: `${height}px`,
        }}
      >
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={0}
        >
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PerformanceChart;