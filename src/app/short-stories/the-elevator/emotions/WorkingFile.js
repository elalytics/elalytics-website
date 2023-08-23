"use client";

import data from "./data/emotions.json";
import HeatMapPage from "./components/HeatMap";

export default function App() {
  return (
    <main>
      <div className=" overflow-x-hidden bg-gray-100">
        <div className="my-8 text-center">
          <span className="px-4 py-1 bg-stone-600 rounded text-white inline-block mb-1 text-sm font-bold">
            The Elevator
          </span>
          <h1 className="text-3xl font-bold ">Emotions Chart</h1>
        </div>
        <div className="h-full max-w-5xl m-auto">
          <HeatMapPage data={data} />
        </div>
      </div>
    </main>
  );
}
