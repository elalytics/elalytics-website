"use client";

import data from "./data/letter_conflict_with_sentences.json";
import SentimentLineChart from "@/app/utils/charts/SentimentLineChart";

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

export const metadataDetails = {
  title: "Conflict Chart",
};

export default function App() {
  return (
    <div className="overflow-x-hidden bg-gray-100">
      <div className="h-full max-w-5xl m-auto">
        <SentimentLineChart
          sourceData={convertFormat(data)}
          showTooltip={true}
          note="Click on the datapoint to see the paragraph text."
          yLabel="Suspense"
          xLabel="Paragraph"
        />
      </div>
    </div>
  );
}
