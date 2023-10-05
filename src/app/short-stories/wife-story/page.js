import ListingGrid from "@/app/utils/components/ListingGrid";
import approvedCharts from "./approved-charts.json";
import PageTitle from "@/app/utils/components/PageTitle";

export const metadata = {
  title: "The Wife's Story | Elalytics",
};

export default function Home() {
  return (
    <main className="max-w-4xl m-auto">
      <div>
        <PageTitle title="The Wife's Story" />
        <ListingGrid items={approvedCharts} buttonText={"View Chart"} />
      </div>
    </main>
  );
}
