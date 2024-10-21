import WordCloudDraggableAndBilingual from "@/app/utils/charts/WordCloudDraggableAndBilingual";
import { filterWordCloudData } from "@/app/utils/functions/general-functions";
import VisualizationContainerFrame from "@/app/utils/components/VisualizationContainerFrame";
import chapter1 from "./data/chapters/midsummer_topwords_chapter_1.json";
import chapter2 from "./data/chapters/midsummer_topwords_chapter_2.json";
import chapter3 from "./data/chapters/midsummer_topwords_chapter_3.json";
import chapter4 from "./data/chapters/midsummer_topwords_chapter_4.json";
import chapter5 from "./data/chapters/midsummer_topwords_chapter_5.json";
import chapter6 from "./data/chapters/midsummer_topwords_chapter_6.json";
import chapter7 from "./data/chapters/midsummer_topwords_chapter_7.json";
import chapter8 from "./data/chapters/midsummer_topwords_chapter_8.json";
import chapter9 from "./data/chapters/midsummer_topwords_chapter_9.json";
import SuggestedRoutines from "@/app/utils/components/SuggestedRoutines";
const data = [
  { chapter: "1", chapterName: "Act 1. Scene 1", wordCloudData: chapter1 },
  {
    chapter: "2",
    chapterName: "Act 1. Scene 2",
    wordCloudData: chapter2,
  },
  {
    chapter: "3",
    chapterName: "Act 2. Scene 1",
    wordCloudData: chapter3,
  },
  {
    chapter: "4",
    chapterName: "Act 2. Scene 2",
    wordCloudData: chapter4,
  },
  {
    chapter: "5",
    chapterName: "Act 3. Scene 1",
    wordCloudData: chapter5,
  },
  {
    chapter: "6",
    chapterName: "Act 3. Scene 2",
    wordCloudData: chapter6,
  },
  {
    chapter: "7",
    chapterName: "Act 4. Scene 1",
    wordCloudData: chapter7,
  },
  {
    chapter: "8",
    chapterName: "Act 4. Scene 2",
    wordCloudData: chapter8,
  },
  {
    chapter: "9",
    chapterName: "Act 5. Scene 1",
    wordCloudData: chapter9,
  },
];

export const metadata = {
  title: "Chapter Wordclouds | A Midsummer Night's Dream | Elalytics",
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
              Chapter {chapter.chapter}: {chapter.chapterName}
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
