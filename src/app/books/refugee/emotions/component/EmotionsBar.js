/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { barChartAxisTitle } from "@/app/utils/styles/chartjsDefaultStyles";

const EmotionsChart = (props) => {
  const [chartData, setChartData] = useState();

  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    setChartData(props.data);
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
          indexAxis: props.axis,
          scale: {
            ticks: {
              precision: 0,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grace: "5%",
              title: {
                display: true,
                text: props?.yAxisTitle || "",
                ...barChartAxisTitle,
              },
            },
            x: {
              grace: "5%",
              stacked: props.stacked === undefined ? false : props.stacked,
              title: {
                display: true,
                text: props?.xAxisTitle || "",
                ...barChartAxisTitle,
              },
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

export default EmotionsChart;
