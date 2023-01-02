import Link from "next/link";
import * as styles from "./ArticleCard.css";
import React from "react";
import Thumbnail from "./Thumbnail";
import { Article } from "../../types";

type Props = {
  article: Article;
};

const ArticleCard: React.VFC<Props> = ({ article }) => {
  const { slug, title, createdAt } = article;
  return (
    <Link href={`article/${slug}`}>
      <a>
        <div className={styles.container}>
          <Thumbnail src={article.thumbnail} />
          <div>
            <div className={styles.title}>{title}</div>
            <div>{createdAt}</div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ArticleCard;
