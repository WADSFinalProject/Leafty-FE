import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ xAxisLabel, yAxisLabel, datasets, width, height }) => {
  const defaultColors = ['#79b2b7', '#0f7275', '#dee295'];

  const chartData = {
    labels: datasets[0].data.map((_, i) => i),
    datasets: datasets.map((dataset, index) => ({
      ...dataset,
      label: dataset.label || `Dataset ${index + 1}`,
      backgroundColor: dataset.backgroundColor || defaultColors[index % defaultColors.length],
      borderColor: dataset.borderColor || defaultColors[index % defaultColors.length],
      borderWidth: 4,
      pointBorderColor: dataset.borderColor || defaultColors[index % defaultColors.length],
      pointBackgroundColor: dataset.pointBackgroundColor || defaultColors[index % defaultColors.length],
      pointBorderWidth: 3,
    })),
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: xAxisLabel,
        },
        grid: {
          display: false,  // Turn off grid lines for the x-axis
        },
      },
      y: {
        title: {
          display: true,
          text: yAxisLabel,
        },
        ticks: {
          maxTicksLimit: 4,  // Limit the number of y-axis ticks to 4
        },
      },
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return <Line data={chartData} options={options} width={width} height={height} />;
};

export default LineChart;
