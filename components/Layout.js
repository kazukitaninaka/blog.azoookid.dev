export default function Layout({ children }) {
  return (
    <div>
      <div style={{ borderBottom: "1px solid #000" }}>
        <div style={{ margin: "20px", fontSize: "2rem", fontWeight: "bold" }}>
          <a href={`/`}>Sample Blog</a>
        </div>
      </div>
      <div style={{ maxWidth: "750px", margin: "auto" }}>{children}</div>
    </div>
  );
}
