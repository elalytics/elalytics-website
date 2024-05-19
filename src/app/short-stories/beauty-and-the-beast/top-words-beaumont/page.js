import TopWordsBarChart from "./component/TopWordsBarChart";
import data from "@/app/data-processing/src/book_projects/beauty_and_the_beast/data/top_words_beaumont.json";

export default function Home() {
  return (
    <main>
      <div className="h-screen bg-gray-100">
        <div className="my-8 text-center">
          <span className="px-4 py-1 bg-stone-dark rounded text-white inline-block mb-1 text-sm font-bold">
            Beaumont&apos;s Beauty and the Beast
          </span>
          <h1 className="text-3xl font-bold ">Top 20 Words</h1>
        </div>

        <div className="flex justify-center">
          <div className="w-3/4">
            <TopWordsBarChart data={data} />
          </div>
        </div>
      </div>
    </main>
  );
}
