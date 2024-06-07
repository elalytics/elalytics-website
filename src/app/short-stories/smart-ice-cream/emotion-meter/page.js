import bertData from "@/app/data-processing/src/book_projects/smart_ice_cream/data/emotion_scores.json";
import EmotionMeterWithText from "./chart/EmotionMeterWithText";

export const metadata = {
  title: `Emotion Meter | Smart Ice Cream | Elalytics`,
};

export default function App() {
  return (
    <>
      <div className="w-full">
        <EmotionMeterWithText data={bertData} />
      </div>
    </>
  );
}
