"use client";
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

const TopWordsBarChart = (props) => {
  const [chartData, setChartData] = useState();

  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    let data = {
      labels: Object.keys(props.data),
      datasets: [
        {
          data: Object.values(props.data),
        },
      ],
    };
    setChartData(data);
  }, [props.data]);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const myChartRef = chartContainer.current.getContext("2d");
      if (chartInstance.current) {
        // if a chart instance exists
        chartInstance.current.destroy(); // destroy it
      }

      chartInstance.current = new Chart(myChartRef, {
        type: "bar",
        data: chartData,
        options: {
          plugins: {
            legend: {
              display: false,
            },
          },
          indexAxis: "x",
          scale: {
            ticks: {
              precision: 0,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grace: "5%",
            },
          },
          responsive: true,
        },
      });
    }
  }, [chartContainer, chartData]);

  if (props.data === undefined || props.data === null) {
    return <div>loading</div>;
  }

  return (
    <div style={{ width: "100%" }}>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default TopWordsBarChart;
