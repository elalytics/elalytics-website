"use client";

import { Chart } from "chart.js/auto";
import dragData from "chartjs-plugin-dragdata";
import { useEffect, useRef, useState } from "react";

const DraggableDynamicChart = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);
  const [consolidatedData, setConsolidatedData] = useState([
    { label: "Red", value: 0 },
    { label: "Blue", value: 0 },
    { label: "Yellow", value: 0 },
    { label: "Green", value: 0 },
    { label: "Purple", value: 0 },
    { label: "Orange", value: 0 },
  ]);
  const [labels, setLabels] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);
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
              max: 100,
            },
          },
          responsive: true,
          maintainAspectRatio: true,
        },
      });
    }
  }, [chartContainer, labels, dataPoints, consolidatedData]);
  return (
    <div className="flex w-full">
      <div className="w-2/4">
        <canvas ref={chartContainer} />
      </div>
      <div className="w-2/4">
        <LabelEditor
          consolidatedData={consolidatedData}
          updateConsolidatedData={setConsolidatedData}
        />
      </div>
    </div>
  );
};

export default DraggableDynamicChart;

const LabelEditor = ({ consolidatedData, updateConsolidatedData }) => {
  // table like component to edit and add new labels
  const [data, setData] = useState(consolidatedData);
  const [newDataPoint, setNewDataPoint] = useState({ label: "", value: 0 });
  const moveRow = (index, direction) => {
    const newData = [...data];
    const temp = newData[index];
    newData[index] = newData[index + direction];
    newData[index + direction] = temp;
    setData(newData);
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Label</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].label = e.target.value;
                      setData(newData);
                    }}
                  />
                </td>
                <td>
                  <input
                    type="number"
                    value={item.value}
                    onChange={(e) => {
                      const newData = [...data];
                      newData[index].value = e.target.value;
                      setData(newData);
                    }}
                  />
                </td>
                <td>
                  <button
                    onClick={() => {
                      setData([
                        ...data.slice(0, index),
                        ...data.slice(index + 1),
                      ]);
                    }}
                  >
                    Delete
                  </button>
                  {index > 0 && (
                    <button onClick={() => moveRow(index, -1)}>Move Up</button>
                  )}
                  {index < data.length - 1 && (
                    <button onClick={() => moveRow(index, 1)}>Move Down</button>
                  )}
                </td>
              </tr>
            );
          })}
          <tr>
            <td>
              <input
                type="text"
                value={newDataPoint.label}
                onChange={(e) => {
                  setNewDataPoint({ ...newDataPoint, label: e.target.value });
                }}
              />
            </td>
            <td>
              <input
                type="number"
                value={newDataPoint.value}
                onChange={(e) => {
                  setNewDataPoint({ ...newDataPoint, value: e.target.value });
                }}
              />
            </td>
            <td>
              <button
                onClick={() => {
                  setData([...data, newDataPoint]);
                  setNewDataPoint({ label: "", value: 0 });
                }}
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button
        onClick={() => {
          updateConsolidatedData(data);
        }}
      >
        Update
      </button>
    </div>
  );
};
