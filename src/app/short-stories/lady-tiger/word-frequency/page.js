import data from "@/app/data-processing/src/book_projects/lady_tiger/data/wcloud.json";
import WordCloudDraggableAndBilingual from "@/app/utils/charts/WordCloudDraggableAndBilingual";

export const metadata = {
  title: `Common Words Wordcloud | The Lady, or the Tiger? | Elalytics`,
};

export default function App() {
  const wordsToRemoveData = ["the"];
  const categoriesToRemoveData = [];
  return (
    <WordCloudDraggableAndBilingual
      data={data}
      wordsToRemove={wordsToRemoveData}
      categoriesToRemove={categoriesToRemoveData}
    />
  );
}
