/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js/auto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faCheck } from "@fortawesome/free-solid-svg-icons";

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
  // Define the parts of speech we want to make selectable
  const partsOfSpeech = ["VERB", "ADV", "ADJ", "NOUN", "PROPN"];
  
  // State for selected categories - default all to true/selected
  const [selectedCategories, setSelectedCategories] = useState(
    partsOfSpeech.reduce((acc, category) => {
      acc[category] = true;
      return acc;
    }, {})
  );
  
  const [chartData, setChartData] = useState();
  const [categoryColors, setCategoryColors] = useState(
    getCategoriesColors(props.data)
  );
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  // Filter data based on selected categories
  const getFilteredData = () => {
    return props.data.filter(item => 
      selectedCategories[item.category] === true
    );
  };

  // Toggle category selection
  const toggleCategory = (category) => {
    setSelectedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Set category colors only once when component mounts or props.data changes
  useEffect(() => {
    setCategoryColors(getCategoriesColors(props.data));
  }, [props.data]);
  
  // Update chart data when filtered data changes
  useEffect(() => {
    const filteredData = getFilteredData();
    let data = {
      labels: filteredData.map((item) => item.word),
      datasets: [
        {
          data: filteredData.map((item) => item.value),
          backgroundColor: filteredData.map(
            (item) => categoryColors[item.category]
          ),
        },
      ],
    };
    setChartData(data);
  }, [props.data, selectedCategories, categoryColors]);

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
              ticks: {
                autoSkip: false
              },
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
      <div className="flex flex-wrap m-auto mb-4 justify-center">
        {Object.entries(categoryColors).map(([key, value]) => {
          return (
            <div className="m-2" key={key}>
              <FontAwesomeIcon icon={faSquare} style={{ color: value }} />
              <span className="ml-1">{key}</span>
            </div>
          );
        })}
      </div>
      
      <div className="flex flex-wrap justify-center mb-6">
        <div className="font-medium mb-2 w-full text-center">Filter Parts of Speech:</div>
        {partsOfSpeech.map((category) => (
          <div 
            key={category}
            onClick={() => toggleCategory(category)}
            className={`m-2 px-3 py-1 rounded-md cursor-pointer flex items-center ${
              selectedCategories[category] ? 'bg-blue-100 border border-blue-300' : 'bg-gray-100 border border-gray-300'
            }`}
          >
            <div className="w-5 h-5 flex items-center justify-center mr-2 rounded border border-gray-400">
              {selectedCategories[category] && <FontAwesomeIcon icon={faCheck} className="text-blue-500" size="xs" />}
            </div>
            <span>{category}</span>
          </div>
        ))}
      </div>
      
      <canvas ref={chartContainer} />
    </div>
  );
};

export default TopWordsBarChart;