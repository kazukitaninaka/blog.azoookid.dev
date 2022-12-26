import Tag from "./Tag";
import { Tag as TagType } from "../../types";
import * as styles from "./Tags.css";

type Props = {
  tags: TagType[];
};

const Tags = ({ tags }: Props) => {
  return (
    <div className={styles.container}>
      {tags.map((tag) => {
        return <Tag tag={tag} key={tag.id} />;
      })}
    </div>
  );
};

export default Tags;
