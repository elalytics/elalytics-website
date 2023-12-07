"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import colors from "../../../../../colors";
import { barChartAxisTitle } from "@/app/utils/styles/chartjsDefaultStyles";

const QuotedWordsBarChart = (props) => {
  const [chartData, setChartData] = useState();

  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  function getColor(frequency) {
    if (frequency === 1) {
      return colors["digital-red-light"];
    }
    if (frequency === 2) {
      return colors["digital-red"];
    }
    if (frequency >= 3) {
      return colors["digital-red-dark"];
    }
  }

  useEffect(() => {
    let data = {
      labels: props.data.map((item) => item.word),
      datasets: [
        {
          data: props.data.map((item) => item.frequency),
          backgroundColor: props.data.map((item) => getColor(item.frequency)),
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
