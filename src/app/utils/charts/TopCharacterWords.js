import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare } from "@fortawesome/free-solid-svg-icons";
const colorMap = {
  poss: "#31BB31",
  agent_v: "#4B0092",
  patient_v: "#D41159",
};

export default function TopCharacterWords({ data }) {
  const chartRef = useRef();

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    const parent = svg.node().parentNode;
    const margin = { top: 60, right: 40, bottom: 10, left: 40 };
    const width = parent.offsetWidth;
    const height = parent.offsetHeight < 500 ? 500 : parent.offsetHeight;

    svg.attr("viewBox", [0, 0, width, height]).attr("stroke-width", 2);

    const x = d3
      .scaleBand()
      .domain(data.map((d) => d.character))
      .range([margin.left, width - margin.right])
      .padding(1);

    const xAxis = (g) =>
      g
        .attr("transform", `translate(0,30)`)
        .call(d3.axisTop(x).tickSizeOuter(0))
        .attr("text-anchor", "middle")
        .style("font-size", "Large");

    const y = d3
      .scaleLinear()
      .domain(d3.extent(data.map((d) => d.rank)))
      .range([height - margin.bottom, margin.top]);

    const gx = svg.append("g").call(xAxis);

    function handleMouseOver(d, i) {
      const that = d3.select(this);

      that.attr("font-weight", "900");
    } // handleMouseOver()

    function handleMouseOut(d, i) {
      const that = d3.select(this);

      that.attr("font-weight", "500");
    } // handleMouseOut()

    function dragstarted(d) {
      d3.select(this).raise().classed("word-hovered", true);
    }

    function dragged(d) {
      d3.select(this).attr("x", d.x).attr("y", d.y);
    }

    function dragended(d) {
      d3.select(this).classed("word-hovered", false);
    }

    const drag = d3
      .drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

    svg
      .append("g")
      .selectAll("text")
      .data(data)
      .join("text")
      .attr("x", (d) => x(d.character))
      .attr("y", (d) => y(d.rank))
      .attr("font-weight", "500")
      .attr("cursor", "move")
      .style("fill", (d) => `${colorMap[d.type]}`)
      .text((d) => d.word)
      .attr("text-anchor", "middle")
      .call(drag)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);
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
            className={`text-[#D41159] relative top-[4px] mr-1`}
          />
          <p>Patient Verb</p>
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
