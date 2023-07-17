"use client";

import { useEffect, useState } from "react";
import BarChart from "./components/CharacterSentimentChart";

const rawData = [
  { character: "Mother", words: ["able", "hello", "how"] },
  { character: "Head Master", words: ["able", "sure", "old", "hero"] },
];

const wordList = [
  { word: "able", positive: true },
  { word: "hello", positive: true },
  { word: "how", positive: false },
  { word: "sure", positive: false },
  { word: "old", positive: true },
  { word: "hero", positive: false },
];

function countCharacterPositiveAndNegativeWords(rawData, wordList) {
  return rawData.map((characterData) => {
    let positiveWordsCount = 0;
    let negativeWordsCount = 0;

    characterData.words.forEach((word) => {
      let wordData = wordList.find((wordItem) => wordItem.word === word);
      if (wordData.positive === true) {
        positiveWordsCount++;
      } else {
        negativeWordsCount++;
      }
    });

    return {
      character: characterData.character,
      positive: positiveWordsCount,
      negative: negativeWordsCount,
    };
  });
}

export default function Home() {
  const [characterData, setCharacterData] = useState([]);
  const [chartData, setChartData] = useState();

  useEffect(() => {
    setCharacterData(countCharacterPositiveAndNegativeWords(rawData, wordList));
  }, []);
  useEffect(() => {
    console.log(characterData);
    let data = {
      labels: characterData.map((characterData) => characterData.character),
      datasets: [
        {
          label: "Positive",
          data: characterData.map((characterData) => characterData.positive),
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          borderWidth: 1,
        },
        {
          label: "Negative",
          data: characterData.map((characterData) => characterData.negative),
          backgroundColor: "rgba(123, 99, 132, 0.2)",
          borderColor: "rgb(123, 99, 132)",
          borderWidth: 1,
        },
      ],
    };
    setChartData(data);
  }, [characterData]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10">
        <BarChart data={chartData} />
      </div>
    </main>
  );
}
