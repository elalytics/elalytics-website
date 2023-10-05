import React, { useEffect, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
  WORD: "word",
};

function backgroundColorSelect(category, currentBucket, checkBucket) {
  if (checkBucket) {
    return currentBucket === category ? "bg-green-300" : "bg-red-300";
  } else {
    return "bg-stone";
  }
}

function WordOption({
  text,
  category,
  currentBucket,
  moveToBucket,
  checkBucket,
}) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.WORD,
    item: { text, category, currentBucket },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (item && dropResult) {
        moveToBucket(item.text, item.currentBucket, dropResult.name);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`${backgroundColorSelect(
        category,
        currentBucket,
        checkBucket
      )} px-4 py-2 m-1 h-10 rounded cursor-move flex-shrink-0 flex-grow-0`}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {text}
    </div>
  );
}

function getUniqueCategories(arr) {
  return arr.reduce((acc, item) => {
    if (!acc["All Words"]) {
      acc["All Words"] = [...arr];
    }
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    return acc;
  }, {});
}

function Bucket({ name, words, acceptWord, checkBucketStatus, className }) {
  const [, drop] = useDrop({
    accept: ItemTypes.WORD,
    drop: () => ({ name }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div className={className}>
      <h1 className="text-xl font-bold">{name}</h1>
      <div
        className="flex flex-wrap content-start min-h-[200px] border-2 border-stone bg-white rounded-md p-1"
        ref={drop}
      >
        {words.map((word) => (
          <WordOption
            key={word.text}
            text={word.text}
            category={word.category}
            currentBucket={name}
            checkBucket={checkBucketStatus}
            moveToBucket={acceptWord}
          />
        ))}
      </div>
    </div>
  );
}

const Categorize = ({ data }) => {
  const [categoryBuckets, setCategoryBuckets] = useState(
    getUniqueCategories(data)
  );
  const [checkWordStatus, setCheckWordStatus] = useState(false);

  useEffect(() => {
    categoryBuckets["All Words"].length === 0
      ? setCheckWordStatus(true)
      : setCheckWordStatus(false);
  }, [categoryBuckets]);

  const moveToBucket = (word, currentCategory, newCategory) => {
    function move(data, text, sourceKey, destinationKey) {
      // Clone original data to avoid side-effects
      let clonedData = JSON.parse(JSON.stringify(data));

      // find the object in source key array
      let foundIndex = clonedData[sourceKey].findIndex(
        (item) => item.text === text
      );

      if (foundIndex >= 0) {
        // if object found
        // move object from source key array to destination key array
        let foundItem = clonedData[sourceKey][foundIndex];
        clonedData[sourceKey].splice(foundIndex, 1); // remove object from source key array
        clonedData[destinationKey].push(foundItem); // add object to destination key array
      }

      return clonedData;
    }

    setCategoryBuckets(
      move(categoryBuckets, word, currentCategory, newCategory)
    );
  };

  function getBucketWidth() {
    const bucketCount = Object.keys(categoryBuckets).length;
    if (bucketCount > 3) {
      return "w-full sm:w-1/2 md:w-1/2 lg:w-1/3";
    } else if (bucketCount === 3) {
      return "w-full sm:w-1/2 md:w-1/2";
    } else {
      return "w-full";
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Bucket
        name="All Words"
        words={categoryBuckets["All Words"]}
        acceptWord={moveToBucket}
        checkBucketStatus={false}
        className="w-full p-2"
      />
      <div className="flex flex-wrap justify-between w-full">
        {Object.keys(categoryBuckets).map((key) => {
          return key === "All Words" ? null : (
            <Bucket
              key={key.toString()}
              name={key}
              words={categoryBuckets[key]}
              checkBucketStatus={checkWordStatus}
              acceptWord={moveToBucket}
              className={`${getBucketWidth()} p-2`}
            />
          );
        })}
      </div>
    </DndProvider>
  );
};

export default Categorize;
