"use client";

import EmotionsChart from "./component/EmotionsBar";
import data from "./data/emotions_by_character.json";
import VisualizationDescription from "@/app/utils/components/VisualizationDescription";
import SuggestedRoutines from "@/app/utils/components/SuggestedRoutines";
import Link from "next/link";

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
    <main>
      <div className="h-screen overflow-x-hidden bg-gray-100">
        <div className="my-8 text-center max-w-3xl m-auto">
          <span className="px-4 py-1 bg-stone-dark rounded text-white inline-block mb-1 text-sm font-bold">
            Boy
          </span>
          <h1 className="text-3xl font-bold ">Emotions</h1>
        </div>
        <VisualizationDescription>
          <p>
            These visualizations use an emotions classifier. The{" "}
            <strong>emotions classifier</strong> is a machine learning model
            that assigns emotion scores to a text input. In this case, each word
            associated with the character gets an emotion score from the
            classifier and the specific emotion with the highest score is
            associated with that word. This visualization represents the
            corresponding word-emotion distribution for the selected characters.
            The scores are provided for the following emotions: anger, disgust,
            fear, joy, neutral, sadness, surprise. You can experiment with the
            emotions classifier here:{" "}
            <a
              href="https://huggingface.co/j-hartmann/emotion-english-distilroberta-base"
              target="_blank"
              className="text-cardinal-red hover:text-cardinal-red-dark underline"
            >
              https://huggingface.co/j-hartmann/emotion-english-distilroberta-base
            </a>
            <br />
            This visualization doesn&apos;t contain stop words. Stop words are
            commonly used words such as &quot;the,&quot; &quot;is,&quot; and
            &quot;at&quot;. These words are often filtered out in text
            processing and search queries to focus on more descriptive words.
          </p>
        </VisualizationDescription>
        <SuggestedRoutines>
          <ul className="list-disc list-inside">
            <li>
              <Link
                href={
                  "https://docs.google.com/document/d/1VIlSlSZYwBjfMu3k8TB1AXRMInQPv4LvjV9mHqoeKi8"
                }
                target="_blank"
                className="text-cardinal-red hover:text-cardinal-red-dark underline"
              >
                Big, Medium, Small
              </Link>
            </li>
          </ul>
        </SuggestedRoutines>
        <div className="max-w-5xl m-auto mb-12">
          <div>
            <h2 className="text-center text-xl">Most Common Emotions</h2>
            <EmotionsChart
              data={convertCharactersDataBasedOnEmotionsStack(data)}
              stacked={true}
              axis="y"
            />
          </div>
          <div className="my-12">
            <h2 className="text-center text-xl">
              Emotion Distribution Within Characters
            </h2>
            <EmotionsChart
              data={convertEmotionsDataBasedOnCharacters(data)}
              axis="x"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
