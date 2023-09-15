"use client";
import data from "../data/boy_topwords_chapter_1.json";
import WordCloudDraggableBilingualPanel from "@/app/utils/panels/WordcloudDraggableBilingualPanel";

export const metadata = {
  title: "Chapter 1 Wordcloud | Boy | Elalytics",
};

export default function App() {
  const wordsToRemove = ["one", "two", "I", "\u2019", "\u2019s"];
  const categoriesToRemove = ["PUNCT", "DET", "AUX", "PART", "NUM", "PROPN"];
  return (
    <main>
      <WordCloudDraggableBilingualPanel
        data={data}
        bookName="Boy"
        pageTitle="Chapter 1: Papa and Mama"
        wordsToRemove={wordsToRemove}
        categoriesToRemove={categoriesToRemove}
      />
    </main>
  );
}
