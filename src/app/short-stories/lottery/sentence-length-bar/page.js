import { getDataFromUrl } from "@/app/utils/functions/general-functions";
import SentenceLengthBarChart from "@/app/utils/charts/SentenceLengthBarChart";
import data from "./data/lottery-story-text.json";

export const metadata = {
  title: "Sentence Length Bar Chart | Lottery | Elalytics",
};

export default async function Home() {
  let url =
    "https://raw.githubusercontent.com/ddeepak95/elalytics-data-processing/main/src/book_projects/lottery/data/lottery-story-text.json";

  let dataFromGithub = await getDataFromUrl(url);

  return (
    <main className="bg-gray-100">
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
