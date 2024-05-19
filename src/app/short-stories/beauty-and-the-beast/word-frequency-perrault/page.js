import data from "@/app/data-processing/src/book_projects/beauty_and_the_beast/data/wcloud_perrault.json";
import WordCloudDraggableAndBilingual from "@/app/utils/charts/WordCloudDraggableAndBilingual";

export const metadata = {
  title: `Common Words Wordcloud | Beauty and The Beast by Perrault | Elalytics`,
};

export default function App() {
  const wordsToRemoveData = ["i", "the"];
  const categoriesToRemoveData = [];
  return (
    <WordCloudDraggableAndBilingual
      data={data}
      bookName="Beauty and The Beast by Perrault"
      wordCloudTitle="Word Frequency"
      wordsToRemove={wordsToRemoveData}
      categoriesToRemove={categoriesToRemoveData}
    />
  );
}
