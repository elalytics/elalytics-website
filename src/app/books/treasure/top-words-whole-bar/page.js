"use client";

import TopWordsBarChart from "./component/TopWordsBarChart";
import dataTemp from "./data/top_words.json";

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
    <div className="h-full m-auto max-w-4xl">
      <TopWordsBarChart
        data={filterData(data, wordsToRemove, categoriesToRemove)}
      />
    </div>
  );
}
