export default function Layout({ children }) {
  return (
    <div>
      <h1>My Theme</h1>
      <div style={{ border: "1px solid" }}>{children}</div>
    </div>
  );
}
