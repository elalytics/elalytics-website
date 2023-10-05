import ListingGrid from "@/app/utils/components/ListingGrid";
import approvedCharts from "./approved-charts.json";
import PageTitle from "@/app/utils/components/PageTitle";

export const metadata = {
  title: "Lottery | Elalytics",
};

export default function Home() {
  return (
    <main className="max-w-4xl m-auto">
      <div>
        <PageTitle title="Lottery" />
        <ListingGrid items={approvedCharts} buttonText={"View Chart"} />
      </div>
    </main>
  );
}
