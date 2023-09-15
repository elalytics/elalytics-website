import data from "../data/chapters/boy_topwords_chapter_4.json";
import chapterInfo from "../data/chapter-info.json";
import wordsToRemove from "../data/words-to-remove.json";
import categoriesToRemove from "../data/categories-to-remove.json";
import WordCloudDraggableBilingualPanel from "@/app/utils/panels/WordcloudDraggableBilingualPanel";
const chapterNumber = 4;
export const metadata = {
  title: `Chapter ${chapterNumber}: ${
    chapterInfo[chapterNumber - 1].chapterName
  } Wordcloud | Boy | Elalytics`,
};

export default function App() {
  const wordsToRemoveData = [...wordsToRemove];
  const categoriesToRemoveData = [...categoriesToRemove];
  return (
    <main>
      <WordCloudDraggableBilingualPanel
        data={data}
        bookName="Boy"
        pageTitle={`Chapter ${chapterNumber}: ${
          chapterInfo[chapterNumber - 1].chapterName
        }`}
        wordsToRemove={wordsToRemoveData}
        categoriesToRemove={categoriesToRemoveData}
      />
    </main>
  );
}
