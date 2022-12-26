import Image from "next/image";
import Link from "next/link";
import { Tag } from "../../types";
import * as styles from "./Tag.css";

type Props = {
  tag: Tag;
};

// MEMO: Tagsページの実装ができたらコメントアウトを外す
const Tag = ({ tag }: Props) => {
  return (
    // <Link href={`/tags/${tag.name}`} key={tag.id}>
    //   <a>
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image
          src="/icons/tag-solid.svg"
          alt="tag icon"
          width={5}
          layout="fill"
        />
      </div>
      <span>{tag.name}</span>
    </div>
    //   </a>
    // </Link>
  );
};

export default Tag;
