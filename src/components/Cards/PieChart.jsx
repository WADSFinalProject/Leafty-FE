import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import ChartJS from 'chart.js/auto';
import VectorLeafy from '../../assets/LeaftyLogo.svg';

function PieChart({ labels, data }) {
  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: ['#79b2b7', '#0f7275', '#dee295'],
        borderColor: ['#79b2b7', '#0f7275', '#dee295'],
        borderWidth: 0,
        strokeCap: 'round',
        spacing: 0,
        borderRadius: 0,
      },
    ],
  };

  const options = {
    plugins: {
      title: {
        display: true,
        text: 'Leaves Distribution',
        align: 'start', // Aligns the title to the left
        font: {
          size: 16,
          family: '"Roboto", sans-serif',
          weight: 'bold',
        },
        color: '#000000',
      },
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      drawCenterImage: {
        centerImageSrc: VectorLeafy,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
    cutout: '80%',
  };

  ChartJS.register({
    id: 'drawCenterImage',
    afterDraw: (chart) => {
      const { ctx, chartArea } = chart;
      const centerImageSrc = chart.options.plugins.drawCenterImage.centerImageSrc;
      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2;

      const drawImage = (image) => {
        const aspectRatio = image.width / image.height;
        const maxDimension = Math.min(chartArea.width, chartArea.height) * 0.4;
        const width = Math.min(image.width, maxDimension);
        const height = width / aspectRatio;
        ctx.drawImage(image, centerX - width / 2, centerY - height / 2, width, height);
      };

      const image = new Image();
      image.onload = () => drawImage(image);
      image.src = centerImageSrc;
    },
  });

  return <Doughnut data={chartData} options={options} height={250} />;
}

export default PieChart;