/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";
import chroma from "chroma-js";

const LineLengthChart = ({ sourceData, showTooltip, xLabel, yLabel, note }) => {
  const [chartData, setChartData] = useState();
  const [annotations, setAnnotations] = useState();
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  Chart.register(annotationPlugin);
  useEffect(() => {
    let numberOfWordsInEachLine = (() => {
      let result = [];
      sourceData.forEach((item) => {
        if (Array.isArray(item.lines)) {
          // Iterate through each line and push word counts
          item.lines.forEach((item) => {
            result.push(item.wordCount);
          });
        } else {
          // Handle the case where wordCount is not an array (last line)
          result.push(item.wordCount);
        }
      });
      return result;
    })();

    let lines = (() => {
      let result = [];
      sourceData.forEach((item) => {
        if (Array.isArray(item.lines)) {
          // Iterate through each line and push word counts
          item.lines.forEach((item) => {
            result.push(item.line);
          });
        } else {
          // Handle the case where wordCount is not an array (last line)
          result.push(item.line);
        }
      });
      return result;
    })();

    let paragraphs = (() => {
      let result = [];
      sourceData.forEach((item) => {
        if (Array.isArray(item.lines)) {
          result.push({
            sentimentScore: item.sentimentScore,
            lines: item.lines.length,
          });
        }
      });

      return result;
    })();
    const createSequentialArray = (length) => {
      return Array.from({ length }, (_, i) => i + 1);
    };
    function createAnnotations(dataArray) {
      let annotations = {};
      let xMin = 0;

      for (let i = 0; i < dataArray.length; i++) {
        const lines = dataArray[i].lines;
        const xMax = xMin + lines;
        let maxYValue = Math.max(...numberOfWordsInEachLine); // assuming numberOfWordsInEachLine is your y-axis data
        const boxName = `box${i + 1}`;
        const textName = `label${i + 1}`;

        // Generate a random light color using Chroma.js
        const color = chroma
          .random()
          .saturate(0.6)
          .luminance(0.85)
          .alpha(0.5)
          .css();

        annotations[boxName] = {
          type: "box",
          xMin,
          xMax,
          yMin: 0,
          yMax: "max",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        };

        annotations[textName] = {
          type: "label",
          position: "top",
          content: `P${i + 1}`,
          xValue: xMin + 2,
          yValue: maxYValue, // set yValue to the maximum lines value
        };

        xMin = xMax;
      }

      return annotations;
    }

    setAnnotations(createAnnotations(paragraphs));

    let numberOfLines = createSequentialArray(numberOfWordsInEachLine.length);

    let data = {
      labels: [...numberOfLines, null],
      datasets: [
        {
          label: [...numberOfLines, null],
          data: [...numberOfWordsInEachLine, null],
          toolTip: lines,
          cubicInterpolationMode: "monotone",
        },
      ],
    };
    setChartData(data);
  }, [sourceData]);

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
              annotations: annotations,
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function (context) {
                  return (
                    context.dataset.toolTip[context.dataIndex]
                      .split(" ")
                      .slice(0, 6)
                      .join(" ") + "..."
                  );
                },
                title: function (context) {
                  return (
                    "Line " +
                      context[0].label +
                      " - " +
                      context[0].formattedValue +
                      " Words" || ""
                  );
                },
              },
            },
            legend: {
              display: false, // whether to display the legend
            },
          },

          scales: {
            y: {
              grace: "5%",
              beginAtZero: true,
              title: {
                display: true,
                text: yLabel,
              },
            },
            x: {
              grace: "5%",
              title: {
                display: true,
                text: xLabel,
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
    <div className="w-full px-4">
      <p className="text-center italic">{note}</p>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default LineLengthChart;
