"use client";

import Histogram from "./components/Histogram";
import { useState } from "react";
import data from "./data/books_data.json";
import BookGrid from "./components/BookGrid";

export default function Home() {
  const [book, setBook] = useState(null);
  const [bookTitle, setBookTitle] = useState("Test Book");
  const [histogramCount, setHistogramCount] = useState(1);
  const [histogramSegments, setHistogramSegments] = useState(6);
  const [histogramLabelType, setHistogramLabelType] = useState("Pages");

  const handleBookClick = (bookTitle, bookPageCount) => {
    setBook(bookTitle);
    setBookTitle(bookTitle);
    setHistogramCount(bookPageCount);
  };

  return (
    <main>
      <div className="h-screen overflow-x-hidden bg-gray-100">
        <div className="h-[50px] mt-[20px] text-center">
          <h1 className="text-3xl font-bold ">Book Chart</h1>
        </div>
        <div className={`${book === null ? "block" : "hidden"}`}>
          <BookGrid books={data} onClick={handleBookClick} />
        </div>
        <div className={`${book !== null ? "block" : "hidden"}`}>
          <div className="text-center w-90 h-[calc(100vh-70px)]">
            <button
              onClick={() => {
                setBook(null);
              }}
              className="absolute left-10 px-4 py-1 bg-blue-500 hover:bg-blue-700 rounded text-white inline-block mb-1 text-sm font-bold"
            >
              Back
            </button>
            <span className="px-4 py-1 bg-stone-dark rounded text-white inline-block mb-1 text-sm font-bold">
              {bookTitle}
            </span>
            <div className="h-[calc(100%-10%)] w-screen">
              <Histogram
                maxCount={histogramCount}
                requiredSegments={histogramSegments}
                type={histogramLabelType}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
