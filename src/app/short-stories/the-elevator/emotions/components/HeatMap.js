/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

function convertEmotionsDataToHeatMap(a) {
  const labels = Object.keys(a["1"].emotionalStates).map(
    (e) => e.charAt(0).toUpperCase() + e.slice(1)
  );

  const datasets = Object.entries(a).map(([key, entry]) => {
    const emotionalStates = entry.emotionalStates;
    const colors = { true: "#4B88A2", false: "#D3D4D9" };
    const backgroundColor = Object.entries(emotionalStates).map(
      ([emotion, state]) => colors[state]
    );

    return {
      label: `${entry.text}`,
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

          plugins: {
            annotation: {
              annotations: {},
            },
            legend: {
              display: false, // whether to display the legend
            },
            tooltip: {
              callbacks: {
                title: function (tooltipItem, data) {
                  // return the title for the tooltip
                  return "Line " + (tooltipItem[0].datasetIndex + 1);
                },
                label: function (tooltipItem, data) {
                  // return the label for the tooltip
                  return tooltipItem.dataset.label;
                },
              },
            },
          },
          scales: {
            y: {
              stacked: true,
            },
            x: {
              stacked: true,
              title: {
                display: true,
                text: "Lines",
              },
              max: chartData?.datasets.length,
            },
          },
          responsive: true,
        },
      });
    }
    console.log(chartData);
  }, [chartContainer, chartData]);

  if (props.data === undefined || props.data === null) {
    return <div>loading</div>;
  }

  return <canvas ref={chartContainer} />;
};

export default HeatMap;
