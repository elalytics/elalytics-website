import Link from "next/link";
import {
  faStar,
  faCloud,
  faLineChart,
  faChartColumn,
  faTableCells,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import data from "./elalyticsVisualizations.json";

const VizItem = ({ item }) => {
  const gradeColors = {
    "Grade 6": "#009BCC",
    "Grade 7": "#9747FF",
    "Grade 8": "#CC8700",
  };
  const categoryStyles = {
    "Word Cloud": { backgroundColor: "#CC0000", icon: faCloud },
    "Line Chart": { backgroundColor: "#098433", icon: faLineChart },
    "Bar Chart": { backgroundColor: "#0052CC", icon: faChartColumn },
    Misc: { backgroundColor: "#000000", icon: faTableCells },
  };
  const textCovers = {
    Boy: "/imgs/textCovers/boy.jpg",
    "Summer of the Mariposas": "/imgs/textCovers/summer-of-the-mariposas.jpg",
    "Fish Cheeks": "/imgs/textCovers/fish-cheeks.jpg",
    "The Lottery": "/imgs/textCovers/lottery.jpg",
    "Christmas Carol": "/imgs/textCovers/christmas-carol.jpg",
    "The Lady, or the Tiger?": "/imgs/textCovers/lady-tiger.jpg",
    "Smart Ice Cream": "/imgs/textCovers/smart-ice-cream.jpg",
    "The Elevator": "/imgs/textCovers/the-elevator.jpg",
    "The Scholarship Jacket": "/imgs/textCovers/the-scholarship-jacket.jpg",
    "The Wife's Story": "/imgs/textCovers/the-wifes-story.jpg",
    Prometheus: "/imgs/textCovers/prometheus.jpg",
    Chocolate: "/imgs/textCovers/chocolate.jpg",
    "Demystifying Brain": "/imgs/textCovers/demystifying-brain.png",
    "Phineas Gage": "/imgs/textCovers/phineas-gage.jpeg",
  };
  return (
    <div className="bg-white w-[300px] rounded shadow hover:shadow-xl h-full flex flex-col justify-between">
      <div>
        <div
          className="rounded-t p-2"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${
              textCovers[item.textName]
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "180px",
          }}
        >
          <div className="flex gap-1 mb-2">
            <span
              className="p-1 px-3 text-white font-bold rounded text-xs"
              style={{ backgroundColor: gradeColors[item.grade] }}
            >
              {item.grade}
            </span>
            <span
              className="p-1 px-3 text-white font-bold rounded text-xs"
              style={{
                backgroundColor:
                  categoryStyles[item.category]?.backgroundColor ??
                  categoryStyles["Misc"]?.backgroundColor,
              }}
              title={item.category || "Misc"}
            >
              <i title={item.category || "Misc"}>
                <FontAwesomeIcon
                  icon={
                    categoryStyles[item.category]?.icon ??
                    categoryStyles["Misc"]?.icon
                  }
                />
              </i>
            </span>
          </div>
        </div>
        <div className="mb-1 pt-2 px-2">
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
      <div className="p-2">
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
        <div className="p-5 bg-slate-50 min-w-[400px]">
          <h1 className="text-4xl font-bold text-cardinal-red">Elalytics</h1>
          <p>Search and filters coming soon!</p>
        </div>
        <div className="p-5 overflow-y-scroll">
          <div className="flex flex-wrap gap-3 items-stretch ">
            {data.map((item, index) => {
              return (
                <Link key={index} href={item.link}>
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
