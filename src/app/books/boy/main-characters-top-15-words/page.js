"use client";

import TopCharacterWordsBoy from "./components/TopCharacterWords";
import data from "./data/top_char_words.json";

export default function Home() {
  const wordsToRemove = [];
  const categoriesToRemove = [];
  return (
    <main>
      <div className="overflow-x-hidden bg-gray-100">
        <div className="h-full w-screen">
          <TopCharacterWordsBoy data={data} />
        </div>
      </div>
    </main>
  );
}
