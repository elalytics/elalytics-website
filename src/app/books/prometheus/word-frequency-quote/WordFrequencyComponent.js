"use client";
import wordFrequencyData from "@/app/data-processing/src/book_projects/prometheus/data/quoted_word_counter.json";
import { Tooltip } from "react-tooltip";
import textData from "@/app/data-processing/src/book_projects/prometheus/data/prometheus.json";
import { useEffect, useState } from "react";

const wrapQuotesWithComponent = (textData) => {
  // Use a regular expression to match quoted sentences

  const finalText = textData.map((paragraphItem, index) => {
    const text = paragraphItem.text;
    const quotedSentences = text.match(/“[^”]+”/g);

    // Split the text into an array of words and quoted phrases
    const splitText = text.split(/(“[^”]+”)/g);

    // Map through the array and replace the quoted phrases with the QuoteComponent
    const wrappedText = splitText.map((item, index) => {
      if (quotedSentences && quotedSentences.includes(item)) {
        // Split the item into words
        const words = item.split(" ");

        // Map each word to a WordComponent
        const wordComponents = words.map((word, wordIndex) => (
          <WordComponent
            key={`${index}-${wordIndex}`}
            word={word}
            character={paragraphItem.character}
          />
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

    return (
      <p className="my-6" key={`para-${index}`}>
        {wrappedText}
      </p>
    );
  });

  // Return the array of words and QuoteComponents
  return finalText;
};

const WordFrequencyComponent = () => {
  const [text, setText] = useState("Hello, World!");
  useEffect(() => {
    let wrappedText = wrapQuotesWithComponent(textData);
    setText(wrappedText);
  }, []);
  return (
    <div>
      <div className="whitespace-pre-wrap text-gray-500">{text}</div>
      <Tooltip id="quoted-word" variant="dark" opacity={0.9} />
    </div>
  );
};

export default WordFrequencyComponent;

const QuoteComponent = ({ children }) => {
  return <span className="text-gray-400">{children}</span>;
};

const WordComponent = ({ word, character }) => {
  const cleanedWord = word.replace(/[.,“”]/g, "");
  let lowerCaseWord = cleanedWord.toLowerCase();
  const wordData = wordFrequencyData.find(
    (item) => item.word === lowerCaseWord
  );

  if (wordData === undefined) {
    return <span className="text-gray-500 font-thin text-3xl">{word}</span>;
  }

  let frequency = wordData["count"][character];
  // Calculate font size and text shadow based on frequency using logarithmic scale
  let outlineThickness = frequency * 0.5;
  let textColor = "text-gray-500";

  if (character === "Prometheus") {
    textColor = "red";
  } else if (character === "Zeus") {
    textColor = "blue";
  }

  return (
    <span
      className={`text-3xl`}
      style={{
        color: textColor,
        WebkitTextStroke: `${outlineThickness}px ${textColor}`,
        fontWeight: "100",
      }}
      data-tooltip-id={frequency > 0 && `quoted-word`}
      data-tooltip-content={`Frequency: ${frequency}`}
    >
      {word}
    </span>
  );
};
