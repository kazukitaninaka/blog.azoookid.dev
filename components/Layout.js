import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      <div style={{ borderBottom: "1px solid #000" }}>
        <div style={{ margin: "20px", fontSize: "2rem", fontWeight: "bold" }}>
          <Link href="/">Sample Blog</Link>
        </div>
      </div>
      <div style={{ maxWidth: "750px", margin: "auto" }}>{children}</div>
    </div>
  );
}
