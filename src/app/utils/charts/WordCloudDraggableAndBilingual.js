"use client";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import d3Cloud from "d3-cloud";
import { Tooltip } from "react-tooltip";
import React from "react";
import PropTypes, { shape } from "prop-types";
import { filterWordCloudData } from "@/app/utils/functions/general-functions";

function findMaxMin(data) {
  var minimum = data.reduce(
    (min, p) => (p.value < min ? p.value : min),
    data[0].value
  );
  var maximum = data.reduce(
    (max, p) => (p.value > max ? p.value : max),
    data[0].value
  );

  return { max: maximum, min: minimum };
}

function selectWordScale(minMaxValues, type) {
  if (type === "linear") {
    const wordScaleLinear = d3
      .scaleLinear()
      .domain([minMaxValues.min, minMaxValues.max])
      .range([10, 100]);
    return wordScaleLinear;
  } else if (type === "log") {
    const wordScaleLog = d3
      .scaleLog()
      .domain([minMaxValues.min, minMaxValues.max])
      .range([10, 100]);
    return wordScaleLog;
  }
}

const ChartComponent = ({
  data,
  wordSizeMultiplier = 1,
  scaleType = "linear",
}) => {
  const [tooltip, showTooltip] = useState(true);
  const [chartDrawn, setChartDrawn] = useState(false);

  const minMax = findMaxMin(data);

  const wordScale = selectWordScale(
    minMax,
    scaleType === undefined ? "linear" : scaleType
  );

  // Categories in our dataset
  const categories = Array.from(new Set(data.map((item) => item.category)));

  // Create a color scale
  const colorScale = d3.scaleOrdinal(d3.schemeCategory10).domain(categories);

  const svgRef = useRef(null);

  useEffect(() => {
    drawWordCloud();
    drawLegend();
    setChartDrawn(true);
  }, [data]);

  // Function to trigger the dblclick event on all words
  const triggerDblClickOnAllWords = () => {
    const svgNode = svgRef.current;
    const textElements = svgNode.querySelectorAll("text");

    textElements.forEach((textElement) => {
      // Create a new event
      const event = new MouseEvent("dblclick", {
        bubbles: true,
        cancelable: true,
        view: window,
      });

      // Dispatch the event on the element
      textElement.dispatchEvent(event);
    });
  };

  const drawWordCloud = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();
    const parent = svg.node().parentNode;
    const width = parent.offsetWidth;
    const height = 400;

    svg
      .append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("fill", "white");

    const layout = d3Cloud()
      .size([width, height])
      .words(
        data.map((d) => ({
          text: d.word,
          translation: d.translation,
          size: wordScale(d.value) * wordSizeMultiplier,
          value: d.value,
          category: d.category,
        }))
      )
      .padding(5)
      .rotate(0)
      .fontSize((d) => d.size)
      .on("end", draw);

    layout.start();

    function dragstarted(event, d) {
      showTooltip(false);
      d3.select(this).raise().attr("strokewidth", 3);
    }

    function dragged(event, d) {
      d3.select(this).attr(
        "transform",
        "translate(" + [(d.x = event.x), (d.y = event.y)] + ")"
      );
    }

    function dragended(event, d) {
      showTooltip(true);
      d3.select(this).attr("strokewidth", 1);
    }

    function draw(words) {
      var g = svg
        .attr("width", layout.size()[0])
        .attr("height", layout.size()[1])
        .append("g")
        .attr(
          "transform",
          "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")"
        );

      var text = g
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", function (d) {
          return d.size + "px";
        })
        .style("fill", function (d) {
          // Find the original data item that corresponds to this word
          const originalDataItem = data.find((item) => item.word === d.text);

          // Apply the color scale to this data item's category
          return colorScale(originalDataItem.category);
        })
        .attr("text-anchor", "middle")
        .attr(
          "transform",
          (d) => "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")"
        )
        .attr("cursor", "pointer")
        .attr("data-tooltip-id", "word-info")
        .attr("data-tooltip-html", (d) => {
          return `<div><p style="font-size:1.5em; font-weight: 600;">${d.text}/${d.translation}</p><p>Category: ${d.category}</p><p>Count: ${d.value}</p></div>`;
        })
        .text(function (d) {
          return d.text;
        })
        .on("dblclick", function (d, i) {
          if (this.innerHTML === i.translation) {
            d3.select(this).text(i.text);
          } else {
            d3.select(this).text(i.translation);
          }
        });
      var drag = d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

      text.call(drag);

      // Run the simulation for a few iterations to let the words settle without overlapping
    }
  };
  const drawLegend = () => {
    // Append the div for the legend
    d3.select(svgRef.current.parentNode).select(".legend").remove();
    const legendDiv = d3
      .select(svgRef.current.parentNode) // select the parent node of the SVG.
      .append("div")
      .attr("class", "legend flex justify-center flex-wrap py-4 bg-gray-200"); // apply a class for styling.

    // Append an item in the legend for each category
    const legendItems = legendDiv
      .selectAll(".legend-item")
      .data(categories)
      .enter()
      .append("div")
      .attr("class", "legend-item flex align-center mx-2"); // apply a class for styling.

    // Append a color swatch for each item
    legendItems
      .append("div")
      .style("width", "20px")
      .style("height", "20px")
      .style("display", "inline-block")
      .style("background-color", function (d) {
        return colorScale(d);
      });

    // Append a label for each item
    legendItems
      .append("text")
      .text(function (d) {
        return d;
      })
      .style("display", "inline-block")
      .style("margin-left", "5px"); // give it some space from the color swatch.
  };

  return (
    <div className="rounded-2xl">
      {!chartDrawn && (
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Generating the chart... Please wait... This might take a bit!
          </p>
        </div>
      )}
      <div style={{ visibility: chartDrawn ? "visible" : "hidden" }}>
        <div className=" rounded-t-2xl text-center pt-4 py-2 bg-white">
          <button
            className="px-4 py-2 bg-blue-600 hover:bg-blue-800 rounded text-white inline-block text-sm font-bold"
            onClick={() => triggerDblClickOnAllWords()}
          >
            Translate All Words
          </button>
        </div>

        <svg ref={svgRef}></svg>
        {tooltip && (
          <Tooltip
            id="word-info"
            variant="light"
            opacity={0.9}
            style={{ fontSize: "0.8em" }}
          />
        )}
      </div>
    </div>
  );
};

const WordCloudDraggableAndBilingual = ({
  bookName,
  wordCloudTitle,
  data,
  wordSizeMultiplier,
  scaleType,
  wordsToRemove,
  categoriesToRemove,
  showNote = true,
  customNoteText,
  numberOfWords = null,
}) => {
  const wordsToRemoveData = wordsToRemove || [];
  const categoriesToRemoveData = categoriesToRemove || [];
  return (
    <div>
      <div className="text-center">
        <div className="my-4">
          {bookName && (
            <span className="px-4 py-1 bg-stone-dark rounded text-white inline-block mb-1 text-sm font-bold">
              {bookName || ""}
            </span>
          )}

          <h1 className="text-3xl font-bold ">{wordCloudTitle || ""}</h1>
        </div>

        {showNote && (
          <div className="my-2">
            <p>
              {customNoteText ||
                "Drag the words to different positions and see if you can make any new insights!"}
            </p>
          </div>
        )}
      </div>
      <div className="w-inherit">
        <ChartComponent
          data={filterWordCloudData(
            data,
            wordsToRemoveData,
            categoriesToRemoveData,
            numberOfWords
          )}
          wordSizeMultiplier={wordSizeMultiplier || 1}
          scaleType={scaleType || "linear"}
        />
      </div>
    </div>
  );
};

const WordCloudDraggableAndBilingualProps = {
  data: PropTypes.arrayOf(
    shape({
      word: PropTypes.string.isRequired,
      translation: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired,
    })
  ).isRequired,
  bookName: PropTypes.string,
  wordCloudTitle: PropTypes.string,
  wordsToRemove: PropTypes.arrayOf(PropTypes.string),
  categoriesToRemove: PropTypes.arrayOf(PropTypes.string),
  showNote: PropTypes.bool,
  customNoteText: PropTypes.string,
  wordSizeMultiplier: PropTypes.number,
  scaleType: PropTypes.oneOf(["linear", "log"]),
  numberOfWords: PropTypes.number,
};

WordCloudDraggableAndBilingual.propTypes = WordCloudDraggableAndBilingualProps;

export default WordCloudDraggableAndBilingual;
