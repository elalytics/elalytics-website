import Image from "next/image";

export default function App() {
  return (
    <div className="max-w-5xl m-auto">
      <h1 className="text-2xl text-center my-4">
        Words describing characters
      </h1>
      <Image
        src="/imgs/staticVis/voyage/vis_2.jpg"
        alt="How much do characters say?"
        width={500} // or any other size you need
        height={300} // adjust as necessary
      />
    </div>
  );
}
