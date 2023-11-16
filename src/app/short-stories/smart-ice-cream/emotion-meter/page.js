import bertData from "@/app/data-processing/src/book_projects/smart_ice_cream/data/emotion_scores.json";
import EmotionMeterWithText from "./chart/EmotionMeterWithText";

export const metadata = {
  title: `Emotion Meter | Smart Ice Cream | Elalytics`,
};

export default function App() {
  return (
    <>
      <div className="text-center mt-6 mb-3">
        <h1 className="text-4xl font-bold text-cardinal-red">Emotion Meter</h1>
      </div>
      <div className="w-full">
        <EmotionMeterWithText data={bertData} />
      </div>
    </>
  );
}
