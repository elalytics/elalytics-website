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
      <div className="overflow-x-hidden bg-gray-100">
        <div className="my-2 text-center">
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
