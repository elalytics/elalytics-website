export default function App() {
  return (
    <div className="max-w-5xl m-auto">
      <h1 className="text-2xl text-center my-4">
        This visualization shows adjectives and verbs, adjacent to Victor and creature, where circles represent words, and links represent their co-occurrence.
      </h1>
      <iframe
        src="https://cosmograph.app/run/?data=https://raw.githubusercontent.com/KGeorgii/elalytics_data/refs/heads/main/related_2.csv&source=character&target=related&gravity=0.25&repulsion=1&repulsionTheta=1.15&linkSpring=1&linkDistance=10&friction=0.85&renderLabels=true&renderHoveredLabel=true&renderLinks=true&curvedLinks=true&nodeSizeScale=1&linkWidthScale=1&linkArrowsSizeScale=1&nodeSize=size-total%20links&nodeColor=color-total%20links&linkWidth=width-number%20of%20data%20records&linkColor=color-default&"
        title="Visualization of character mentions"
        width="1000" // or any other size you need
        height="800" // adjust as necessary
        style={{ border: "none" }} // optional styles
      ></iframe>
    </div>
  );
}