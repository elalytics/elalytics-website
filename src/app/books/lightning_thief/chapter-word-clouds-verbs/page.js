import WordCloudDraggableAndBilingual from "@/app/utils/charts/WordCloudDraggableAndBilingual";
import { filterWordCloudData } from "@/app/utils/functions/general-functions";
import VisualizationContainerFrame from "@/app/utils/components/VisualizationContainerFrame";
import chapter1 from "./data/chapters/lightning_thief_topwords_chapter_1.json";
import chapter2 from "./data/chapters/lightning_thief_topwords_chapter_2.json";
import chapter3 from "./data/chapters/lightning_thief_topwords_chapter_3.json";
import chapter4 from "./data/chapters/lightning_thief_topwords_chapter_4.json";
import chapter5 from "./data/chapters/lightning_thief_topwords_chapter_5.json";
import chapter6 from "./data/chapters/lightning_thief_topwords_chapter_6.json";
import chapter7 from "./data/chapters/lightning_thief_topwords_chapter_7.json";
import chapter8 from "./data/chapters/lightning_thief_topwords_chapter_8.json";
import chapter9 from "./data/chapters/lightning_thief_topwords_chapter_9.json";
import chapter10 from "./data/chapters/lightning_thief_topwords_chapter_10.json";
import chapter11 from "./data/chapters/lightning_thief_topwords_chapter_11.json";
import chapter12 from "./data/chapters/lightning_thief_topwords_chapter_12.json";
import chapter13 from "./data/chapters/lightning_thief_topwords_chapter_13.json";
import chapter14 from "./data/chapters/lightning_thief_topwords_chapter_14.json";
import chapter15 from "./data/chapters/lightning_thief_topwords_chapter_15.json";
import chapter16 from "./data/chapters/lightning_thief_topwords_chapter_16.json";
import chapter17 from "./data/chapters/lightning_thief_topwords_chapter_17.json";
import chapter18 from "./data/chapters/lightning_thief_topwords_chapter_18.json";
import chapter19 from "./data/chapters/lightning_thief_topwords_chapter_19.json";
import chapter20 from "./data/chapters/lightning_thief_topwords_chapter_20.json";
import chapter21 from "./data/chapters/lightning_thief_topwords_chapter_21.json";
import chapter22 from "./data/chapters/lightning_thief_topwords_chapter_22.json";
import SuggestedRoutines from "@/app/utils/components/SuggestedRoutines";
const data = [
  { chapter: "1", chapterName: "I Accidentally Vaporize My Pre-Algebra Teacher", wordCloudData: chapter1 },
  {
    chapter: "2",
    chapterName: "Three Old Ladies Knit The Socks Of Death",
    wordCloudData: chapter2,
  },
  {
    chapter: "3",
    chapterName: "Grover Unexpectedly Loses His Pants",
    wordCloudData: chapter3,
  },
  {
    chapter: "4",
    chapterName: "My Mother Teaches Me Bullfighting",
    wordCloudData: chapter4,
  },
  {
    chapter: "5",
    chapterName: "I Play Pinochle With A Horse",
    wordCloudData: chapter5,
  },
  {
    chapter: "6",
    chapterName: "I Become Supreme Lord Of The Bathroom",
    wordCloudData: chapter6,
  },
  {
    chapter: "7",
    chapterName: "My Dinner Goes Up In Smoke",
    wordCloudData: chapter7,
  },
  {
    chapter: "8",
    chapterName: "We Capture A Flag",
    wordCloudData: chapter8,
  },
  {
    chapter: "9",
    chapterName: "I Am Offered A Quest",
    wordCloudData: chapter9,
  },
  {
    chapter: "10",
    chapterName: "I Ruin A Perfectly Good Bus",
    wordCloudData: chapter10,
  },
  {
    chapter: "11",
    chapterName: "We Visit The Garden Gnome Emporium",
    wordCloudData: chapter11,
  },
  {
    chapter: "12",
    chapterName: "We Get Advice From A Poodle",
    wordCloudData: chapter12,
  },
  {
    chapter: "13",
    chapterName: "I Plunge To My Death",
    wordCloudData: chapter13,
  },
  {
    chapter: "14",
    chapterName: "I Become A Known Fugitive",
    wordCloudData: chapter14,
  },
  {
    chapter: "15",
    chapterName: "A God Buys Us Cheeseburgers",
    wordCloudData: chapter15,
  },
  {
    chapter: "16",
    chapterName: "We Take A Zebra To Vegas",
    wordCloudData: chapter16,
  },
  {
    chapter: "17",
    chapterName: "We Shop For Water Beds",
    wordCloudData: chapter17,
  },
  {
    chapter: "18",
    chapterName: "Annabeth Does Obedience School",
    wordCloudData: chapter18,
  },
  {
    chapter: "19",
    chapterName: "We Find Out The Truth, Sort Of",
    wordCloudData: chapter19,
  },
  {
    chapter: "20",
    chapterName: "I Battle My Jerk Relative",
    wordCloudData: chapter20,
  },
  {
    chapter: "21",
    chapterName: "I Settle My Tab",
    wordCloudData: chapter21,
  },
  {
    chapter: "22",
    chapterName: "The Prophecy Comes True",
    wordCloudData: chapter22,
  },
];

export const metadata = {
  title: "Chapter Wordclouds | Lightning Thief | Elalytics",
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
