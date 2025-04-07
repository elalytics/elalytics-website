"use client";

import WordCloudDraggable from "@/app/utils/charts/WordCloudDraggable";
import { filterWordCloudData } from "@/app/utils/functions/general-functions";
import data from "./data/top_character_words.json";
import VisualizationContainerFrame from "@/app/utils/components/VisualizationContainerFrame";

export default function Home() {
  const wordsToRemove = ["’m"];
  const categoriesToRemove = [];

  return (
    <div>
      <div className="text-center">
        <p>
          Drag the words to different positions and see if you can find any new
          insights!
        </p>
      </div>
      <div className="h-full max-w-4xl m-auto">
        <WordCloudDraggable
          data={filterWordCloudData(data, wordsToRemove, categoriesToRemove)}
          wordSizeMultiplier={1}
          scaleType="log"
        />
      </div>
    </div>
  );
}
