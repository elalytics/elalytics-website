export default function DataDisplay({ data }) {
  return (
    <div className="p-2 rounded-2xl bg-slate-100">
      <pre className="p-4 max-h-[300px] overflow-y-scroll custom-scrollbar">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
