import Link from "next/link";
import * as styles from "./ArticleCard.css";

export default function ArticleCard({ title, createdAt, id }) {
  return (
    <div className={styles.container}>
      <Link href={`article/${id}`} passHref>
        <div className={styles.title}>{title}</div>
      </Link>
      <div>{createdAt}公開</div>
    </div>
  );
}
