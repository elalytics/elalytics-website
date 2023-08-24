"use client";

import data from "./data/elevator_conflict.json";
import LineChart from "./components/LineChart";
import { conflictDefinition } from "@/app/general/definitions";

function convertFormat(data) {
  let result = [];
  for (let key in data) {
    result.push({ key: `${key}`, value: data[key] });
  }
  return result;
}

export const metadataDetails = {
  title: "Conflict Chart",
};

export default function App() {
  return (
    <main>
      <div className="h-screen overflow-x-hidden bg-gray-100">
        <div className="my-8 text-center">
          <span className="px-4 py-1 bg-stone-600 rounded text-white inline-block mb-1 text-sm font-bold">
            The Elevator
          </span>
          <h1 className="text-3xl font-bold ">Conflict Chart</h1>
          <p className="max-w-5xl m-auto px-10">{conflictDefinition}</p>
        </div>
        <div className="h-full max-w-5xl m-auto">
          <LineChart
            data={convertFormat(data)}
            yLabel="Conflict"
            xLabel="Paragraphs"
          />
        </div>
      </div>
    </main>
  );
}
