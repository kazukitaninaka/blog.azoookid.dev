import Link from "next/link";
import * as styles from "./Layout.css";

export default function Layout({ children }) {
  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.linkContainer}>
          <Link href="/">blog.azoookid.dev</Link>
        </div>
      </header>
      <main className={styles.mainContainer}>{children}</main>
      <footer className={styles.footer}>
        <div>This website is built with Next.js</div>
      </footer>
    </div>
  );
}
