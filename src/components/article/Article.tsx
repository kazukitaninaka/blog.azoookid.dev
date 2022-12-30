import Tags from "../common/Tags";
import * as styles from "./Article.css";

type Props = {
  article: {
    title: string;
    createdAt: string;
    tags: string[];
    thumbnail: string;
    content: string;
    slug: string;
  };
};

const Article = ({ article }: Props) => {
  return (
    <article>
      <h1 className={styles.title}>{article.title}</h1>
      <p className={styles.publishedAt}>{article.createdAt}公開</p>
      <Tags tags={article.tags} />
      <div
        className={styles.markdownStyles}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </article>
  );
};

export default Article;
