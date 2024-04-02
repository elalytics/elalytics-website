import ChartsList from "@/app/utils/components/ChartsList";
import charts from "./chartsData.json";

export default function Home() {
  return (
    <main>
      <div>
        <div className="text-center pt-10 mb-6">
          <h1 className="text-4xl font-bold">Boy</h1>
        </div>
        <div className="mb-6 max-w-6xl m-auto">
          <ChartsList chartItems={charts} />
        </div>
      </div>
    </main>
  );
}
