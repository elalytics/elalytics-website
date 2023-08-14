/* eslint-disable @next/next/no-img-element */
import React from "react";
import { useState } from "react";

const BookGrid = ({ books, onClick }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBooks = Object.entries(books).reduce((acc, [key, book]) => {
    if (book.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      acc[key] = book;
    }
    return acc;
  }, {});

  return (
    <div className="space-y-2 my-4 text-center max-w-4xl m-auto">
      <input
        className="p-4 text-xl border rounded shadow-lg w-full"
        type="text"
        placeholder="Search for a book..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="flex flex-wrap justify-center">
        {Object.entries(filteredBooks).map(([key, book]) => (
          <div
            key={key}
            className="m-2 p-4 w-64 border rounded-2xl shadow-lg cursor-pointer transform hover:shadow-2xl transition-shadow duration-300 bg-white"
            onClick={() => onClick(key)}
          >
            <img
              src={book.cover_image || "default-image-path.jpg"}
              alt={book.title}
              className="mb-2 rounded-t w-full h-32 object-cover"
            />
            <p className="text-center truncate">{book.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookGrid;
