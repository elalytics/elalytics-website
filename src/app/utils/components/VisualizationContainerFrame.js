"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import Link from "next/link";
import visualizationListing from "@/app/allVisualizationDetails.json";
import { cleanUrl } from "@/app/utils/functions/general-functions";

const VisualizationContainerFrame = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [path, setPath] = useState("");
  const [bookName, setBookName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentPath = cleanUrl(window.location);
      setPath(currentPath);
      
      // Extract book name from URL path
      // Assuming the pattern is /books/[book-name]/...
      const pathParts = currentPath.split('/');
      if (pathParts.length > 2 && pathParts[1] === "books") {
        setBookName(pathParts[2]);
      }
    }
  }, []);

  // Get the current visualization's text name from the visualization listing
  const currentTextName = visualizationListing[path]?.textName || "";

  return (
    <div className="overflow-x-hidden bg-gray-100">
      {path && (
        <div className="max-w-3xl mx-auto pt-4 px-4">
          <Link 
            href={`/visualizations#filter=${encodeURIComponent(currentTextName)}`}
            className="flex items-center gap-2 text-cardinal-red hover:underline"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
            <span>Back to {currentTextName} visualizations</span>
          </Link>
        </div>
      )}
      <div className="my-8 text-center max-w-3xl m-auto">
        <span className="px-4 py-1 bg-stone-dark rounded text-white inline-block mb-1 text-sm font-bold">
          {visualizationListing[path]?.textName}
        </span>
        <h1 className="text-3xl font-bold ">
          {visualizationListing[path]?.title}{" "}
          <span data-tooltip-id="info" title="About this visualization">
            <FontAwesomeIcon
              titleId="info-icon"
              className="text-black-50 hover:text-black-80 px-1 cursor-pointer"
              icon={faInfoCircle}
              onClick={() => setIsOpen(!isOpen)}
            />
          </span>
          <Tooltip id="info" variant="light">
            <div className="max-w-2xl text-base font-normal text-left">
              Click to learn more about this visualization
            </div>
          </Tooltip>
        </h1>
        {isOpen && (
          <div
            className="text-left p-2 mb-4 bg-white"
            dangerouslySetInnerHTML={{
              __html: visualizationListing[path]?.description,
            }}
          ></div>
        )}
      </div>
      {children}
    </div>
  );
};

export default VisualizationContainerFrame;