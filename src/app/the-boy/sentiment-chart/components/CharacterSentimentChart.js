/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const BarChart = (props) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const options = {
    indexAxis: "y",
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const myChartRef = chartContainer.current.getContext("2d");
      if (chartInstance.current) {
        // if a chart instance exists
        chartInstance.current.destroy(); // destroy it
      }

      chartInstance.current = new Chart(myChartRef, {
        type: "bar",
        data: props.data,
        options: options,
      });
    }
  }, [chartContainer, props.data, options]);

  if (props.data === undefined || props.data === null) {
    return <div>loading</div>;
  }

  return (
    <div style={{ width: "500px" }}>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default BarChart;
