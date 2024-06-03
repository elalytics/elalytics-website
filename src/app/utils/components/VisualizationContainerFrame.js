"use client";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
const VisualizationContainerFrame = ({
  textName,
  visualizationName,
  description,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="overflow-x-hidden bg-gray-100">
      <div className="my-8 text-center max-w-3xl m-auto">
        <span className="px-4 py-1 bg-stone-dark rounded text-white inline-block mb-1 text-sm font-bold">
          {textName}
        </span>
        <h1 className="text-3xl font-bold ">
          {visualizationName}{" "}
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
          <div className="text-left p-2 mb-4 bg-white">{description}</div>
        )}
      </div>

      {children}
    </div>
  );
};

export default VisualizationContainerFrame;
