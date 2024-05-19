import SentimentLineChart from "./components/SentimentLineChart";
import beaumontData from "@/app/data-processing/src/book_projects/beauty_and_the_beast/data/sentiment_beaumont.json";
import perraultData from "@/app/data-processing/src/book_projects/beauty_and_the_beast/data/sentiment_perrault.json";

export const metadata = {
  title: `Sentiment Chart | Beauty and The Beast | Elalytics`,
};

export default function Home() {
  return (
    <main>
      <div className="h-screen bg-gray-100">
        <div className="my-8 text-center">
          <span className="px-4 py-1 bg-stone-dark rounded text-white inline-block mb-1 text-sm font-bold">
            Beauty and the Beast
          </span>
          <h1 className="text-3xl font-bold ">Sentiment Chart</h1>
        </div>

        <div className="flex justify-center">
          <div className="w-3/4">
            <SentimentLineChart
              beaumontData={beaumontData}
              perraultData={perraultData}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
