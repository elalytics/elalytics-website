import SentenceLengthBarChart from "@/app/utils/charts/SentenceLengthBarChart";
import data from "./data/wife-story.json";
export const metadata = {
  title: "Sentence Length Bar Chart | The Wife's Story | Elalytics",
};

export default function Home() {
  return (
    <main>
      <div className="px-2 max-w-6xl m-auto">
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
