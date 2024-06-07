import SentenceLengthBarChart from "@/app/utils/charts/SentenceLengthBarChart";
import data from "./data/lottery-story-text.json";

export const metadata = {
  title: "Sentence Length Bar Chart | Lottery | Elalytics",
};

export default async function Home() {
  return (
    <main className="bg-gray-100">
      <div className="max-w-6xl m-auto">
        <SentenceLengthBarChart
          sourceData={data}
          showTooltip={true}
          yLabel="Sentence"
          xLabel="Number of Words"
        />
      </div>
    </main>
  );
}
