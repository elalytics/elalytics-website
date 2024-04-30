import Link from "next/link";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const vizData = [
  {
    grade: "Grade 6",
    category: "Word Cloud",
    title:
      "Most Frequent Words most Frequent Words Frequent Words most Frequent Words",
    textName: "Box",
    interactivity: 3,
  },
  {
    grade: "Grade 7",
    category: "Line Chart",
    title: "Big Words",
    textName: "Box",
    interactivity: 2,
  },
  {
    grade: "Grade 8",
    category: "Bar Chart",
    title: "Long Words",
    textName: "Box",
    interactivity: 1,
  },
];

const VizItem = ({ item }) => {
  const gradeColors = {
    "Grade 6": "#009BCC",
    "Grade 7": "#9747FF",
    "Grade 8": "#CC8700",
  };
  const categoryColors = {
    "Word Cloud": "#CC0000",
    "Line Chart": "#098433",
    "Bar Chart": "#0052CC",
    Misc: "#494949",
  };
  return (
    <div className="p-3 bg-white w-[300px] rounded shadow hover:shadow-xl h-full flex flex-col justify-between">
      <div>
        <div className="flex gap-1 mb-2">
          <span
            className="p-1 px-3 text-white font-bold rounded text-xs"
            style={{ backgroundColor: gradeColors[item.grade] }}
          >
            {item.grade}
          </span>
          <span
            className="p-1 px-3 text-white font-bold rounded text-xs"
            style={{ backgroundColor: categoryColors[item.category] }}
          >
            {item.category}
          </span>
        </div>
        <div className="mb-1">
          <p
            className="text-xl"
            title={`Visualization Name: ${item.title}`}
            style={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {item.title}
          </p>
        </div>
      </div>
      <div>
        <p className="text-sm font-bold" title={`Text Name: ${item.textName}`}>
          {item.textName}
        </p>
        <span className="text-sm text-black-70">Interactivity</span>
        <span className="ml-1">
          {[...Array(item.interactivity)].map((_, index) => (
            <i key={index} className="text-orange-500" aria-hidden="true">
              <FontAwesomeIcon icon={faStar} />
            </i>
          ))}
          {[...Array(3 - item.interactivity)].map((_, index) => (
            <i key={index} className="text-black-50" aria-hidden="true">
              <FontAwesomeIcon icon={faStar} />
            </i>
          ))}
        </span>
      </div>
    </div>
  );
};

export default function Visualizations() {
  return (
    <main className="h-[calc(100vh-105px)]">
      <div className="flex h-full">
        <div className="p-5 bg-slate-50 w-[400px]">
          <h1 className="text-4xl font-bold text-cardinal-red">Elalytics</h1>
        </div>
        <div className="p-5">
          <div className="flex flex-wrap gap-3 items-stretch">
            {vizData.map((item, index) => {
              return (
                <Link key={index} href={"/#"}>
                  <VizItem item={item} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
