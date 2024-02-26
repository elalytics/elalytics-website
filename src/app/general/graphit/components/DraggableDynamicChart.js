"use client";

import { Chart } from "chart.js/auto";
import dragData from "chartjs-plugin-dragdata";
import { useEffect, useRef, useState } from "react";
import DataEditor from "./DataEditor";
import { barChartAxisTitle } from "@/app/utils/styles/chartjsDefaultStyles";
import html2canvas from "html2canvas";

async function downloadImage() {
  const chartContainer = document.getElementById("chart-container");
  const canvas = await html2canvas(chartContainer);
  const imgData = canvas.toDataURL("image/jpeg");
  const link = document.createElement("a");
  link.href = imgData;
  link.download = "chart.jpeg";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const DraggableDynamicChart = ({
  data,
  IsEditMode,
  yRange,
  graphItId,
  graphTitle,
  yTitle,
  xTitle,
}) => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [consolidatedData, setConsolidatedData] = useState(data);
  const [labels, setLabels] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
  const [yRangeState, setYRange] = useState(yRange);
  const [graphTitleState, setGraphTitle] = useState(graphTitle);
  const [yTitleState, setYTitle] = useState(yTitle);
  const [xTitleState, setXTitle] = useState(xTitle);
  Chart.register(dragData);
  useEffect(() => {
    const labels = consolidatedData.map((item) => item.label);
    setLabels(labels);
    const data = consolidatedData.map((item) => item.value);
    setDataPoints(data);
  }, [consolidatedData]);
  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const myChartRef = chartContainer.current.getContext("2d");
      if (chartInstance.current) {
        // if a chart instance exists
        chartInstance.current.destroy(); // destroy it
      }

      let chartHeight = "500px";
      myChartRef.canvas.height = chartHeight;
      chartInstance.current = new Chart(myChartRef, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              data: dataPoints,
            },
          ],
        },

        options: {
          animation: false,
          indexAxis: "x",
          plugins: {
            dragData: {
              round: 1,
              onDragEnd: function (e, datasetIndex, index, value) {
                console.log(e, datasetIndex, index, value);
                //update consolidatedData
                const newData = [...consolidatedData];
                newData[index].value = value;
                setConsolidatedData(newData);
              },
            },

            legend: {
              display: false, // whether to display the legend
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              min: yRangeState.min,
              max: yRangeState.max,
              title: {
                display: true,
                text: yTitleState,
                ...barChartAxisTitle,
              },
            },
            x: {
              title: {
                display: true,
                text: xTitleState,
                ...barChartAxisTitle,
              },
            },
          },
          responsive: true,
          maintainAspectRatio: true,
        },
      });
    }
  }, [
    chartContainer,
    labels,
    dataPoints,
    consolidatedData,
    yRangeState,
    yTitleState,
    xTitleState,
  ]);
  return (
    <div className="flex w-full" style={{ height: "calc(100vh - 105px)" }}>
      <div className={`${IsEditMode ? "w-2/4" : "w-full"}`}>
        <div
          id="chart-container"
          className="aspect-[4/3] max-h-[500px] h-screen max-w-6xl m-auto pt-2 pb-10 pl-4 pr-4 mt-6"
        >
          <h1 className="text-3xl text-center">{graphTitleState}</h1>
          <canvas ref={chartContainer} />
        </div>
        <div className="flex justify-center items-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={downloadImage}
          >
            Download Chart
          </button>
        </div>
      </div>
      {
        // if edit mode is enabled, show the label editor
        IsEditMode && (
          <div className="w-2/4 p-4 bg-slate-200 overflow-y-scroll">
            <DataEditor
              data={consolidatedData}
              setData={setConsolidatedData}
              title={graphTitleState}
              setTitle={setGraphTitle}
              yTitle={yTitleState}
              setYTitle={setYTitle}
              xTitle={xTitleState}
              setXTitle={setXTitle}
              yRange={yRangeState}
              setYRange={setYRange}
              graphItId={graphItId}
            />
          </div>
        )
      }
    </div>
  );
};

export default DraggableDynamicChart;
