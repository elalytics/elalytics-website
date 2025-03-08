import Image from "next/image";

export default function App() {
  // Array of image numbers from 1 to 22
  const imageNumbers = Array.from({ length: 22 }, (_, i) => i + 1);
  
  return (
    <div className="max-w-5xl mx-auto px-4">
      <h1 className="text-2xl font-bold text-center my-6">
        Character mentions across the chapters
      </h1>
      
      <div className="grid grid-cols-2 gap-6">
        {imageNumbers.map((num) => (
          <div key={num} className="flex justify-center">
            <Image
              src={`/imgs/staticVis/mariposas/words_by_chapter/${num}.jpg`}
              alt={`Character mentions chapter ${num}`}
              width={500}
              height={300}
              className="rounded shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
}