"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const ChartsList = ({ chartItems }) => {
  const categories = [...new Set(chartItems.map((item) => item.category))];
  const [selectedCategories, setSelectedCategories] = useState(categories);
  const [searchTerm, setSearchTerm] = useState(""); // Add this line

  useEffect(() => {
    setSelectedCategories(categories);
  }, [chartItems]);

  const handleCheckboxChange = (category) => {
    setSelectedCategories((prevState) => {
      if (prevState.includes(category)) {
        return prevState.filter((cat) => cat !== category);
      } else {
        return [...prevState, category];
      }
    });
  };

  const filteredItems = chartItems
    .filter((chart) => selectedCategories.includes(chart.category))
    .filter((chart) =>
      chart.title.toLowerCase().includes(searchTerm.toLowerCase())
    ); // Add this line

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-center my-2">
          <input
            className="text-center text-lg w-80 p-2 border rounded"
            type="text"
            placeholder="Search by title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // Add this line
          />
        </div>
        <div className="flex gap-4 justify-center my-2 text-lg">
          {categories.map((category) => (
            <div key={category}>
              <input
                type="checkbox"
                id={category}
                name={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCheckboxChange(category)}
                className="mr-1"
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-4 flex-wrap">
        {filteredItems.map((chart, index) => (
          <Link key={index} href={chart.link}>
            <div
              className="p-4 border w-64 bg-white rounded drop-shadow-sm hover:drop-shadow-md h-32"
              title={chart.title}
            >
              <p className="text-sm font-bold text-zinc-400">
                {chart.category}
              </p>
              <h2
                className="text-2xl font-bold line-clamp-2"
                title={chart.title}
              >
                {chart.title}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChartsList;
