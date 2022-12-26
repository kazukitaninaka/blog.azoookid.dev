import Link from "next/link";
import * as styles from "./Layout.css";

export default function Layout({ children }) {
  return (
    <div>
      <header style={{ borderBottom: "1px solid #000" }}>
        <div style={{ margin: "20px", fontSize: "2rem", fontWeight: "bold" }}>
          <Link href="/">blog.azoookid.dev</Link>
        </div>
      </header>
      <main className={styles.container}>{children}</main>
    </div>
  );
}
