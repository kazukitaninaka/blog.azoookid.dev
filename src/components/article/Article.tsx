import Tags from "../common/Tags";
import * as styles from "./Article.css";
import ReactMarkdown, { Components } from "react-markdown";
import Image from "next/image";
import { PropsWithChildren } from "react";
import {
  OrderedListProps,
  UnorderedListProps,
} from "react-markdown/lib/ast-to-react";
import remarkGfm from "remark-gfm";
import Link from "next/link";
import AdjacentArticles from "./AdjacentArticles";
import { Article } from "../../types";

type Props = {
  article: {
    title: string;
    createdAt: string;
    tags: string[];
    thumbnail: string;
    content: string;
    slug: string;
    nextArticle: Article | null;
    prevArticle: Article | null;
  };
};

const generateListValues = (
  ulOrOl: PropsWithChildren<UnorderedListProps | OrderedListProps>
) => {
  const listValues = ulOrOl.node.children
    .filter((li) => li.type === "element")
    .map((li) => {
      if (li.type === "element" && li.children[0].type === "text") {
        return li.children[0].value;
      }
    });
  return listValues;
};

const components: Components = {
  p: (paragraph) => {
    const { node } = paragraph;

    // imgタグをnext/imageに置き換える
    if (
      node.children[0].type === "element" &&
      node.children[0].tagName === "img"
    ) {
      const image = node.children[0];
      const metastring = image.properties.alt as string;
      const alt = metastring?.replace(/ *\{[^)]*\} */g, "");
      const isPriority = metastring?.toLowerCase().match("{priority}");
      const hasCaption = metastring?.toLowerCase().includes("{caption:");
      const caption = metastring?.match(/{caption: (.*?)}/)?.pop();

      return (
        <>
          <div className={styles.imgWrapper}>
            <Image
              src={image.properties.src as string}
              fill
              alt={alt}
              priority={!!isPriority}
              style={{
                objectFit: "contain",
              }}
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
  ul: (ul) => {
    const listValues = generateListValues(ul);

    return (
      <ul className={styles.listParent}>
        {listValues.map((value, i) => (
          <li key={`${value}-${i}`} className={styles.li}>
            {value}
          </li>
        ))}
      </ul>
    );
  },
  ol: (ol) => {
    const listValues = generateListValues(ol);

    return (
      <ol className={styles.listParent}>
        {listValues.map((value, i) => (
          <li key={`${value}-${i}`} className={styles.li}>
            {value}
          </li>
        ))}
      </ol>
    );
  },
  h2: (h2) => {
    return <h2 className={styles.h2}>{h2.children[0]}</h2>;
  },
  h3: (h3) => {
    return <h2 className={styles.h3}>{h3.children[0]}</h2>;
  },
  a: (a) => {
    return (
      <Link href={a.href} className={styles.a} target="_blank" rel="noreferrer">
        {a.children[0]}
      </Link>
    );
  },
};

const Article = ({ article }: Props) => {
  return (
    <article className={styles.article}>
      <h1 className={styles.title}>{article.title}</h1>
      <p className={styles.publishedAt}>{article.createdAt}</p>
      <Tags tags={article.tags} />
      <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
        {article.content}
      </ReactMarkdown>
      <AdjacentArticles
        prevArticle={article.prevArticle}
        nextArticle={article.nextArticle}
      />
    </article>
  );
};

export default Article;
