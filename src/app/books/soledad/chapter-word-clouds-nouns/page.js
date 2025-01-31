import WordCloudDraggableAndBilingual from "@/app/utils/charts/WordCloudDraggableAndBilingual";
import { filterWordCloudData } from "@/app/utils/functions/general-functions";
import VisualizationContainerFrame from "@/app/utils/components/VisualizationContainerFrame";
import chapter1 from "./data/chapters/soledad_topwords_chapter_1.json";
import chapter2 from "./data/chapters/soledad_topwords_chapter_2.json";
import SuggestedRoutines from "@/app/utils/components/SuggestedRoutines";
const data = [
  { chapter: "1", chapterName: "English", wordCloudData: chapter1 },
  {
    chapter: "2",
    chapterName: "Spanish",
    wordCloudData: chapter2,
  },
];

export const metadata = {
  title: "Bilingual Wordclouds | Soledad | Elalytics",
};

export default function App() {
  const wordsToRemove = ["one", "two", "I", "\u2019", "\u2019s"];
  const categoriesToRemove = ["PUNCT", "DET", "AUX", "PART", "NUM", "PROPN"];
  return (
    <div className="w-screen px-20">
      {data.map((chapter, i) => {
        return (
          <div key={i} className="px-20 mt-20 mb-10">
            <h2 className="text-2xl text-center font-bold mb-4">
              {chapter.chapterName}
            </h2>
            <WordCloudDraggableAndBilingual
              data={filterWordCloudData(
                chapter.wordCloudData,
                wordsToRemove,
                categoriesToRemove
              )}
              wordSizeMultiplier={1}
              scaleType="linear"
            />
          </div>
        );
      })}
    </div>
  );
}
