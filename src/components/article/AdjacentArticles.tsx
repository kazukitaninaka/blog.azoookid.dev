import Link from "next/link";
import React from "react";
import { Article } from "../../types";
import * as styles from "./AdjacentArticles.css";

type Props = {
  nextArticle: Article | null;
  prevArticle: Article | null;
};
const path = "/article";
const AdjacentArticles: React.FC<Props> = ({ nextArticle, prevArticle }) => {
  return (
    <div className={styles.container}>
      {nextArticle && (
        <Link
          className={styles.nextContainer}
          href={`${path}/${nextArticle.slug}`}
        >
          {"<< "}
          {nextArticle.title}
        </Link>
      )}
      {prevArticle && (
        <Link
          className={styles.prevContainer}
          href={`${path}/${prevArticle.slug}`}
        >
          {prevArticle.title}
          {" >>"}
        </Link>
      )}
    </div>
  );
};

export default AdjacentArticles;
