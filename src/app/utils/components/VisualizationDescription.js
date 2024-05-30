"use client";
import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const VisualizationDescription = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <span>
      <span data-tooltip-id="info">
        <FontAwesomeIcon
          className="text-black-50 hover:text-black-80 px-1 cursor-help"
          icon={faInfoCircle}
        />
      </span>
      <Tooltip id="info" variant="light" clickable>
        <div className="max-w-2xl text-base font-normal text-left">
          {children}
        </div>
      </Tooltip>
    </span>
  );
};

export default VisualizationDescription;
