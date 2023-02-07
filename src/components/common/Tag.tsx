import Image from "next/image";
import Link from "next/link";
import * as styles from "./Tag.css";

type Props = {
  tag: string;
};

// MEMO: Tagsページの実装ができたらコメントアウトを外す
const Tag: React.VFC<Props> = ({ tag }) => {
  return (
    // <Link href={`/tags/${tag.name}`} key={tag.id}>
    //   <a>
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <Image src="/icons/tag-solid.svg" alt="tag icon" fill />
      </div>
      <span>{tag}</span>
    </div>
    //   </a>
    // </Link>
  );
};

export default Tag;
