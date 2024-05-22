"use client";
import React, { useState } from "react";

const SuggestedRoutines = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      id="accordion-collapse"
      data-accordion="collapse"
      className="max-w-3xl mx-auto mb-2"
    >
      <h2 id="accordion-collapse-heading-1">
        <button
          type="button"
          className={`flex ${
            isOpen ? "bg-gray-50" : "bg-white rounded-b"
          } items-center justify-between w-full rounded-t px-5 py-1 font-medium rtl:text-right text-gray-500 border border-gray-200 hover:bg-gray-50 gap-3`}
          onClick={toggleAccordion}
          aria-expanded={isOpen}
          aria-controls="accordion-collapse-body-1"
        >
          <span>Suggested Routines</span>
          <svg
            data-accordion-icon
            className={`w-3 h-3 ${isOpen ? "" : "rotate-180"} shrink-0`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        id="accordion-collapse-body-1"
        className={isOpen ? "" : "hidden"}
        aria-labelledby="accordion-collapse-heading-1"
      >
        <div className="p-5 border border-gray-200 bg-white rounded-b">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SuggestedRoutines;
