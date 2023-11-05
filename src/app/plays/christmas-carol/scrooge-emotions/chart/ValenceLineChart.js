"use client";
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

const ValenceLineChart = (props) => {
  const [chartData, setChartData] = useState();
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    let data = {
      labels: props.data.map((item) => item.actScene),
      datasets: [
        {
          label: "Valence",
          data: props.data.map((item) => item.valence),
          cubicInterpolationMode: "monotone",
        },
      ],
    };
    setChartData(data);
  }, [props.data, props.label]);

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
          scales: {
            y: {
              grace: "5%",
              title: {
                display: true,
                text: props.label,
              },
              ticks: {
                display: false,
              },
              min: 0,
            },
            x: {},
          },

          responsive: true,
        },
      });
    }
  }, [chartContainer, chartData, props.label]);

  if (chartData === undefined || chartData === null) {
    return <div>loading</div>;
  }

  return (
    <div style={{ width: "100%" }}>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default ValenceLineChart;
