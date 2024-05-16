import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

function Graph() {
  const [chartInstance, setChartInstance] = useState(null);
  const chartContainer = useRef(null);

  useEffect(() => {
    let chartInstance = null;

    const initializeChart = () => {
      // Destroy previous chart instance if it exists
      if (chartInstance) {
        chartInstance.destroy();
      }

      // Create new chart instance
      const data = {
        labels: ["1", "2", "3", "4", "5", "6"],
        datasets: [
          {
            label: 'Leaves 1',
            data: [0, 290, 750, 1000, 250, 875],
            borderColor: '#D2D681',
            tension: 0.4,
            fill: false
          },
          {
            label: 'Leaves 2',
            data: [500, 250, 0, 500, 825],
            borderColor: '#79B2B7',
            tension: 0.4,
            fill: false
          }
        ]
      };

      const config = {
        type: 'line',
        data: data,
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: 'Leaves chart'
            }, 
            tooltip: {
              mode: 'index',
              intersect: false,
            },
            layout: {
              padding: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0
              },
              backgroundColor: {
                type: 'radialGradient',
                startRadius: 0,
                endRadius: 300,
                colorStops: [{
                  offset: 0,
                  color: '#FFFFFF' // Start color
                }, {
                  offset: 1,
                  color: '#D4D4D4' // End color
                }],
                gradientDirection: 'radial'
              }
            },
            Legend:{
              display:false
            }
          }, 
          scales: {
            x: {
              display: true,
              title: {
                display: false,
              }
            },
            y: {
              display: true,
              title: {
                display: false,
              }
            }
          }
        }
      };

      const ctx = chartContainer.current.getContext('2d');
      chartInstance = new Chart(ctx, config);
      setChartInstance(chartInstance);
    };

    initializeChart();

    // Cleanup function to destroy the chart instance when component unmounts
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, []);

  return (
    <div className="flex-1">
      <canvas ref={chartContainer}></canvas>
    </div>
  );
}

export default Graph;
