/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

const CharacterSentimentChart = (props) => {
  const [chartData, setChartData] = useState();
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    let data = {
      labels: props.data.map((characterData) => characterData.character),
      datasets: [
        {
          label: "Positive",
          data: props.data.map(
            (characterData) => characterData.positive.length
          ),
          backgroundColor: "rgb(74 222 128 / 0.4)",
          borderColor: "rgb(74 222 128)",
          borderWidth: 1,
        },
        {
          label: "Negative",
          data: props.data.map(
            (characterData) => characterData.negative.length
          ),
          backgroundColor: "rgb(248 113 113 / 0.4)",
          borderColor: "rgb(248 113 113)",
          borderWidth: 1,
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
          indexAxis: "y",
          scales: {
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            tooltip: {
              mode: "nearest",
              intersect: true,
              callbacks: {
                label: function (tooltipItem) {
                  if (tooltipItem.dataset.label === "Positive") {
                    return (
                      tooltipItem.dataset.label +
                      ": " +
                      tooltipItem.raw +
                      " (" +
                      props.data[tooltipItem.dataIndex].positive +
                      ")"
                    );
                  } else if (tooltipItem.dataset.label === "Negative") {
                    return (
                      tooltipItem.dataset.label +
                      ": " +
                      tooltipItem.raw +
                      " (" +
                      props.data[tooltipItem.dataIndex].negative +
                      ")"
                    );
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

export default CharacterSentimentChart;
