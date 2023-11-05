import data from "@/app/data-processing/src/book_projects/christmas_carol/data/aggregated_emotion_values_scrooge.json";
import EmotionsLineChart from "./chart/EmotionsLineChart";
import ValenceLineChart from "./chart/ValenceLineChart";

export const metadata = {
  title: `Emotion Progression of Scrooge | A Christmas Carol | Elalytics`,
};

export default function App() {
  return (
    <>
      <div className="text-center mt-6 mb-3">
        <h1 className="text-4xl font-bold text-cardinal-red">
          Emotions of Scrooge
        </h1>
      </div>
      <div className="max-w-3xl m-auto flex flex-col gap-8 my-4">
        <EmotionsLineChart data={data} />
        <ValenceLineChart data={data} />
      </div>
    </>
  );
}
