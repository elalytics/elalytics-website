import WordCloudDraggableAndBilingual from "@/app/utils/charts/WordCloudDraggableAndBilingual";
import data from "./data/topwordsPOS.json";

export const metadata = {
  title: `Top Words Wordcloud | Boy | Elalytics`,
};

export default function Home() {
  return (
    <main className="p-8 min-h-screen">
      <WordCloudDraggableAndBilingual
        data={data}
        wordSizeMultiplier={1}
        bookName="Boy"
        wordCloudTitle="Most Frequent Words in the book"
        wordsToRemove={["thing", "much"]}
        categoriesToRemove={["PUNCT", "DET", "AUX", "PART", "PROPN"]}
        scaleType="log"
      />
    </main>
  );
}
