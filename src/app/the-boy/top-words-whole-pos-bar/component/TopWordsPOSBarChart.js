/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";

function convertFormat(A) {
  const dataset = [];
  let labels = [];

  // Get unique categories
  const categories = [...new Set(A.map((item) => item.category))];

  // Group data by words
  const groupedData = A.reduce((result, current) => {
    result[current.word] = result[current.word] || [];
    result[current.word].push(current);
    return result;
  }, {});

  // Populate dataset array
  Object.keys(groupedData).forEach((word, index) => {
    const dataPoints = [];
    const wordLabels = [];
    categories.forEach((category) => {
      const catData = groupedData[word].find(
        (item) => item.category === category
      );
      dataPoints.push(catData ? catData.value : "");
      wordLabels.push(catData ? catData.word : "");
    });
    dataset.push({
      labels: wordLabels,
      data: dataPoints,
      backgroundColor: "red",
    });
  });

  // Format final object
  const B = {
    labels: categories,
    datasets: dataset,
  };
  console.log(B);
  return B;
}

const TopWordsBarChart = (props) => {
  const [chartData, setChartData] = useState();

  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    let data = convertFormat(props.data);
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

export default TopWordsBarChart;
