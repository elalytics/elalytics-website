import Image from "next/image";

export default function App() {
  return (
    <div className="max-w-5xl m-auto">
      <h1 className="text-2xl text-center my-4">
        Subject-verb pairs
      </h1>
      <Image
        src="/imgs/staticVis/voyage/vis_3.jpg"
        alt="HSubject-verb pairs"
        width={500} // or any other size you need
        height={300} // adjust as necessary
      />
    </div>
  );
}
