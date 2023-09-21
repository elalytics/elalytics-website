/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

function convertCharDataToDataset(charData) {
  if (charData === undefined || charData === null) {
    return null;
  }
  return charData
    .filter((item) => item.conflicts !== 0)
    .map((item) => ({
      label: item.character,
      data:
        item.charType === "Children" ? [item.conflicts] : [, item.conflicts],
      backgroundColor: item.color,
      borderWidth: 1,
      stack: 0,
    }));
}

const ConflictBarChart = (props) => {
  const [chartData, setChartData] = useState();

  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    console.log("props.data", props.data);

    let data = {
      labels: ["Children", "Adult"],
      datasets: convertCharDataToDataset(props.data),
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
          indexAxis: "x",
          scale: {
            ticks: {
              precision: 0,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grace: "5%",
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

export default ConflictBarChart;
