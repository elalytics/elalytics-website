"use client";

import TopCharacterWordsBoy from "./components/TopCharacterWords";
import data from "./data/top_char_words.json";

export default function Home() {
  const wordsToRemove = [];
  const categoriesToRemove = [];
  return (
    <main>
      <div className="h-screen overflow-x-hidden bg-gray-100">
        <div className="my-8 text-center">
          <span className="px-4 py-1 bg-stone-dark rounded text-white inline-block mb-1 text-sm font-bold">
            Boy
          </span>
          <h1 className="text-3xl font-bold ">
            Top 15 Words Associated With Main Characters
          </h1>
        </div>
        <div className="h-full w-screen">
          <TopCharacterWordsBoy data={data} />
        </div>
      </div>
    </main>
  );
}
