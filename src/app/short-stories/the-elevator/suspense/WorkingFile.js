"use client";

import data from "./data/elevator_conflict_with_sentences.json";
import ConflictLineChart from "@/app/utils/charts/SentimentLineChart";

import { conflictDefinition } from "@/app/utils/charts/SentimentLineChart";

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
    <main>
      <div className="h-screen overflow-x-hidden bg-gray-100">
        <div className="my-8 text-center">
          <span className="px-4 py-1 bg-stone-dark rounded text-white inline-block mb-1 text-sm font-bold">
            The Elevator
          </span>
          <h1 className="text-3xl font-bold">Suspense Chart</h1>
          <p className="max-w-5xl m-auto px-10">
            The suspense score is calculated by breaking each paragraph down
            into sentences. Every sentence gets a computed
            &apos;negativity&apos; and &apos;intensity&apos; score, and then
            this is averaged to give each paragraph a suspense score, with the
            idea being the more negative and intense the emotions in a paragraph
            are, the higher the suspense is. A higher score == more suspense.
          </p>
        </div>
        <div className="h-full max-w-5xl m-auto">
          <ConflictLineChart
            sourceData={convertFormat(data)}
            showTooltip={true}
            note="Click on the datapoint to see the paragraph text."
            yLabel="Suspense"
            xLabel="Paragraph"
          />
        </div>
      </div>
    </main>
  );
}
