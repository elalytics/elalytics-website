"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { barChartAxisTitle } from "@/app/utils/styles/chartjsDefaultStyles";

const QuotedWordsBarChart = (props) => {
  const [chartData, setChartData] = useState();

  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    let data = {
      labels: props.data.map((item) => item.word),
      datasets: [
        {
          label: "Prometheus",
          data: props.data.map((item) => item["count"]["Prometheus"]),
          backgroundColor: "red",
        },
        {
          label: "Zeus",
          data: props.data.map((item) => item["count"]["Zeus"]),
          backgroundColor: "Blue",
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
              display: true,
            },
          },
          indexAxis: "y",
          scale: {
            ticks: {
              precision: 0,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grace: "5%",
              ticks: {
                autoSkip: false,
              },
              title: {
                display: true,
                text: "Words",
                ...barChartAxisTitle,
              },
            },
            x: {
              title: {
                display: true,
                text: "Frequency",
                ...barChartAxisTitle,
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [chartContainer, chartData]);

  if (props.data === undefined || props.data === null) {
    return <div>loading</div>;
  }

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default QuotedWordsBarChart;
