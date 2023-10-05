"use client";

import data from "./data/lottery-story-text.json";
import SentenceLengthChart from "@/app/utils/charts/SentenceLengthChart";
import { split } from "sentence-splitter";

function getLineLength(inputData) {
  let data = inputData;
  const result = data.map((item) => {
    const paragraphLines = split(item.paragraphText)
      .map((sentence) => sentence.raw)
      .filter((line) => line.trim() !== ""); // Filter out empty or whitespace-only lines

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

export default function App() {
  return (
    <main>
      <div className="h-screen overflow-x-hidden bg-gray-100">
        <div className="my-8 text-center">
          <span className="px-4 py-1 bg-stone-dark rounded text-white inline-block mb-1 text-sm font-bold">
            Lottery
          </span>
          <h1 className="text-3xl font-bold">Sentence Length Chart</h1>
        </div>
        <div className="max-w-7xl m-auto">
          <SentenceLengthChart
            sourceData={getLineLength(data)}
            showTooltip={true}
            hideParagraphAnnotation={true}
            note=""
            yLabel="Number of Words"
            xLabel="Sentence"
          />
        </div>
      </div>
    </main>
  );
}
