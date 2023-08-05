import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
const colorMap = {
  poss: "#31BB31",
  agent: "#4B0092",
  patient_v: "#D41159",
};

export default function TopCharacterWordsBoy({ data }) {
  const chartRef = useRef();

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    const parent = svg.node().parentNode;
    const margin = { top: 70, right: 40, bottom: 10, left: 40 };
    const width = parent.offsetWidth;
    const height = parent.offsetHeight < 500 ? 500 : parent.offsetHeight;

    svg.attr("viewBox", [0, 0, width, height]).attr("stroke-width", 2);
    const sortedData = [...data].sort((a, b) => a.rank - b.rank);
    console.log(sortedData);

    const x = d3
      .scaleBand()
      .domain(sortedData.map((d) => d.character))
      .range([margin.left, width - margin.right])
      .padding(1);

    console.log("X:", x("I (Boy)"));

    console.log("Recomputed bandwidth:", x.bandwidth());

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,30)`)
        .call(d3.axisTop(x).tickSizeOuter(0))
        .attr("text-anchor", "middle")
        .style("font-size", "Large");

    const y = d3
      .scaleLinear()
      .domain(d3.extent(data.map((d) => d.rank)))
      .range([margin.top, height - margin.bottom]);

    const maxCount = d3.max(sortedData, (d) => d.count);

    const gx = svg.append("g").call(xAxis);

    svg
      .append("g")
      .selectAll("rect")
      .data(sortedData)
      .join("rect")
      .attr("x", (d) => x(d.character)) // centering the rectangle based on its relative width
      .attr("y", (d) => y(d.rank) + 5)
      .attr("width", (d) => (d.count / maxCount) * 40)
      .attr("height", 8) // Adjust the height if necessary
      .attr("fill", "black");

    svg
      .append("g")
      .selectAll("text")
      .data(sortedData)
      .join("text")
      .attr("x", (d) => x(d.character))
      .attr("y", (d) => y(d.rank))
      .attr("font-weight", "500")
      .style("fill", (d) => `${colorMap[d.type]}`)
      .text((d) => d.word + " (" + d.count + ")")
      .attr("text-anchor", "middle");
  }, [data]);

  return (
    <div>
      <div className="flex justify-center">
        <div className="flex mx-3 mb-4">
          <FontAwesomeIcon
            icon={faSquare}
            className={`text-[#4B0092] relative top-[4px] mr-1`}
          />
          <p>Agent Verb</p>
        </div>
        <div className="flex mx-3">
          <FontAwesomeIcon
            icon={faSquare}
            className={`text-[#31BB31] relative top-[4px] mr-1`}
          />
          <p>Possession</p>
        </div>
      </div>
      <svg ref={chartRef}></svg>
    </div>
  );
}
