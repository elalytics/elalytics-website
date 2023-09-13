"use client";

import data from "./data/elevator_conflict_with_sentences.json";
import LineLengthChart from "@/app/utils/charts/LineLengthChart";

function convertFormat(originalObj) {
  const result = [];

  // Loop through each key-value pair in the original object
  for (const key in originalObj) {
    // Extract the float value and the string sentence from the value array
    let [value, tooltip] = originalObj[key];
    tooltip = tooltip;

    // Create a new object and push it to the result array
    result.push({ key, value, tooltip });
  }

  return result;
}

function getLineLength(inputData) {
  let data = convertFormat(inputData);
  const result = data.map((item) => {
    const paragraphLines = item.tooltip.split(/[.!?]+/);
    let linesWithWordCount = paragraphLines.map((line) => ({
      line: line.trim(),
      wordCount: line
        .trim()
        .split(/\s+/)
        .filter((word) => word !== "").length,
    }));

    // Check if the last line has zero word count and remove it
    if (
      linesWithWordCount.length > 0 &&
      linesWithWordCount[linesWithWordCount.length - 1].wordCount === 0
    ) {
      linesWithWordCount.pop();
    }

    return {
      paragraph: item.key,
      sentimentScore: item.value,
      paragraphText: item.tooltip,
      lines: linesWithWordCount,
    };
  });

  return result;
}

export const metadataDetails = {
  title: "Line Length Chart",
};

export default function App() {
  return (
    <main>
      <div className="h-screen overflow-x-hidden bg-gray-100">
        <div className="my-8 text-center">
          <span className="px-4 py-1 bg-stone-600 rounded text-white inline-block mb-1 text-sm font-bold">
            The Elevator
          </span>
          <h1 className="text-3xl font-bold">Line Length Chart</h1>
        </div>
        <div className="h-full max-w-5xl m-auto">
          <LineLengthChart
            sourceData={getLineLength(data)}
            showTooltip={true}
            note=""
            yLabel="Number of Words"
            xLabel="Line"
          />
        </div>
      </div>
    </main>
  );
}
