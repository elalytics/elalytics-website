import data from "@/app/data-processing/src/book_projects/christmas_carol/data/aggregated_emotion_values_scrooge.json";
import bertData from "@/app/data-processing/src/book_projects/christmas_carol/data/aggregated_emotion_scores_bert_scrooge.json";
import EmotionsLineChart from "./chart/EmotionsLineChart";
import ValenceLineChart from "./chart/ValenceLineChart";

export const metadata = {
  title: `Emotion Progression of Scrooge | A Christmas Carol | Elalytics`,
};

export default function App() {
  return (
    <>
      <div className="max-w-3xl m-auto flex flex-col gap-8 my-4">
        {/* <div>
          <h3 className="text-2xl font-bold text-center">
            Using the NRC Emotion Lexicon
          </h3>
          <EmotionsLineChart data={data} />
        </div> */}
        <div>
          {/* <h3 className="text-2xl font-bold text-center">
            Using the BERT-based Emotion Classifier
          </h3> */}
          <EmotionsLineChart data={bertData} />
        </div>
        {/* <ValenceLineChart data={data} /> */}
      </div>
    </>
  );
}
