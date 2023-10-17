import data from "@/app/data-processing/src/book_projects/cinderella/data/wcloud.json";
import WordCloudDraggableAndBilingual from "@/app/utils/charts/WordCloudDraggableAndBilingual";

export const metadata = {
  title: `Common Words Wordcloud | Cindrella | Elalytics`,
};

export default function App() {
  const wordsToRemoveData = ["the"];
  const categoriesToRemoveData = [];
  return (
    <WordCloudDraggableAndBilingual
      data={data}
      bookName="Cindrella"
      wordCloudTitle="Common Words"
      wordsToRemove={wordsToRemoveData}
      categoriesToRemove={categoriesToRemoveData}
    />
  );
}
