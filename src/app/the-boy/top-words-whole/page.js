"use client";

import WordCloudDraggable from "../../utils/charts/WordCloudDraggable";
import { filterWordCloudData } from "@/app/utils/functions/general-functions";
import data from "./data/topwordsPOS.json";

export default function Home() {
  const wordsToRemove = [];
  const categoriesToRemove = [];
  return (
    <main>
      <div className="h-screen overflow-x-hidden bg-gray-100">
        <div className="my-8 text-center">
          <span className="px-4 py-1 bg-stone-600 rounded text-white inline-block mb-1 text-sm font-bold">
            Boy
          </span>
          <h1 className="text-3xl font-bold ">Top 100 Words in the book</h1>
          <p>
            Drag the words to different positions and see if you can find any
            new insights!
          </p>
        </div>
        <div className="h-full w-screen">
          <WordCloudDraggable
            data={filterWordCloudData(data, wordsToRemove, categoriesToRemove)}
            wordSizeMultiplier={1}
            scaleType="log"
          />
        </div>
      </div>
    </main>
  );
}
