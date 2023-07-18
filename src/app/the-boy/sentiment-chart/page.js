"use client";

import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import characterWordsData from "./data/characterdata.json";
import wordSentimentList from "./data/wordssentiment.json";
import CharacterSentimentChart from "./components/CharacterSentimentChart";

//filter words by sentiment
function filterWords(wordSentimentList, sentiment) {
  return wordSentimentList
    .filter((word) => word.sentiment === sentiment)
    .map((item) => item.word);
}

function findCharacterSentiments(charData, positive, negative) {
  return charData
    .filter((c) => c.words.length > 0) // skip characters that doesn't have any words
    .map((c) => {
      let positiveWords = [];
      let negativeWords = [];
      let unknownWords = [];

      c.words.forEach((word) => {
        if (positive.includes(word)) positiveWords.push(word);
        else if (negative.includes(word)) negativeWords.push(word);
        else unknownWords.push(word);
      });

      return {
        character: c.character,
        positive: positiveWords,
        negative: negativeWords,
        unknown: unknownWords,
      };
    });
}

export default function Home() {
  const [characterData, setCharacterData] = useState([]);
  const [positiveWords, setPositiveWords] = useState([]);
  const [negativeWords, setNegativeWords] = useState([]);

  const handlePositiveWordClick = (word) => {
    setPositiveWords(
      positiveWords.filter((positiveWord) => positiveWord !== word)
    );
    setNegativeWords([...negativeWords, word]);
  };

  const handleNegativeWordClick = (word) => {
    setNegativeWords(
      negativeWords.filter((negativeWord) => negativeWord !== word)
    );
    setPositiveWords([...positiveWords, word]);
  };

  function findCharactersByWord(array, word) {
    let result = [];
    array.forEach((character) => {
      if (
        character.positive.includes(word) ||
        character.negative.includes(word) ||
        character.unknown.includes(word)
      ) {
        result.push(character.character);
      }
    });
    return result;
  }

  useEffect(() => {
    setPositiveWords(filterWords(wordSentimentList, "positive"));
    setNegativeWords(filterWords(wordSentimentList, "negative"));
  }, []);
  useEffect(() => {
    setCharacterData(
      findCharacterSentiments(characterWordsData, positiveWords, negativeWords)
    );
  }, [positiveWords, negativeWords]);
  useEffect(() => {
    let data = {
      labels: characterData.map((characterData) => characterData.character),
      datasets: [
        {
          label: "Positive",
          data: characterData.map(
            (characterData) => characterData.positive.length
          ),
          backgroundColor: "rgb(74 222 128 / 0.4)",
          borderColor: "rgb(74 222 128)",
          borderWidth: 1,
        },
        {
          label: "Negative",
          data: characterData.map(
            (characterData) => characterData.negative.length
          ),
          backgroundColor: "rgb(248 113 113 / 0.4)",
          borderColor: "rgb(248 113 113)",
          borderWidth: 1,
        },
      ],
    };
  }, [characterData]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10">
        <div className={`flex justify-between gap-4 rounded w-full p-2 m-2`}>
          <div className="flex-1 p-2 flex flex-wrap gap-2 content-start rounded border-2 border-slate-400">
            {positiveWords.map((word, index) => (
              <span className="text-sm rounded my-1.5" key={index}>
                <span
                  className="bg-green-400/40 p-2 rounded-l"
                  data-tooltip-id="characters-info"
                  data-tooltip-content={findCharactersByWord(
                    characterData,
                    word
                  )}
                >
                  {word}
                </span>
                <span
                  className="p-2 cursor-pointer bg-green-400/60 rounded-r"
                  onClick={() => handlePositiveWordClick(word)}
                  data-tooltip-id="move-btn-info"
                  data-tooltip-content="Move to Negative words"
                >
                  <FontAwesomeIcon icon={faArrowRight} className="opacity-50" />
                </span>
              </span>
            ))}
          </div>
          <div className="flex-1 p-2 flex flex-wrap gap-2 content-start rounded border-2 border-slate-400">
            {negativeWords.map((word, index) => (
              <span className="text-sm rounded my-1.5" key={index}>
                <span
                  className="p-2 cursor-pointer bg-red-400/60 rounded-l"
                  onClick={() => handleNegativeWordClick(word)}
                  data-tooltip-id="move-btn-info"
                  data-tooltip-content="Move to Positive words"
                >
                  <FontAwesomeIcon icon={faArrowLeft} className="opacity-50" />
                </span>
                <span
                  className="bg-red-400/40 p-2 rounded-r"
                  data-tooltip-id="characters-info"
                  data-tooltip-content={findCharactersByWord(
                    characterData,
                    word
                  )}
                >
                  {word}
                </span>
              </span>
            ))}
          </div>
          <Tooltip
            id="move-btn-info"
            variant="light"
            opacity={0.9}
            style={{ fontSize: "0.8em" }}
          />
          <Tooltip
            id="characters-info"
            variant="light"
            opacity={0.9}
            style={{ fontSize: "0.8em" }}
          />
        </div>
      </div>
      <CharacterSentimentChart data={characterData} />
    </main>
  );
}
