/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";

function getCategoriesColors(data) {
  var res = {};
  var colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#FFCD56",
    "#4Bc6C6",
    "#9976FF",
    "#FF9F60",
    "#FF5364",
    "#36B2FB",
    "#CFCF56",
    "#4AC0A0",
    "#9968AF",
    "#FF9F20",
    "#CF3E56",
    "#4AC0B0",
    "#9966AF",
    "#CF9F40",
  ]; // You can add more colors
  var uniqueCats = [...new Set(data.map((item) => item.category))];
  for (var i = 0; i < uniqueCats.length; i++) {
    res[uniqueCats[i]] = colors[i % colors.length]; // If we have more categories than predefined colors, it will start from the first color again.
  }
  return res;
}

const TopWordsBarChart = (props) => {
  const [chartData, setChartData] = useState();
  const [categoryColors, setCategoryColors] = useState(
    getCategoriesColors(props.data)
  );

  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    setCategoryColors(getCategoriesColors(props.data));

    let data = {
      labels: props.data.map((item) => item.word),
      datasets: [
        {
          data: props.data.map((item) => item.value),
          backgroundColor: props.data.map(
            (item) => categoryColors[item.category]
          ),
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
          plugins: {
            legend: {
              display: false,
            },
          },
          indexAxis: "y",
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
      <div className="flex m-auto">
        {Object.entries(categoryColors).map(([key, value]) => {
          return (
            <div className="m-2" key={key}>
              <FontAwesomeIcon icon={faSquare} style={{ color: value }} />
              <span>{key}</span>
            </div>
          );
        })}
      </div>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default TopWordsBarChart;
