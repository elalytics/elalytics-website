"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import visualizationListing from "@/app/allVisualizationDetails.json";
import { cleanUrl } from "@/app/utils/functions/general-functions";

const VisualizationContainerFrame = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [path, setPath] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPath(cleanUrl(window.location));
    }
  }, []);
  return (
    <div className="overflow-x-hidden bg-gray-100">
      <div className="my-8 text-center max-w-3xl m-auto">
        <span className="px-4 py-1 bg-stone-dark rounded text-white inline-block mb-1 text-sm font-bold">
          {visualizationListing[path]?.textName}
        </span>
        <h1 className="text-3xl font-bold ">
          {visualizationListing[path]?.title}{" "}
          <span data-tooltip-id="info">
            <FontAwesomeIcon
              className="text-black-50 hover:text-black-80 px-1 cursor-pointer"
              title="About this visualization"
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
