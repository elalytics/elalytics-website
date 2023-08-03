"use client";

import Categorize from "./component/Categorize";

export default function Home() {
  const data = [
    { text: "raven", category: "Edgar Allen Poe" },
    { text: "horror", category: "Edgar Allen Poe" },
    { text: "night", category: "Edgar Allen Poe" },
    { text: "heart", category: "Edgar Allen Poe" },
    { text: "soul", category: "Edgar Allen Poe" },
    { text: "love", category: "Edgar Allen Poe" },
    { text: "dream", category: "Edgar Allen Poe" },
    { text: "terror", category: "Edgar Allen Poe" },
    { text: "madness", category: "Edgar Allen Poe" },
    { text: "darkness", category: "Edgar Allen Poe" },
    { text: "village", category: "Shirley Jackson" },
    { text: "house", category: "Shirley Jackson" },
    { text: "lottery", category: "Shirley Jackson" },
    { text: "stone", category: "Shirley Jackson" },
    { text: "tradition", category: "Shirley Jackson" },
    { text: "people", category: "Shirley Jackson" },
    { text: "family", category: "Shirley Jackson" },
    { text: "black", category: "Shirley Jackson" },
    { text: "town", category: "Shirley Jackson" },
    { text: "ritual", category: "Shirley Jackson" },
  ];
  return (
    <main>
      <div className="h-screen overflow-x-hidden bg-gray-100">
        <div className="my-8 text-center max-w-3xl m-auto">
          <h1 className="text-3xl font-bold ">
            Identifying Author&apos;s Style
          </h1>
          <p>
            Drag the words to corresponding author&apos;s box to categorize them
            based on their style. After categorizing all the words, you will be
            able to see how many words you got right.
          </p>
        </div>
        <div className="h-full max-w-5xl m-auto">
          <Categorize data={data} />
        </div>
      </div>
    </main>
  );
}
