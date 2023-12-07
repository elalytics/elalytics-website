"use client";
import wordFrequencyData from "@/app/data-processing/src/book_projects/fish_cheeks/data/word_frequencies.json";
import fishCheeksText from "./text";
import { Tooltip } from "react-tooltip";

const wrapQuotesWithComponent = (text) => {
  // Use a regular expression to match quoted sentences
  const quotedSentences = text.match(/“[^”]+”/g);

  // Split the text into an array of words and quoted phrases
  const splitText = text.split(/(“[^”]+”)/g);

  // Map through the array and replace the quoted phrases with the QuoteComponent
  const wrappedText = splitText.map((item, index) => {
    if (quotedSentences.includes(item)) {
      // Split the item into words
      const words = item.split(" ");

      // Map each word to a WordComponent
      const wordComponents = words.map((word, wordIndex) => (
        <WordComponent key={`${index}-${wordIndex}`} word={word} />
      ));

      // Join the WordComponents with spaces in between
      const itemWithWordComponents = wordComponents.reduce(
        (prev, curr, i) => (i === 0 ? [curr] : [...prev, " ", curr]),
        []
      );

      return (
        <QuoteComponent key={index}>{itemWithWordComponents}</QuoteComponent>
      );
    } else {
      return item;
    }
  });

  // Return the array of words and QuoteComponents
  return wrappedText;
};

const WordFrequencyComponent = () => {
  const wrappedText = wrapQuotesWithComponent(fishCheeksText);
  return (
    <div>
      <p className="whitespace-pre-wrap text-gray-500 font-light">
        {wrappedText}
      </p>
      <Tooltip id="quoted-word" variant="dark" opacity={0.9} />
    </div>
  );
};

export default WordFrequencyComponent;

const QuoteComponent = ({ children }) => {
  return <span className="text-gray-400">{children}</span>;
};

const WordComponent = ({ word }) => {
  const cleanedWord = word.replace(/[.,“”]/g, "");
  let lowerCaseWord = cleanedWord.toLowerCase();
  const wordData = wordFrequencyData.find(
    (item) => item.word === lowerCaseWord
  );
  const frequency = wordData ? wordData.frequency : 0;

  let textColor = "text-gray-500";
  let fontWeight = "font-light";
  if (frequency === 0) {
    textColor = "inherit";
  }
  if (frequency === 1) {
    textColor = "text-digital-red-light";
    fontWeight = "font-light";
  }
  if (frequency === 2) {
    textColor = "text-digital-red";
    fontWeight = "font-medium";
  }
  if (frequency >= 3) {
    textColor = "text-digital-red-dark";
    fontWeight = "font-black";
  }

  return (
    <span
      className={`${textColor} ${fontWeight} text-3xl`}
      data-tooltip-id={frequency > 0 && `quoted-word`}
      data-tooltip-content={`Frequency: ${frequency}`}
    >
      {word}
    </span>
  );
};
