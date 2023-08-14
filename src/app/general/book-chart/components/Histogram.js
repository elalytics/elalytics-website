import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function generateRanges(maxNumber, segments) {
  let ranges = [];
  let segmentSize = Math.ceil(maxNumber / segments);

  for (let i = 0; i < segments; i++) {
    let start = i * segmentSize + 1;
    let end = (i + 1) * segmentSize;

    // Adjust for last segment if it goes beyond maxNumber
    if (end > maxNumber) {
      end = maxNumber;
    }

    ranges.push(`${start}-${end}`);
  }

  return ranges;
}

export default function Histogram({ maxCount, requiredSegments, type }) {
  const data = generateRanges(maxCount, requiredSegments);
  const chartRef = useRef();
  const xAxis = (g) =>
    g
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).tickSizeOuter(0))
      .attr("text-anchor", "middle")
      .style("font-size", "Large");

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    const parent = svg.node().parentNode;
    const margin = { top: 0, right: 40, bottom: 60, left: 40 };
    const width = parent.offsetWidth;
    const height = parent.offsetHeight < 600 ? 600 : parent.offsetHeight;

    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d))
      .range([margin.left, width - margin.right]);

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(xScale).tickSizeOuter(0))
        .attr("text-anchor", "middle")
        .style("font-size", "Large");

    svg.attr("viewBox", [0, 0, width, height]).attr("stroke-width", 2);

    const binHeight = height - margin.bottom;

    // Remove existing rectangles (if any)
    svg.selectAll("rect").remove();

    // Update pattern: Modify attributes of existing rectangles
    let rects = svg.selectAll("rect").data(data);
    rects
      .attr("x", xScale)
      .attr("y", 1)
      .attr("width", xScale.bandwidth())
      .attr("height", binHeight - 1)
      .attr("stroke", "#c7c7c7")
      .attr("fill", "white");

    // Enter pattern: Add rectangles for new data items
    rects
      .enter()
      .append("rect")
      .attr("x", xScale)
      .attr("y", 1)
      .attr("width", xScale.bandwidth())
      .attr("height", binHeight - 1)
      .attr("stroke", "#c7c7c7")
      .attr("fill", "white");

    // Exit pattern: Remove rectangles for data items that no longer exist
    rects.exit().remove();

    // X-Axis
    svg.selectAll("g").remove(); // Remove existing axes
    const gx = svg.append("g").call(xAxis);

    // Adding x-axis label
    gx.append("text")
      .attr("class", "x-label")
      .attr("x", width / 2)
      .attr("y", 45)
      .attr("text-anchor", "middle")
      .style("font-size", "Large")
      .attr("fill", "currentColor")
      .text(type);
  }, [data]);

  return (
    <div>
      <svg ref={chartRef}></svg>
    </div>
  );
}
