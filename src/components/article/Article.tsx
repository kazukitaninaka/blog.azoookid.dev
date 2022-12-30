import Tags from "../common/Tags";
import * as styles from "./Article.css";
import ReactMarkdown from "react-markdown";
import Image from "next/image";

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

const components = {
  p: (paragraph: { children?: boolean; node?: any }) => {
    console.log(paragraph);
    const { node } = paragraph;

    if (node.children[0].tagName === "img") {
      const image = node.children[0];
      const metastring = image.properties.alt;
      const alt = metastring?.replace(/ *\{[^)]*\} */g, "");
      const isPriority = metastring?.toLowerCase().match("{priority}");
      const hasCaption = metastring?.toLowerCase().includes("{caption:");
      const caption = metastring?.match(/{caption: (.*?)}/)?.pop();

      return (
        <>
          <div className={styles.imgWrapper}>
            <Image
              src={image.properties.src}
              layout="fill"
              objectFit="contain"
              alt={alt}
              priority={isPriority}
            />
          </div>
          {hasCaption && (
            <div className={styles.caption} aria-label={caption}>
              {caption}
            </div>
          )}
        </>
      );
    }
    return <p>{paragraph.children}</p>;
  },
  ul: () => {
    return <ul className={styles.ul} />;
  },
  li: () => {
    return <ul className={styles.li} />;
  },
};

const Article = ({ article }: Props) => {
  return (
    <article>
      <h1 className={styles.title}>{article.title}</h1>
      <p className={styles.publishedAt}>{article.createdAt}公開</p>
      <Tags tags={article.tags} />
      <ReactMarkdown components={components}>{article.content}</ReactMarkdown>
    </article>
  );
};

export default Article;
