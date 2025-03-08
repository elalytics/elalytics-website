"use client";

import EmotionsChart from "./component/EmotionsBar";
import data from "./data/emotions_by_character.json";
import VisualizationContainerFrame from "@/app/utils/components/VisualizationContainerFrame";

function convertEmotionsDataBasedOnCharacters(input) {
  const labels = Object.keys(input); // Extract the characters

  // Automatically extract emotion categories from one of the characters (e.g., "Mother")
  const emotions = Object.keys(input[labels[0]]);

  const datasets = emotions.map((emotion) => {
    return {
      label: capitalizeFirstLetter(emotion),
      data: labels.map((character) => input[character][emotion]),
    };
  });

  return {
    labels,
    datasets,
  };
}

function convertCharactersDataBasedOnEmotionsStack(input) {
  // Extract characters and emotions from the data in format A
  const characters = Object.keys(input);
  const emotions = Object.keys(input[characters[0]]);

  // Map each character to their emotion data
  const datasets = characters.map((character) => {
    return {
      label: character,
      data: emotions.map((emotion) => input[character][emotion]),
      stack: "Stack 0",
    };
  });

  // Format labels with capitalized emotion names
  const labels = emotions.map(capitalizeFirstLetter);

  return {
    labels,
    datasets,
  };
}

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Home() {
  return (
    <div className="max-w-5xl m-auto mb-12">
      <div>
        <h2 className="text-center text-xl">Most Common Emotions</h2>
        <EmotionsChart
          data={convertCharactersDataBasedOnEmotionsStack(data)}
          stacked={true}
          axis="y"
          xAxisTitle="Number of Words"
          yAxisTitle="Emotions"
        />
      </div>
      <div className="my-12">
        <h2 className="text-center text-xl">
          Emotion Distribution Within Characters
        </h2>
        <EmotionsChart
          data={convertEmotionsDataBasedOnCharacters(data)}
          axis="x"
          xAxisTitle="Characters"
          yAxisTitle="Number of Words"
        />
      </div>
    </div>
  );
}
