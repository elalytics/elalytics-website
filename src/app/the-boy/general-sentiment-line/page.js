"use client";

import data from "./data/chapter_sentiment.json";
import SentimentLineChartWithGeography from "./components/SentimentLineChartWithGeography";
import ChapterNames from "./data/boy_chapter_names.json";

function convertChapterSentimentDataForLineChart(data) {
  let result = [];
  for (let key in data) {
    result.push({
      key: ChapterNames[key.replace("_", " ")],
      value: data[key],
    });
  }
  console.log(result);
  return result;
}

export default function Home() {
  return (
    <main>
      <div className="h-screen overflow-x-hidden bg-gray-100">
        <div className="my-8 text-center">
          <span className="px-4 py-1 bg-stone-600 rounded text-white inline-block mb-1 text-sm font-bold">
            Boy
          </span>
          <h1 className="text-3xl font-bold ">Sentiment Chart</h1>
        </div>
        <div className="h-full max-w-5xl m-auto">
          <SentimentLineChartWithGeography
            data={convertChapterSentimentDataForLineChart(data)}
            label="Sentiment"
          />
        </div>
      </div>
    </main>
  );
}
