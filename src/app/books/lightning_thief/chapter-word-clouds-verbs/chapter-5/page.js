import data from "../data/chapters/lightning_thief_topwords_chapter_6.json";
import chapterInfo from "../data/chapter-info.json";
import wordsToRemove from "../data/words-to-remove.json";
import categoriesToRemove from "../data/categories-to-remove.json";
import WordCloudDraggableAndBilingual from "@/app/utils/charts/WordCloudDraggableAndBilingual";
const chapterNumber = 5;
export const metadata = {
  title: `Chapter ${chapterNumber}: ${
    chapterInfo[chapterNumber - 1].chapterName
  } Wordcloud | Lightning Thief | Elalytics`,
};

export default function App() {
  const wordsToRemoveData = [...wordsToRemove];
  const categoriesToRemoveData = [...categoriesToRemove];
  return (
    <WordCloudDraggableAndBilingual
      data={data}
      bookName="Lightning Thief"
      wordCloudTitle={`Chapter ${chapterNumber}: ${
        chapterInfo[chapterNumber - 1].chapterName
      }`}
      wordsToRemove={wordsToRemoveData}
      categoriesToRemove={categoriesToRemoveData}
    />
  );
}
