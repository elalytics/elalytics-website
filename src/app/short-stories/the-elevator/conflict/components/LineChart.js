/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";

const LineChart = (props) => {
  const [chartData, setChartData] = useState();
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  Chart.register(annotationPlugin);

  useEffect(() => {
    let data = {
      labels: props.data.map((item) => item.key),
      datasets: [
        {
          label: props.label,
          data: props.data.map((item) => item.value),
          cubicInterpolationMode: "monotone",
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
        type: "line",
        data: chartData,
        options: {
          plugins: {
            annotation: {
              annotations: {},
            },
            legend: {
              display: false, // whether to display the legend
            },
          },
          scales: {
            y: {
              grace: "5%",
              title: {
                display: true,
                text: props.yLabel,
              },
            },
            x: {
              grace: "5%",
              title: {
                display: true,
                text: props.xLabel,
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

export default LineChart;
