import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../../style/BarChart.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const labels = ['01/12', '01/13', '01/14', '01/15', '01/16', '01/17', '01/18'];

const data = {
  labels,
  datasets: [
    {
      label: 'Total Production',
      data: [1200, 1500, 1100, 1700, 1300, 1900, 1400], // replace this with actual data
      backgroundColor: [
        '#0f7275',
        '#79b2b7',
        '#94c3b3',
        '#c0cd30',
        '#dee295',
      ],
      borderColor: 'transparent',
      borderWidth: 0,
      barThickness: 20,
      borderRadius: {
        topLeft: 5,
        topRight: 5,
      },
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: true,
      text: 'Total Production',
      align: 'start', // Aligns the title to the left
      font: {
        size: 16,
        family: '"Roboto", sans-serif',
        weight: 'bold',
      },
      color: '#000000',
    },
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        display: true,
      },
      ticks: {
        callback: (value) => value.toLocaleString(),
        font: {
          size: 14,
          family: '"Roboto", sans-serif',
          weight: 'normal',
        },
        color: '#333',
        display: false
      },
    },
    x: {
      grid: {
        display: false,
      },
      ticks: {
        font: {
          size: 12,
          family: '"Roboto", sans-serif',
          weight: 'normal',
        },
        color: '#333',
      },
      padding: {
        top: 10,
        bottom: 10,
        left: 20,
        right: 10,
      },
    },
  },
};



export default function BarChart() {
  return <Bar data={data} options={options} height={250} width={750}/>;
}