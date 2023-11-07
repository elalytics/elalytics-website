"use client";
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import colors from "../../../../../../colors";

const EmotionsLineChart = (props) => {
  const [chartData, setChartData] = useState();
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const angerImg = Object.assign(new Image(), {
      src: "/imgs/angry-emoji.png",
      width: 19,
      height: 19,
    });
    const joyImg = Object.assign(new Image(), {
      src: "/imgs/joy-emoji.png",
      width: 20,
      height: 20,
    });
    const sadImg = Object.assign(new Image(), {
      src: "/imgs/sad-emoji.png",
      width: 22,
      height: 22,
    });
    const disgustImg = Object.assign(new Image(), {
      src: "/imgs/disgust-emoji.png",
      width: 20,
      height: 20,
    });
    const shiftLabels = (data) => {
      let labels = data.map((item) => item.actScene);
      labels.unshift("");
      labels.push("");
      return labels;
    };

    const shiftChartValues = (data, emotion) => {
      let labels = data.map((item) => item.emotion_scores[emotion]);
      labels.unshift(null);
      labels.push(null);
      return labels;
    };
    let data = {
      labels: shiftLabels(props.data),
      datasets: [
        {
          label: "Joy",
          data: shiftChartValues(props.data, "joy"),
          pointStyle: joyImg,
          borderWidth: 1,
          borderColor: colors["sky"],
        },
        {
          label: "Sadness",
          data: shiftChartValues(props.data, "sadness"),
          pointStyle: sadImg,
          borderWidth: 1,
          borderColor: colors["stone"],
        },
        // {
        //   label: "Disgust",
        //   data: props.data.map((item) => item.emotion_scores.disgust),
        //   pointStyle: disgustImg,
        //   borderWidth: 1,
        // },
        {
          label: "Anger",
          data: shiftChartValues(props.data, "anger"),
          pointStyle: angerImg,
          borderWidth: 1,
          borderColor: colors["cardinal-red-light"],
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
          plugins: {
            legend: {
              labels: {
                usePointStyle: true,
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
                display: false,
              },
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

export default EmotionsLineChart;
