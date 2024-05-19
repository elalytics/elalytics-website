import data from "@/app/data-processing/src/book_projects/beauty_and_the_beast/data/wcloud_beaumont.json";
import WordCloudDraggableAndBilingual from "@/app/utils/charts/WordCloudDraggableAndBilingual";

export const metadata = {
  title: `Common Words Wordcloud | Beauty and The Beast by Beaumont | Elalytics`,
};

export default function App() {
  const wordsToRemoveData = ["i"];
  const categoriesToRemoveData = [];
  return (
    <WordCloudDraggableAndBilingual
      data={data}
      bookName="Beauty and The Beast by Beaumont"
      wordCloudTitle="Word Frequency"
      wordsToRemove={wordsToRemoveData}
      categoriesToRemove={categoriesToRemoveData}
    />
  );
}
