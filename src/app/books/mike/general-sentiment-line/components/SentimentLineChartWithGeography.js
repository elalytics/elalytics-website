/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";

const SentimentLineChartWithGeography = (props) => {
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
              annotations: {
                line1: {
                  type: "line",
                  yMin: 0,
                  yMax: 0,
                  borderColor: "rgb(0,0,0)",
                  borderWidth: 2,
                },
              },
            },
          },
          scales: {
            y: {
              grace: "5%",
              title: {
                display: true,
                text: props.label,
              },
              ticks: {
                font: { size: 26 },
                callback: function (label, index, labels) {
                  switch (label) {
                    case 0:
                      return "😐";
                    case -0.5:
                      return "😞";
                    case 0.5:
                      return "😊";
                  }
                },
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

export default SentimentLineChartWithGeography;
