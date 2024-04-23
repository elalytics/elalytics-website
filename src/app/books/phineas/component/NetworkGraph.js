"use client";

import React, { useEffect, useRef } from "react";
import { Graph } from "graphology";
import Sigma from "sigma";
import data from "@/app/data-processing/src/book_projects/phineas_demystifying/script/formatted_output.json";
import forceAtlas2 from "graphology-layout-forceatlas2";
import FA2Layout from "graphology-layout-forceatlas2/worker";

const NetworkGraph = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Create a graphology graph

    // Function to generate a random color
    function getRandomColor() {
      const letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    // Object to store group-color mapping
    const groupColors = {};

    const graph = new Graph();
    // Add nodes from data
    data.nodes.forEach((node, index) => {
      if (!groupColors[node.group]) {
        groupColors[node.group] = getRandomColor();
      }
      graph.addNode(node.id, {
        label: node.id,
        size: 5, // or any other logic for size
        x: Math.random(), // or any other logic for x
        y: Math.random(), // or any other logic for y
        color: groupColors[node.group],
      });
    });

    // Add edges from data
    data.links.forEach((link) => {
      graph.addEdge(link.source, link.target, {
        // size: link.value,
        color: "lightGrey", // or any other logic for color
      });
    });
    // Graphology provides a easy to use implementation of Force Atlas 2 in a web worker
    const sensibleSettings = forceAtlas2.inferSettings(graph);
    const fa2Layout = new FA2Layout(graph, {
      settings: sensibleSettings,
    });

    // Instantiate sigma.js and render the graph
    const sigmaInstance = new Sigma(graph, containerRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: "100%", height: "600px", background: "white" }}
    ></div>
  );
};

export default NetworkGraph;
