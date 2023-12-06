import WordFrequencyComponent from "./WordFrequencyComponent";
import QuotedWordsBarChart from "./BarChart";
import wordFrequencyData from "@/app/data-processing/src/book_projects/fish_cheeks/data/word_frequencies.json";

export const metadata = {
  title: `Quotes | Fish Cheeks | Elalytics`,
};

export default function App() {
  return (
    <div className="my-6">
      <div className="text-center mb-2">
        <span className="px-4 py-1 bg-stone-dark rounded text-white inline-block mb-1 text-sm font-bold">
          Fish Cheeks
        </span>
        <h2 className="text-3xl font-bold">Quoted Words</h2>
      </div>

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
