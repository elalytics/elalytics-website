import WordFrequencyComponent from "./WordFrequencyComponent";
import QuotedWordsBarChart from "./BarChart";
import wordFrequencyData from "@/app/data-processing/src/book_projects/prometheus/data/quoted_word_counter.json";

export const metadata = {
  title: `Quotes | Prometheus | Elalytics`,
};

export default function App() {
  return (
    <div className="my-6">
      <div className="flex h-screen gap-6 max-w-6xl m-auto">
        <div className="w-3/5 p-4 bg-white rounded-xl h-[75%] overflow-y-scroll">
          <WordFrequencyComponent />
        </div>
        <div className="w-2/5 h-[75%]">
          <QuotedWordsBarChart data={wordFrequencyData} />
        </div>
      </div>
    </div>
  );
}
