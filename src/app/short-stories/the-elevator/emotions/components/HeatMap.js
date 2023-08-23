/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

function convertEmotionsDataToHeatMap(a) {
  const colors = {
    fear: "red",
    curiosity: "blue",
    shame: "yellow",
    disappointment: "green",
    relief: "purple",
  };

  const labels = Object.keys(a["1"].emotionalStates).map(
    (e) => e.charAt(0).toUpperCase() + e.slice(1)
  );

  const datasets = Object.entries(a).map(([key, entry]) => {
    const emotionalStates = entry.emotionalStates;
    const backgroundColor = Object.entries(emotionalStates).map(
      ([emotion, state]) => (state ? colors[emotion] : "transparent")
    );

    return {
      label: `Line ${key}`,
      data: Array(5).fill(1),
      backgroundColor: backgroundColor,
    };
  });

  return {
    labels: labels,
    datasets: datasets,
  };
}

const HeatMap = (props) => {
  const [chartData, setChartData] = useState();

  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    setChartData(convertEmotionsDataToHeatMap(props.data));
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
          indexAxis: "y",
          scale: {
            ticks: {
              precision: 0,
            },
          },
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
              stacked: true,
            },
            x: {
              stacked: true,
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

  return <canvas ref={chartContainer} />;
};

export default HeatMap;
