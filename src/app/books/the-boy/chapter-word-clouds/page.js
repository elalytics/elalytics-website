import WordCloudDraggableAndBilingual from "@/app/utils/charts/WordCloudDraggableAndBilingual";
import { filterWordCloudData } from "@/app/utils/functions/general-functions";
import VisualizationDescription from "@/app/utils/components/VisualizationDescription";
import Link from "next/link";
import chapter1 from "./data/chapters/boy_topwords_chapter_1.json";
import chapter2 from "./data/chapters/boy_topwords_chapter_2.json";
import chapter3 from "./data/chapters/boy_topwords_chapter_3.json";
import chapter4 from "./data/chapters/boy_topwords_chapter_4.json";
import chapter5 from "./data/chapters/boy_topwords_chapter_5.json";
import chapter6 from "./data/chapters/boy_topwords_chapter_6.json";
import chapter7 from "./data/chapters/boy_topwords_chapter_7.json";
import chapter8 from "./data/chapters/boy_topwords_chapter_8.json";
import chapter9 from "./data/chapters/boy_topwords_chapter_9.json";
import chapter10 from "./data/chapters/boy_topwords_chapter_10.json";
import chapter11 from "./data/chapters/boy_topwords_chapter_11.json";
import chapter12 from "./data/chapters/boy_topwords_chapter_12.json";
import chapter13 from "./data/chapters/boy_topwords_chapter_13.json";
import chapter14 from "./data/chapters/boy_topwords_chapter_14.json";
import chapter15 from "./data/chapters/boy_topwords_chapter_15.json";
import chapter16 from "./data/chapters/boy_topwords_chapter_16.json";
import chapter17 from "./data/chapters/boy_topwords_chapter_17.json";
import chapter18 from "./data/chapters/boy_topwords_chapter_18.json";
import chapter19 from "./data/chapters/boy_topwords_chapter_19.json";
import chapter20 from "./data/chapters/boy_topwords_chapter_20.json";
import chapter21 from "./data/chapters/boy_topwords_chapter_21.json";
import chapter22 from "./data/chapters/boy_topwords_chapter_22.json";
import chapter23 from "./data/chapters/boy_topwords_chapter_23.json";
import chapter24 from "./data/chapters/boy_topwords_chapter_24.json";
import chapter25 from "./data/chapters/boy_topwords_chapter_25.json";
import SuggestedRoutines from "@/app/utils/components/SuggestedRoutines";
const data = [
  { chapter: "1", chapterName: "Papa and Mama", wordCloudData: chapter1 },
  {
    chapter: "2",
    chapterName: "Kindergarten, 1922-3 (age 6-7)",
    wordCloudData: chapter2,
  },
  {
    chapter: "3",
    chapterName: "The bicycle and the sweet-shop",
    wordCloudData: chapter3,
  },
  {
    chapter: "4",
    chapterName: "The Great Mouse Plot",
    wordCloudData: chapter4,
  },
  {
    chapter: "5",
    chapterName: "Mr Coombes",
    wordCloudData: chapter5,
  },
  {
    chapter: "6",
    chapterName: "Mrs Pratchett's Revenge",
    wordCloudData: chapter6,
  },
  {
    chapter: "7",
    chapterName: "Going to Norway",
    wordCloudData: chapter7,
  },
  {
    chapter: "8",
    chapterName: "The Magic Island",
    wordCloudData: chapter8,
  },
  {
    chapter: "9",
    chapterName: "A Visit to the Doctor",
    wordCloudData: chapter9,
  },
  {
    chapter: "10",
    chapterName: "First Day",
    wordCloudData: chapter10,
  },
  {
    chapter: "11",
    chapterName: "Writing Home",
    wordCloudData: chapter11,
  },
  {
    chapter: "12",
    chapterName: "The Matron",
    wordCloudData: chapter12,
  },
  {
    chapter: "13",
    chapterName: "Homesickness",
    wordCloudData: chapter13,
  },
  {
    chapter: "14",
    chapterName: "A Drive in the Motor-car",
    wordCloudData: chapter14,
  },
  {
    chapter: "15",
    chapterName: "Captain Hardcastle",
    wordCloudData: chapter15,
  },
  {
    chapter: "16",
    chapterName: "Little Ellis and the Boil",
    wordCloudData: chapter16,
  },
  {
    chapter: "17",
    chapterName: "Goat's Tobacco",
    wordCloudData: chapter17,
  },
  {
    chapter: "18",
    chapterName: "Getting Dressed for the Big School",
    wordCloudData: chapter18,
  },
  {
    chapter: "19",
    chapterName: "Boazers",
    wordCloudData: chapter19,
  },
  {
    chapter: "20",
    chapterName: "The Headmaster",
    wordCloudData: chapter20,
  },
  {
    chapter: "21",
    chapterName: "Chocolates",
    wordCloudData: chapter21,
  },
  {
    chapter: "22",
    chapterName: "Corkers",
    wordCloudData: chapter22,
  },
  {
    chapter: "23",
    chapterName: "Being Bossed Around",
    wordCloudData: chapter23,
  },
  {
    chapter: "24",
    chapterName: "Games and Photography",
    wordCloudData: chapter24,
  },
  {
    chapter: "25",
    chapterName: "Goodbye School",
    wordCloudData: chapter25,
  },
];

export const metadata = {
  title: "Chapter Wordclouds | Boy | Elalytics",
};

export default function App() {
  const wordsToRemove = ["one", "two", "I", "\u2019", "\u2019s"];
  const categoriesToRemove = ["PUNCT", "DET", "AUX", "PART", "NUM", "PROPN"];
  return (
    <main>
      <div className=" overflow-x-hidden bg-gray-100">
        <div className="my-8 text-center">
          <span className="px-4 py-1 bg-stone-dark rounded text-white inline-block mb-1 text-sm font-bold">
            Boy
          </span>
          <h1 className="text-3xl font-bold ">
            Most frequent words in the book per chapter
          </h1>
          <p>
            Drag the words to different positions and see if you can make any
            new insights!
          </p>
        </div>

        <VisualizationDescription>
          <p>
            This set of visualizations capture the most frequent words that
            occurs in each of the chapter. The size of the words are
            proportionate to how frequently it occurs in the text. This
            visualization doesn&apos;t contain stop words. Stop words are
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
      </div>
    </main>
  );
}
