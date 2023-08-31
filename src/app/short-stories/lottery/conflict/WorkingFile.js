"use client";

import data from "./data/letter_conflict_with_sentences.json";
import ConflictLineChart from "@/app/utils/charts/ConflictLineChart";
import { conflictDefinition } from "@/app/utils/charts/ConflictLineChart";

function convertFormat(originalObj) {
  const result = [];

  // Loop through each key-value pair in the original object
  for (const key in originalObj) {
    // Extract the float value and the string sentence from the value array
    let [value, tooltip] = originalObj[key];
    tooltip = "Exemplar: " + tooltip;

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
    <main>
      <div className="h-screen overflow-x-hidden bg-gray-100">
        <div className="my-8 text-center">
          <span className="px-4 py-1 bg-stone-600 rounded text-white inline-block mb-1 text-sm font-bold">
            Lottery
          </span>
          <h1 className="text-3xl font-bold ">Conflict Chart</h1>
          <p className="max-w-5xl m-auto px-10">{conflictDefinition}</p>
        </div>
        <div className="h-full max-w-5xl m-auto">
          <ConflictLineChart
            sourceData={convertFormat(data)}
            showTooltip={true}
            yLabel="Conflict"
            xLabel="Paragraph"
          />
        </div>
      </div>
    </main>
  );
}
