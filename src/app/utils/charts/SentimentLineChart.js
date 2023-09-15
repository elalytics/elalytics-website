/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { Tooltip } from "react-tooltip";

export const conflictDefinition =
  "The conflict score is calculated by breaking each paragraph down into sentences. Every sentence gets a computed 'negativity' and 'intensity' score, and then this is averaged to give each paragraph a conflict score, with the idea being the more negative and intense the emotions in a paragraph are, the higher the conflict is. A higher score == more conflict.";

const SentimentLineChart = ({
  sourceData,
  showTooltip,
  xLabel,
  yLabel,
  note,
}) => {
  const [chartData, setChartData] = useState();
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [tooltipData, setTooltipData] = useState({
    show: false,
    x: 0,
    y: 0,
    text: "Hello hello",
  });
  const [isHoveringTooltip, setIsHoveringTooltip] = useState(false);
  console.log("sourceData", sourceData);
  const canvasBackgroundColor = {
    id: "canvasBackgroundColor",
    beforeDraw: (chart) => {
      const ctx = chart.canvas.getContext("2d");
      const chartArea = chart.chartArea;
      const gradient = ctx.createLinearGradient(
        0,
        chartArea.bottom,
        0,
        chartArea.top
      );
      const maxVal = Math.max(...sourceData.map((item) => item.value));
      const minVal = Math.min(...sourceData.map((item) => item.value));

      const normalize = (value) => value / 3;

      const normalizedMaxVal = normalize(maxVal);
      const normalizedMinVal = normalize(minVal);

      gradient.addColorStop(1, `rgba(255, 100, 100, ${normalizedMaxVal})`);
      gradient.addColorStop(0, `rgba(255, 100, 100, 0)`);
      ctx.save();
      ctx.globalCompositeOperation = "destination-over";
      ctx.fillStyle = gradient;
      ctx.fillRect(
        chartArea.left,
        chartArea.top,
        chartArea.right - chartArea.left,
        chartArea.bottom - chartArea.top
      );
      ctx.restore();
    },
  };

  Chart.register(canvasBackgroundColor);

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
    console.log("chartData", chartData);
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
            tooltip: {
              enabled: false,
            },
            legend: {
              display: false, // whether to display the legend
            },
          },
          onClick: function (event, chartElement) {
            if (chartElement[0]) {
              const { index } = chartElement[0];
              const { x, y } =
                chartInstance.current.canvas.getBoundingClientRect();

              const tooltip = chartData.datasets[0].toolTip[index];
              setTooltipData({
                show: true,
                x: chartElement[0].element.x + x,
                y: chartElement[0].element.y + y,
                label: chartData.labels[index],
                text: tooltip,
              });
            } else if (!isHoveringTooltip) {
              setTooltipData({ show: false, x: 0, y: 0, text: "" });
            }
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
        plugins: [canvasBackgroundColor],
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
      <Tooltip
        id="chartjs-tooltip"
        place="top"
        effect="solid"
        clickable={true}
        variant="light"
        position={{ y: tooltipData.y, x: tooltipData.x }}
        isOpen={tooltipData.show}
      >
        <div className="max-w-2xl">
          <h4 className="font-bold">
            {xLabel} {tooltipData.label}
          </h4>
          <p>{tooltipData.text}</p>
        </div>
      </Tooltip>
    </div>
  );
};

export default SentimentLineChart;
