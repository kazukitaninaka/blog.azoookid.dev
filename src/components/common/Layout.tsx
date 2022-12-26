import Link from "next/link";
import * as styles from "./Layout.css";

export default function Layout({ children }) {
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.linkContainer}>
          <Link href="/">blog.azoookid.dev</Link>
        </div>
      </header>
      <main className={styles.container}>{children}</main>
    </div>
  );
}
