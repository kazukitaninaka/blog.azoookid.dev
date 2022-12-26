import Tags from "../common/Tags";
import { Tag, Block as TBlock } from "../../types";
import * as styles from "./Article.css";
import Block from "./Block";

type Props = {
  articleInfo: {
    title: string;
    createdAt: string;
    tags: Tag[];
  };
  blocks: TBlock[];
};

const Article = ({ articleInfo, blocks }: Props) => {
  return (
    <>
      <h1 className={styles.title}>{articleInfo.title}</h1>
      <p className={styles.publishedAt}>{articleInfo.createdAt}公開</p>
      <Tags tags={articleInfo.tags} />
      {blocks.map((block) => {
        return <Block key={block.id} block={block} />;
      })}
    </>
  );
};

export default Article;
