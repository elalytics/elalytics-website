import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import d3Cloud from "d3-cloud";
import { Tooltip } from "react-tooltip";

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

const WordCloudDraggable = ({ data, wordSizeMultiplier, scaleType }) => {
  const [tooltip, showTooltip] = useState(true);

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
  }, []);

  const drawWordCloud = () => {
    const svg = d3.select(svgRef.current);
    const parent = svg.node().parentNode;
    const width = parent.offsetWidth;
    const height = parent.offsetHeight < 500 ? 500 : parent.offsetHeight;

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
          return `<div><p style="font-size:1.5em; font-weight: 600;">${d.text}</p><p>Category: ${d.category}</p><p>Value: ${d.value}</p></div>`;
        })
        .text(function (d) {
          return d.text;
        });
      var drag = d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);

      text.call(drag);
    }
  };
  const drawLegend = () => {
    // Append the div for the legend
    const legendDiv = d3
      .select(svgRef.current.parentNode) // select the parent node of the SVG.
      .append("div")
      .attr("class", "legend flex justify-center flex-wrap py-4 bg-stone-200"); // apply a class for styling.

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
    <div>
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
  );
};

export default WordCloudDraggable;
