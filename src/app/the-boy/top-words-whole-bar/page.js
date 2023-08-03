"use client";

import TopWordsBarChart from "./component/TopWordsBarChart";
import dataTemp from "./data/topwordsPOS.json";

function getTop15Words(words) {
  // Group words by category.
  let categories = {};
  for (let i = 0; i < words.length; i++) {
    if (!categories[words[i].category]) {
      categories[words[i].category] = [];
    }
    categories[words[i].category].push(words[i]);
  }

  // Sort words in each category and trim to top 15.
  for (let category in categories) {
    categories[category].sort((a, b) => b.value - a.value);
    if (categories[category].length > 15) {
      categories[category] = categories[category].slice(0, 15);
    }
  }

  // Return result.
  let result = [];
  for (let category in categories) {
    result = result.concat(categories[category]);
  }
  return result;
}

function filterData(data, wordsToRemove, categoriesToRemove) {
  return data.filter(
    (item) =>
      !wordsToRemove.includes(item.word) &&
      !categoriesToRemove.includes(item.category)
  );
}

const data = getTop15Words(dataTemp);

export default function Home() {
  const wordsToRemove = [];
  const categoriesToRemove = ["PUNCT", "DET", "PART", "AUX", "NUM"];
  return (
    <main>
      <div className="h-screen overflow-x-hidden bg-gray-100">
        <div className="my-8 text-center">
          <span className="px-4 py-1 bg-stone-600 rounded text-white inline-block mb-1 text-sm font-bold">
            Boy
          </span>
          <h1 className="text-3xl font-bold ">
            Top Words in the book - Bar Chart
          </h1>
        </div>
        <div className="h-full w-screen">
          <TopWordsBarChart
            data={filterData(data, wordsToRemove, categoriesToRemove)}
          />
        </div>
      </div>
    </main>
  );
}
