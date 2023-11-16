"use client";
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import colors from "../../../../../../colors";

const EmotionsLineChart = (props) => {
  const [chartData, setChartData] = useState();
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  let pointOnClick = props.pointOnClick;

  useEffect(() => {
    console.log(props.data);
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
    const surpriseImg = Object.assign(new Image(), {
      src: "/imgs/surprise-emoji.png",
      width: 20,
      height: 20,
    });
    const fearImg = Object.assign(new Image(), {
      src: "/imgs/fear-emoji.png",
      width: 20,
      height: 20,
    });
    const shiftLabels = (data) => {
      let labels = data.map((item) => item.label);
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
    let borderWidth = 0;
    let data = {
      labels: shiftLabels(props.data),
      datasets: [
        {
          label: "Joy",
          data: shiftChartValues(props.data, "joy"),
          pointStyle: joyImg,
          borderWidth: borderWidth,
          borderColor: colors["sky"],
        },
        {
          label: "Sadness",
          data: shiftChartValues(props.data, "sadness"),
          pointStyle: sadImg,
          borderWidth: borderWidth,
          borderColor: colors["stone"],
        },
        {
          label: "Disgust",
          data: shiftChartValues(props.data, "disgust"),
          pointStyle: disgustImg,
          borderWidth: borderWidth,
        },
        {
          label: "Anger",
          data: shiftChartValues(props.data, "anger"),
          pointStyle: angerImg,
          borderWidth: borderWidth,
          borderColor: colors["cardinal-red-light"],
        },
        {
          label: "Fear",
          data: shiftChartValues(props.data, "fear"),
          pointStyle: fearImg,
          borderWidth: borderWidth,
          borderColor: colors["palo-alto"],
        },
        {
          label: "Surpise",
          data: shiftChartValues(props.data, "surprise"),
          pointStyle: surpriseImg,
          borderWidth: borderWidth,
          borderColor: colors["poppy"],
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
          onClick: function (evt, activeElements) {
            if (activeElements.length > 0) {
              const firstPoint = activeElements[0];
              const label = this.data.labels[firstPoint.index];
              const value =
                this.data.datasets[firstPoint.datasetIndex].data[
                  firstPoint.index
                ];
              pointOnClick(firstPoint);
            }
          },
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
      <p className="text-center italic">Click on the legend to filter</p>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default EmotionsLineChart;
