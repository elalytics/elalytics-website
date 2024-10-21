import WordCloudDraggableAndBilingual from "@/app/utils/charts/WordCloudDraggableAndBilingual";
import { filterWordCloudData } from "@/app/utils/functions/general-functions";
import VisualizationContainerFrame from "@/app/utils/components/VisualizationContainerFrame";
import chapter1 from "./data/chapters/red_scarf_topwords_chapter_1.json";
import chapter2 from "./data/chapters/red_scarf_topwords_chapter_2.json";
import chapter3 from "./data/chapters/red_scarf_topwords_chapter_3.json";
import chapter4 from "./data/chapters/red_scarf_topwords_chapter_4.json";
import chapter5 from "./data/chapters/red_scarf_topwords_chapter_5.json";
import chapter6 from "./data/chapters/red_scarf_topwords_chapter_6.json";
import chapter7 from "./data/chapters/red_scarf_topwords_chapter_7.json";
import chapter8 from "./data/chapters/red_scarf_topwords_chapter_8.json";
import chapter9 from "./data/chapters/red_scarf_topwords_chapter_9.json";
import chapter10 from "./data/chapters/red_scarf_topwords_chapter_10.json";
import chapter11 from "./data/chapters/red_scarf_topwords_chapter_11.json";
import chapter12 from "./data/chapters/red_scarf_topwords_chapter_12.json";
import chapter13 from "./data/chapters/red_scarf_topwords_chapter_13.json";
import chapter14 from "./data/chapters/red_scarf_topwords_chapter_14.json";
import chapter15 from "./data/chapters/red_scarf_topwords_chapter_15.json";
import chapter16 from "./data/chapters/red_scarf_topwords_chapter_16.json";
import chapter17 from "./data/chapters/red_scarf_topwords_chapter_17.json";
import chapter18 from "./data/chapters/red_scarf_topwords_chapter_18.json";
import chapter19 from "./data/chapters/red_scarf_topwords_chapter_19.json";
import SuggestedRoutines from "@/app/utils/components/SuggestedRoutines";
const data = [
  { chapter: "1", chapterName: "Prologue", wordCloudData: chapter1 },
  {
    chapter: "2",
    chapterName: "The Liberation Army Dancer",
    wordCloudData: chapter2,
  },
  {
    chapter: "3",
    chapterName: "Destroy The Four Olds!",
    wordCloudData: chapter3,
  },
  {
    chapter: "4",
    chapterName: "Writing Da-Zi-Bao",
    wordCloudData: chapter4,
  },
  {
    chapter: "5",
    chapterName: "Graduation",
    wordCloudData: chapter5,
  },
  {
    chapter: "6",
    chapterName: "The Red Successors",
    wordCloudData: chapter6,
  },
  {
    chapter: "7",
    chapterName: "The Sound Of Drums And Gongs",
    wordCloudData: chapter7,
  },
  {
    chapter: "8",
    chapterName: "The Propaganda Wall",
    wordCloudData: chapter8,
  },
  {
    chapter: "9",
    chapterName: "A Search In Passing",
    wordCloudData: chapter9,
  },
  {
    chapter: "10",
    chapterName: "Fate",
    wordCloudData: chapter10,
  },
  {
    chapter: "11",
    chapterName: "Junior High School At Last",
    wordCloudData: chapter11,
  },
  {
    chapter: "12",
    chapterName: "Locked Up",
    wordCloudData: chapter12,
  },
  {
    chapter: "13",
    chapterName: "An Educable Child",
    wordCloudData: chapter13,
  },
  {
    chapter: "14",
    chapterName: "Half-City Jiangs",
    wordCloudData: chapter14,
  },
  {
    chapter: "15",
    chapterName: "The Class Education Exhibition",
    wordCloudData: chapter15,
  },
  {
    chapter: "16",
    chapterName: "The Rice Harvest",
    wordCloudData: chapter16,
  },
  {
    chapter: "17",
    chapterName: "The Incriminating Letter",
    wordCloudData: chapter17,
  },
  {
    chapter: "18",
    chapterName: "Sweeping",
    wordCloudData: chapter18,
  },
  {
    chapter: "19",
    chapterName: "Epilogue",
    wordCloudData: chapter19,
  },
];

export const metadata = {
  title: "Chapter Wordclouds | Red Scarf | Elalytics",
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
