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
                label1: {
                  type: "label",
                  xValue: 1,
                  yValue: 0.15,
                  content: ["Starting Point"],
                  font: {
                    size: 12,
                  },
                },
                box1: {
                  // Indicates the type of annotation
                  type: "box",
                  xMin: 0,
                  xMax: 2,
                  backgroundColor: "rgba(255, 99, 132, 0.25)",
                },
                label2: {
                  type: "label",
                  xValue: 5,
                  yValue: 0.15,
                  content: ["Llandaff Cathedral School", "1923-5 (age 7-9)"],
                  font: {
                    size: 12,
                  },
                },
                box2: {
                  // Indicates the type of annotation
                  type: "box",
                  xMin: 2,
                  xMax: 9,
                  backgroundColor: "rgba(145, 245, 132, 0.25)",
                },
                label3: {
                  type: "label",
                  xValue: 13,
                  yValue: 0.15,
                  content: ["St. Peter's", "1925-9 (age 9-13)"],
                  font: {
                    size: 12,
                  },
                },
                box3: {
                  // Indicates the type of annotation
                  type: "box",
                  xMin: 9,
                  xMax: 17,
                  backgroundColor: "rgba(199, 199, 255, 0.25)",
                },
                label4: {
                  type: "label",
                  xValue: 20.5,
                  yValue: 0.15,
                  content: ["Repton & Shell", "1929-36 (age 13-20)"],
                  font: {
                    size: 12,
                  },
                },
                box4: {
                  // Indicates the type of annotation
                  type: "box",
                  xMin: 17,
                  xMax: 25,
                  backgroundColor: "rgba(204, 209, 100, 0.25)",
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
