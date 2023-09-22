import SentenceLengthBarChart from "@/app/utils/charts/SentenceLengthBarChart";
import data from "./data/lottery-story-text.json";
export const metadata = {
  title: "Sentence Length Bar Chart | Lottery | Elalytics",
};

export default function Home() {
  return (
    <main>
      <div className="p-6 max-w-6xl m-auto">
        <SentenceLengthBarChart
          sourceData={data}
          showTooltip={true}
          yLabel="Sentence"
          xLabel="Number of Words"
          bookName="Lottery"
          chartTitle={"Sentence Length Bar Chart"}
        />
      </div>
    </main>
  );
}
