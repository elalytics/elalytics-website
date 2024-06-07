import WordCloudDraggableAndBilingual from "@/app/utils/charts/WordCloudDraggableAndBilingual";
import data from "./data/topwordsPOS.json";

export const metadata = {
  title: `Top Words Wordcloud | Boy | Elalytics`,
};

export default function Home() {
  return (
    <div className="p-8 min-h-screen">
      <WordCloudDraggableAndBilingual
        data={data}
        wordSizeMultiplier={1}
        wordsToRemove={["thing", "much"]}
        categoriesToRemove={["PUNCT", "DET", "AUX", "PART", "PROPN"]}
        scaleType="log"
      />
    </div>
  );
}
