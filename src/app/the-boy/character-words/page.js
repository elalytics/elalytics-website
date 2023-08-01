"use client";

import WordCloudDraggable from "../../utils/charts/WordCloudDraggable";
import { filterWordCloudData } from "@/app/utils/functions/general-functions";

export default function Home() {
  const data = [
    { word: "Apple", category: "Fruits", value: 20 },
    { word: "Banana", category: "Fruits", value: 30 },
    { word: "Carrot", category: "Vegetables", value: 15 },
    { word: "Broccoli", category: "Vegetables", value: 10 },
    { word: "Chicken", category: "Meat", value: 5 },
    { word: "Beef", category: "Meat", value: 7 },
    { word: "Salmon", category: "Fish", value: 8 },
    { word: "Tuna", category: "Fish", value: 6 },
    { word: "Rice", category: "Grain", value: 25 },
    { word: "Wheat", category: "Grain", value: 18 },
  ];

  const wordsToRemove = ["Apple"];
  const categoriesToRemove = [];
  return (
    <main>
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <div className="h-full w-full">
          <WordCloudDraggable
            data={filterWordCloudData(data, wordsToRemove, categoriesToRemove)}
            wordScaleOffset={15}
          />
        </div>
      </div>
    </main>
  );
}