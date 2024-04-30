import Link from "next/link";
import {
  faStar,
  faCloud,
  faLineChart,
  faChartColumn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const vizData = [
  {
    grade: "Grade 6",
    category: "Word Cloud",
    title: "Most Frequent Words",
    textName: "Boy",
    interactivity: 3,
    link: "/books/the-boy/chapter-word-clouds",
  },
  {
    grade: "Grade 6",
    category: "Bar Chart",
    title: "Emotions by Character",
    textName: "Boy",
    interactivity: 2,
    link: "/books/the-boy/emotions",
  },
  {
    grade: "Grade 6",
    category: "Line Chart",
    title: "General Sentiment",
    textName: "Boy",
    interactivity: 2,
    link: "/books/the-boy/general-sentiment-line",
  },
  {
    grade: "Grade 7",
    category: "Word Cloud",
    title: "Common Phrases",
    textName: "Fish Cheeks",
    interactivity: 3,
    link: "/short-stories/fish-cheeks/phrases",
  },
  {
    grade: "Grade 7",
    category: "Word Cloud",
    title: "Key Words with Quotes",
    textName: "Fish Cheeks",
    interactivity: 2,
    link: "/short-stories/fish-cheeks/word-frequency-quote",
  },
  {
    grade: "Grade 7",
    category: "Word Cloud",
    title: "Word Frequency",
    textName: "Fish Cheeks",
    interactivity: 2,
    link: "/short-stories/fish-cheeks/word-frequency",
  },
  {
    grade: "Grade 8",
    category: "Bar Chart",
    title: "Sentence Length",
    textName: "The Lottery",
    interactivity: 2,
    link: "/short-stories/lottery/sentence-length-bar",
  },
  {
    grade: "Grade 8",
    category: "Line Chart",
    title: "Sentence Length",
    textName: "The Lottery",
    interactivity: 2,
    link: "/short-stories/lottery/sentence-length",
  },
  {
    grade: "Grade 8",
    category: "Bar Chart",
    title: "Suspense",
    textName: "The Lottery",
    interactivity: 2,
    link: "/short-stories/lottery/suspense",
  },
];

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
    Misc: "#494949",
  };
  const textCovers = {
    Boy: "/imgs/textCovers/boy.jpg",
    "Summer of the Mariposas": "/imgs/textCovers/summer-of-the-mariposas.jpg",
    "Fish Cheeks": "/imgs/textCovers/fish-cheeks.jpg",
    "The Lottery": "/imgs/textCovers/lottery.jpg",
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
                  categoryStyles[item.category]["backgroundColor"],
              }}
            >
              <i title={item.category}>
                <FontAwesomeIcon icon={categoryStyles[item.category]["icon"]} />
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
            {vizData.map((item, index) => {
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
