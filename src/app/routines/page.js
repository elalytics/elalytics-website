"use client";
import Link from "next/link";
import {
  faFilePdf,
  faArrowLeft,
  faUpRightFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const routines = [
  { title: "Big, Medium, Small",        file: "Big_Medium_Small.pdf",        color: "#0052CC" },
  { title: "Name That Rule",            file: "Name that rule.pdf",          color: "#098433" },
  { title: "Notice, Mean, Wonder",      file: "Notice, Mean, Wonder.pdf",    color: "#9747FF" },
  { title: "Read, Draw, Compare",       file: "Read, Draw, Compare.pdf",     color: "#CC8700" },
  { title: "What Did the Computer Miss?", file: "What Did the Computer Miss.pdf", color: "#CC0000" },
];

const RoutineCard = ({ item }) => {
  const href = encodeURI(`/${item.file}`);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <div className="bg-white w-[300px] rounded shadow hover:shadow-xl h-full flex flex-col justify-between">
        <div>
          <div
            className="rounded-t p-2 flex flex-col"
            style={{ backgroundColor: item.color, height: "180px" }}
          >
            <div className="flex gap-1">
              <span
                className="p-1 px-3 text-white font-bold rounded text-xs"
                style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
              >
                Routine
              </span>
              <span
                className="p-1 px-3 text-white font-bold rounded text-xs"
                style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
              >
                PDF
              </span>
            </div>
            <div className="flex-1 flex items-center justify-center">
              <FontAwesomeIcon icon={faFilePdf} className="text-white text-6xl" />
            </div>
          </div>
          <div className="mb-1 pt-2 px-2">
            <p
              className="text-xl"
              title={item.title}
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
        <div className="p-2 flex items-center justify-between gap-2">
          <span className="text-sm text-gray-500 truncate min-w-0" title={item.file}>
            {item.file}
          </span>
          <span className="text-sm font-bold text-cardinal-red whitespace-nowrap flex-shrink-0">
            Open <FontAwesomeIcon icon={faUpRightFromSquare} className="ml-1" />
          </span>
        </div>
      </div>
    </a>
  );
};

export default function Routines() {
  return (
    <main className="h-[calc(100vh-105px)]">
      <div className="flex h-full">
        <div className="p-5 bg-slate-50 w-[400px] flex-shrink-0">
          <h1 className="text-4xl font-bold text-cardinal-red mb-2">Elalytics</h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 mb-4 font-bold text-cardinal-red hover:underline"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            Visualizations
          </Link>
          <h2 className="text-2xl font-bold mb-2">Routines</h2>
          <p className="text-sm text-gray-600">
            Classroom routines for working with text visualizations. Select a card
            to open the PDF.
          </p>
        </div>
        <div className="p-5 overflow-y-scroll w-[calc(100%-400px)]">
          <div className="flex flex-wrap gap-3 items-stretch">
            {routines.map((item, index) => (
              <RoutineCard key={index} item={item} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
