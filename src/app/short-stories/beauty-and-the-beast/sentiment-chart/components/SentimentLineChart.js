"use client";
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { barChartAxisTitle } from "@/app/utils/styles/chartjsDefaultStyles";

const SentimentLineChart = ({ beaumontData, perraultData }) => {
  const [chartData, setChartData] = useState();
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    let data = {
      labels: Object.keys(perraultData),
      datasets: [
        {
          label: "Perrault",
          data: Object.values(perraultData),
          cubicInterpolationMode: "monotone",
        },
        {
          label: "Beaumont",
          data: Object.values(beaumontData),
          cubicInterpolationMode: "monotone",
        },
      ],
    };
    setChartData(data);
  }, []);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const myChartRef = chartContainer.current.getContext("2d");
      if (chartInstance.current) {
        // if a chart instance exists
        chartInstance.current.destroy(); // destroy it
      }

      chartInstance.current = new Chart(myChartRef, {
        type: "line",
        data: chartData,
        options: {
          plugins: {},
          scales: {
            y: {
              grace: "5%",
              title: {
                display: true,
                text: "Sentiment",
                ...barChartAxisTitle,
              },
              // hide ticks

              ticks: {
                font: { size: 26 },
                callback: function (label, index, labels) {
                  return "";
                },
              },

              // ticks: {
              //   font: { size: 26 },
              //   callback: function (label, index, labels) {
              //     switch (label) {
              //       case 0.85:
              //         return "😐";
              //       case 0.75:
              //         return "😞";
              //       case 1:
              //         return "😊";
              //     }
              //   },
              // },
            },
            x: {
              title: {
                display: true,
                text: "Words",
                ...barChartAxisTitle,
              },
            },
          },
          responsive: true,
        },
      });
    }
  }, [chartContainer, chartData]);

  if (chartData === undefined || chartData === null) {
    return <div>loading</div>;
  }

  return (
    <div style={{ width: "100%" }}>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default SentimentLineChart;
