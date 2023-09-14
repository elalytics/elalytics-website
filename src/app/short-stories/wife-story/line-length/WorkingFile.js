"use client";

import data from "./data/wife-story.json";
import LineLengthChart from "@/app/utils/charts/LineLengthChart";

function getLineLength(inputData) {
  let data = inputData;
  const result = data.map((item) => {
    const paragraphLines = item.paragraphText.split(/[.!?]+/);
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
      paragraph: item.paragraph,
      sentimentScore: item.sentimentScore,
      paragraphText: item.paragraphText,
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
            The Wife&apos;s Story
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
