"use client";

import Histogram from "./components/Histogram";
import { useEffect, useState } from "react";
import data from "./data/books_data.json";
import BookGrid from "./components/BookGrid";

export default function Home() {
  const [book, setBook] = useState(null);
  const [bookTitle, setBookTitle] = useState("Test Book");
  const [histogramCount, setHistogramCount] = useState(1);
  const [histogramSegments, setHistogramSegments] = useState(1);
  const [histogramLabelType, setHistogramLabelType] = useState("Pages");

  const handleBookClick = (bookKey) => {
    setBook(bookKey);
  };
  useEffect(() => {
    if (book === null) return;
    setBookTitle(data[book].title);
    setHistogramCount(data[book].pages);
    setHistogramSegments(data[book].segments);
    setHistogramLabelType("Pages");
  }, [book]);

  return (
    <main>
      <div className="h-screen overflow-x-hidden bg-gray-100">
        <div className="h-[50px] mt-[20px] text-center">
          <h1 className="text-3xl font-bold ">Book Chart</h1>
        </div>
        {book === null ? (
          <BookGrid books={data} onClick={handleBookClick} />
        ) : (
          <div className="text-center h-[calc(100vh-70px)]">
            <span className="px-4 py-1 bg-stone-600 rounded text-white inline-block mb-1 text-sm font-bold">
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
        )}
      </div>
    </main>
  );
}
