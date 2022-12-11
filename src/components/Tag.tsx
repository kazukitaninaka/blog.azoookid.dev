import Image from "next/image";
import Link from "next/link";
import { Tag } from "../types";

type Props = {
  tag: Tag;
};

// MEMO: Tagsページの実装ができたらコメントアウトを外す
const Tag = ({ tag }: Props) => {
  return (
    // <Link href={`/tags/${tag.name}`} key={tag.id}>
    //   <a>
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyItems: "center",
        border: "1px solid #000",
        borderRadius: "3px",
        padding: "2px",
        // height: "100%",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "15px",
          height: "15px",
          marginRight: "2px",
        }}
      >
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
