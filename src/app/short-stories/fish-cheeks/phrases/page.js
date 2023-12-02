import data_2_word from "@/app/data-processing/src/book_projects/fish_cheeks/data/ngram_2_values.json";
import data_3_word from "@/app/data-processing/src/book_projects/fish_cheeks/data/ngram_3_values.json";
import WordCloudDraggableAndBilingual from "@/app/utils/charts/WordCloudDraggableAndBilingual";

export const metadata = {
  title: `Common Phrases Wordcloud | Fish Cheeks | Elalytics`,
};

export default function App() {
  const wordsToRemoveData = [];
  const categoriesToRemoveData = [];
  return (
    <div>
      <WordCloudDraggableAndBilingual
        bookName="Fish Cheeks"
        data={data_2_word}
        wordCloudTitle="Common 2 Word Phrases"
        customNoteText="Drag the phrases to different positions and see if you can make any new insights!"
        wordsToRemove={wordsToRemoveData}
        categoriesToRemove={categoriesToRemoveData}
        hideLegend={true}
      />
      <WordCloudDraggableAndBilingual
        data={data_3_word}
        wordCloudTitle="Common 3 Word Phrases"
        customNoteText="Drag the phrases to different positions and see if you can make any new insights!"
        wordsToRemove={wordsToRemoveData}
        categoriesToRemove={categoriesToRemoveData}
        hideLegend={true}
      />
    </div>
  );
}
