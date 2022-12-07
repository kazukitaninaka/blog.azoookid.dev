import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      <header style={{ borderBottom: "1px solid #000" }}>
        <div style={{ margin: "20px", fontSize: "2rem", fontWeight: "bold" }}>
          <Link href="/">blog.azoookid.dev</Link>
        </div>
      </header>
      <main style={{ maxWidth: "750px", margin: "auto" }}>{children}</main>
    </div>
  );
}
