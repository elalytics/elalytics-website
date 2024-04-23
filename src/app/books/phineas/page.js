import NetworkGraph from "./component/NetworkGraph";

export const metadata = {
  title: `Phineas | Elalytics`,
};

export default function App() {
  return (
    <div className="max-w-5xl m-auto">
      <h1 className="text-2xl text-center my-4">Phineas Demystified</h1>
      <NetworkGraph />
    </div>
  );
}
