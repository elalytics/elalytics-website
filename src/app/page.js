import ChartsList from "./utils/components/ChartsList";
import charts from "@/app/chartsData.json";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <div>
        <div className="text-center pt-10 mb-6">
          <h1 className="text-4xl font-bold text-cardinal-red">Elalytics</h1>
        </div>
        <div className="mb-6 max-w-6xl m-auto text-center">
          <Link href="/visualizations">
            <button className="bg-cardinal-red hover:bg-cardinal-red-dark text-white px-4 py-2 rounded">
              View All Visualizations
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
