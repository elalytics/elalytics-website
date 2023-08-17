/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";

const BookGrid = ({ onClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  const fetchBooks = async () => {
    setHasSearched(true);
    setIsLoading(true); // Set loading to true when search starts
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&maxResults=9&key=AIzaSyB0T4MHs9EA0onOdjdgLZupOYywrMZD_Gk`
      );
      const data = await response.json();
      const filteredBooks = data.items.filter(
        (book) => book.volumeInfo.pageCount > 0
      );
      setBooks(filteredBooks || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false); // Set loading back to false once search is complete
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      fetchBooks();
    }
  };

  useEffect(() => {
    const allAuthors = books.flatMap((book) => book.volumeInfo.authors || []);
    setAuthors(allAuthors);
  }, [books]);

  return (
    <div className="w-full">
      <div className="text-center m-auto">
        <input
          className="p-4 border text-xl m-4 w-full max-w-2xl rounded shadow-lg flex-grow"
          type="text"
          placeholder="Search for a book.. (e.g. Wonder by Palacio)"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <br />
        <button
          className="bg-blue-500 text-white rounded py-4 px-6 hover:bg-blue-600"
          onClick={fetchBooks}
        >
          Search Book
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto max-w-4xl m-auto my-8">
        {isLoading ? (
          <div className="col-span-full">
            <p className="text-center mx-auto my-auto">Loading...</p>
          </div>
        ) : books.length === 0 && hasSearched ? (
          <div className="col-span-full">
            <p className="text-center mx-auto my-auto">No books available</p>
          </div>
        ) : (
          books.map((book, index) => (
            <div
              key={index}
              className="m-2 p-4 w-64 border rounded shadow-lg cursor-pointer transform hover:shadow-2xl transition-shadow duration-300 bg-white"
              onClick={() =>
                onClick(book.volumeInfo.title, book.volumeInfo.pageCount)
              }
            >
              <img
                src={
                  book.volumeInfo.imageLinks?.thumbnail ||
                  "https://upload.wikimedia.org/wikipedia/commons/b/b9/No_Cover.jpg"
                }
                alt={book.volumeInfo.title}
                className="mb-2 rounded-t w-full h-32 object-cover"
              />
              <p className="truncate">{book.volumeInfo.title}</p>
              <p className="text-sm text-gray-500 truncate">
                {book.volumeInfo.authors?.join(", ") || "No authors available"}
              </p>
              <p className="text-xs text-gray-500">
                Pages: {book.volumeInfo.pageCount} • Year:{" "}
                {book.volumeInfo.publishedDate}
              </p>
            </div>
          ))
        )}
      </div>
      {hasSearched && !isLoading && (
        <div className="mb-24">
          <BookInput onClick={onClick} />
        </div>
      )}
    </div>
  );
};

const BookInput = ({ onClick }) => {
  const [bookName, setBookName] = useState("");
  const [pageCount, setPageCount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onClick(bookName, pageCount);
  };

  return (
    <div className="border border-gray-400 rounded p-4 max-w-xl m-auto">
      <h2 className="text-xl text-center">
        Not able to find the book? Create chart manually!
      </h2>
      <div className="flex justify-center items-center">
        <form onSubmit={handleSubmit} className="text-center m-auto">
          <input
            type="text"
            placeholder="Book Name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
            className="p-2 border m-2 w-full max-w-[400px] rounded shadow-lg flex-grow"
          />
          <input
            type="number"
            placeholder="Page Count"
            value={pageCount}
            onChange={(e) => setPageCount(e.target.value)}
            className="p-2 border m-2 w-full max-w-[400px] rounded shadow-lg flex-grow"
          />
          <button
            type="submit"
            className="bg-blue-500 block m-auto text-white mt-2 rounded py-2 px-4 hover:bg-blue-600"
          >
            Create Chart
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookGrid;
