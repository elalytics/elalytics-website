"use client";

import data from "./data/chapter_sentiment.json";
import SentimentLineChartWithGeography from "./components/SentimentLineChartWithGeography";
import ChapterNames from "./data/chapter_names.json";
import VisualizationContainerFrame from "@/app/utils/components/VisualizationContainerFrame";

function convertChapterSentimentDataForLineChart(data) {
  let result = [];
  for (let key in data) {
    result.push({
      key: ChapterNames[key.replace("_", " ")],
      value: data[key],
    });
  }

  return result;
}

export default function Home() {
  return (
    <div className="h-full max-w-5xl m-auto">
      <SentimentLineChartWithGeography
        data={convertChapterSentimentDataForLineChart(data)}
        label="Sentiment"
      />
    </div>
  );
}
