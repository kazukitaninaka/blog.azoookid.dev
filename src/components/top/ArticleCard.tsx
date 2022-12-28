import Link from "next/link";
import * as styles from "./ArticleCard.css";
import { Article } from "../../types";
import React from "react";
import Thumbnail from "./Thumbnail";

type Props = {
  article: Article;
};

const ArticleCard: React.VFC<Props> = ({ article }) => {
  const { id, title, createdAt } = article;
  return (
    <Link href={`article/${id}`}>
      <a>
        <div className={styles.container}>
          <Thumbnail src={article.thumbnail} />
          <div>
            <div className={styles.title}>{title}</div>
            <div>{createdAt}公開</div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ArticleCard;
