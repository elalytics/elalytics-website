"use client";

import { useEffect, useState } from "react";
import chroma from "chroma-js";
import WordCloudComponent from "./components/WordCloudDraggable";

export default function Home() {
  const data = [
    { name: "Apple", category: "Fruits", value: 20 },
    { name: "Banana", category: "Fruits", value: 30 },
    { name: "Carrot", category: "Vegetables", value: 15 },
    { name: "Broccoli", category: "Vegetables", value: 10 },
    { name: "Chicken", category: "Meat", value: 5 },
    { name: "Beef", category: "Meat", value: 7 },
    { name: "Salmon", category: "Fish", value: 8 },
    { name: "Tuna", category: "Fish", value: 6 },
    { name: "Rice", category: "Grain", value: 25 },
    { name: "Wheat", category: "Grain", value: 18 },
  ];
  return (
    <main>
      <div className="h-screen flex overflow-hidden bg-gray-100">
        <div className="h-full w-full">
          <WordCloudComponent data={data} />
        </div>
      </div>
    </main>
  );
}
