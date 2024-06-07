import data from "@/app/data-processing/src/book_projects/christmas_carol/data/christmas_carol_scrooge_top_words.json";
import WordCloudDraggableAndBilingual from "@/app/utils/charts/WordCloudDraggableAndBilingual";

export const metadata = {
  title: `Scene-wise top words of Scrooge | A Christmas Carol | Elalytics`,
};

export default function App() {
  const wordsToRemoveData = ["the"];
  const categoriesToRemoveData = [];

  return (
    <>
      {data.map((act, actIndex) =>
        act.scenes.map((scene, sceneIndex) => (
          <div key={`act-${actIndex}-scene-${sceneIndex}`} className="py-6">
            <WordCloudDraggableAndBilingual
              data={scene.words.slice(0, 50)}
              bookName=""
              customNoteText={" "}
              wordCloudTitle={`Act ${actIndex + 1} Scene ${sceneIndex + 1}`}
              wordsToRemove={wordsToRemoveData}
              categoriesToRemove={categoriesToRemoveData}
              scaleType="linear"
            />
          </div>
        ))
      )}
    </>
  );
}
