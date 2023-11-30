import data from "@/app/data-processing/src/book_projects/the_scholarship_jacket/data/wordcloud.json";
import WordCloudDraggableAndBilingual from "@/app/utils/charts/WordCloudDraggableAndBilingual";

export const metadata = {
  title: `Common Words Wordcloud | The Scholarship Jacket | Elalytics`,
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
    "Wh-Pronoun",
  ];
  return (
    <WordCloudDraggableAndBilingual
      data={data}
      bookName="The Scholarship Jacket"
      wordCloudTitle="Common Words"
      wordsToRemove={wordsToRemoveData}
      categoriesToRemove={categoriesToRemoveData}
    />
  );
}
