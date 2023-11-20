import data from "@/app/data-processing/src/book_projects/smart_ice_cream/data/wordcloud.json";
import WordCloudDraggableAndBilingual from "@/app/utils/charts/WordCloudDraggableAndBilingual";

export const metadata = {
  title: `Common Words Wordcloud | Smart Ice-Cream | Elalytics`,
};

export default function App() {
  const wordsToRemoveData = ["the", "i"];
  const categoriesToRemoveData = [
    "Pronoun",
    "Numeral",
    "Wh-Adverb",
    "Conjunction",
    "Existential",
    "Preposition",
    "Determiner",
    "Modal",
  ];
  return (
    <WordCloudDraggableAndBilingual
      data={data}
      bookName="Smart Ice-Cream"
      wordCloudTitle="Common Words"
      wordsToRemove={wordsToRemoveData}
      categoriesToRemove={categoriesToRemoveData}
    />
  );
}
