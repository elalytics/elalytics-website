"use client";

import data from "./data/emotions.json";
import HeatMapPage from "./components/HeatMap";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import "../../../utils/styles/customCarouselStyle.css";

export default function App() {
  return (
    <main>
      <div className=" overflow-x-hidden bg-gray-100">
        <div className="my-8 text-center">
          <span className="px-4 py-1 bg-stone-dark rounded text-white inline-block mb-1 text-sm font-bold">
            The Elevator
          </span>
          <h1 className="text-3xl font-bold ">Emotions Chart</h1>
        </div>
        <div className="h-full max-w-5xl m-auto">
          <Carousel showArrows={true}>
            <div>
              <p className="text-xl">What do you notice? What do you wonder?</p>
              <HeatMapPage
                data={data}
                xLabel={false}
                xLabelTitle="Lines"
                yLabel={false}
                yLabelTitle=""
                showTooltip={false}
              />
            </div>
            <div>
              <p className="text-xl">What does the colors represent?</p>
              <HeatMapPage
                data={data}
                xLabel={false}
                xLabelTitle="Lines"
                yLabel={true}
                showOnlyYLabels={["Shame", "Fear"]}
                yLabelTitle=""
                showTooltip={false}
              />
            </div>
            <div>
              <p className="text-xl">What are these different emotions?</p>
              <HeatMapPage
                data={data}
                xLabel={false}
                xLabelTitle="Lines"
                yLabel={true}
                yLabelTitle=""
                showTooltip={false}
              />
            </div>
            <div>
              <p className="text-xl">What does the x-axis convey?</p>
              <HeatMapPage
                data={data}
                xLabel={true}
                xLabelTitle="Lines"
                yLabel={true}
                yLabelTitle=""
                showTooltip={false}
              />
            </div>
            <div>
              <p className="text-xl">Hover to explore!</p>
              <HeatMapPage
                data={data}
                xLabel={true}
                xLabelTitle="Lines"
                yLabel={true}
                yLabelTitle=""
                showTooltip={true}
              />
            </div>
          </Carousel>
        </div>
      </div>
    </main>
  );
}
