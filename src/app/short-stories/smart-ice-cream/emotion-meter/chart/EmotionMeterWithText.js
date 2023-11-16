"use client";

import React, { useEffect, useRef, useState } from "react";
import EmotionsLineChart from "./EmotionsLineChart";

const EmotionMeterWithText = (props) => {
  const [paragraphIdInFocus, setParagraphIdInFocus] = useState(0);

  function pointOnClick(data) {
    console.log(data);
    setParagraphIdInFocus(data.index - 1);
  }
  return (
    <div className="m-auto flex flex-row gap-2 my-4">
      <div className="w-3/5">
        <EmotionsLineChart data={props.data} pointOnClick={pointOnClick} />
      </div>
      <div className="w-2/5 h-[400px] overflow-auto">
        <TextContainer
          data={props.data}
          paragraphIdInFocus={paragraphIdInFocus}
        />
      </div>
    </div>
  );
};

export default EmotionMeterWithText;

const TextContainer = ({ data, paragraphIdInFocus }) => {
  const refs = useRef(data.map(() => React.createRef()));

  useEffect(() => {
    console.log(paragraphIdInFocus);
    if (
      paragraphIdInFocus !== null &&
      paragraphIdInFocus !== undefined &&
      refs.current[paragraphIdInFocus] &&
      refs.current[paragraphIdInFocus].current
    ) {
      refs.current[paragraphIdInFocus].current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [paragraphIdInFocus]);

  return (
    <>
      <div>
        {data.map((item, i) => {
          return (
            <div key={i} id={i} ref={refs.current[i]} className="py-2">
              <p>Paragraph {i + 1}</p>
              <p>{item.text}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};
