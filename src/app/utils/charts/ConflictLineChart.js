/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import annotationPlugin from "chartjs-plugin-annotation";

export const conflictDefinition =
  "The conflict score is calculated by breaking each paragraph down into sentences. Every sentence gets a computed 'negativity' and 'intensity' score, and then this is averaged to give each paragraph a conflict score, with the idea being the more negative and intense the emotions in a paragraph are, the higher the conflict is. A higher score == more conflict.";

//sourceData format: [{key: "1", value: 0.5, tooltip: "This is an example tooltip"}]

const ConflictLineChart = ({ sourceData, showTooltip, xLabel, yLabel }) => {
  const [chartData, setChartData] = useState();
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  Chart.register(annotationPlugin);

  useEffect(() => {
    let data = {
      labels: sourceData.map((item) => item.key),
      datasets: [
        {
          label: sourceData.map((item) => item.key),
          data: sourceData.map((item) => item.value),
          toolTip: sourceData.map((item) => item.tooltip),
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
              annotations: {},
            },
            tooltip: {
              enabled: showTooltip !== undefined ? showTooltip : true,
              callbacks: {
                title: function (context) {
                  let title = xLabel + " " + context[0].label;
                  return title;
                },
                label: function (context) {
                  let index = context.dataIndex;
                  return context.dataset.toolTip[index] || context.formattedValue;
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
    <div style={{ width: "100%" }}>
      <canvas ref={chartContainer} />
    </div>
  );
};

export default ConflictLineChart;
