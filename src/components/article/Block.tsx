import React from "react";
import { Block as TBlock } from "../../types";
import Image from "next/image";
import * as styles from "./Block.css";

type Props = {
  block: TBlock;
};

const Block: React.FC<Props> = ({ block }) => {
  switch (block.type) {
    case "heading_2":
      return <h2 key={block.id}>## {block.text}</h2>;
    case "heading_3":
      return <h3 key={block.id}>### {block.text}</h3>;
    case "paragraph":
      return <p key={block.id}>{block.text}</p>;
    case "bulleted_list_item":
      return <p key={block.id}>・{block.text}</p>;
    case "image":
      return (
        <div className={styles.imageContainer}>
          <Image
            key={block.id}
            src={block.text}
            alt=""
            layout="fill"
            objectFit="contain"
          />
        </div>
      );
    default:
      null;
  }
};

export default Block;
