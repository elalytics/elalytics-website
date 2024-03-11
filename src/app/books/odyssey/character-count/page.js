import CharacterCountChart from "./component/Character-Count-Chart";
import data from "@/app/data-processing/src/book_projects/odyssey/data/character_count.json";

export const metadata = {
  title: `Character Mentions | Odyssey | Elalytics`,
};

export default function App() {
  return (
    <div className="max-w-5xl m-auto">
      <h1 className="text-2xl text-center my-4">
        Character mentions across the chapters
      </h1>
      <CharacterCountChart data={data} />
    </div>
  );
}
