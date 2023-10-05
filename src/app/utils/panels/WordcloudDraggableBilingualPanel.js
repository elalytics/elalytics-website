"use client";

import WordCloudDraggableDualLang from "@/app/utils/charts/WordCloudDraggableAndBilingual";
import { filterWordCloudData } from "@/app/utils/functions/general-functions";
import PropTypes from "prop-types";

export default function WordCloudDraggableBilingualPanel({
  wordsToRemove,
  categoriesToRemove,
  data,
  pageTitle,
  bookName,
  wordSizeMultiplier,
  scaleType,
}) {
  const wordsToRemoveData = wordsToRemove || [];
  const categoriesToRemoveData = categoriesToRemove || [];
  return (
    <div>
      <div className="h-screen overflow-x-hidden bg-gray-100">
        <div className="my-8 text-center">
          <span className="px-4 py-1 bg-stone-dark rounded text-white inline-block mb-1 text-sm font-bold">
            {bookName || "Book"}
          </span>
          <h1 className="text-3xl font-bold ">{pageTitle || "Word Cloud"}</h1>
          <p>
            Drag the words to different positions and see if you can make any
            new insights!
          </p>
        </div>

        <div className="w-screen">
          <div className="px-10">
            <WordCloudDraggableDualLang
              data={filterWordCloudData(
                data,
                wordsToRemoveData,
                categoriesToRemoveData
              )}
              wordSizeMultiplier={wordSizeMultiplier || 1}
              scaleType={scaleType || "linear"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

WordCloudDraggableBilingualPanel.propTypes = {
  data: PropTypes.array.isRequired,
  pageTitle: PropTypes.string,
  bookName: PropTypes.string,
  wordSizeMultiplier: PropTypes.number,
  scaleType: PropTypes.string,
  wordsToRemove: PropTypes.array,
  categoriesToRemove: PropTypes.array,
};
