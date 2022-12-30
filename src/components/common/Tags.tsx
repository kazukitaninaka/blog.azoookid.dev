import Tag from "./Tag";
import * as styles from "./Tags.css";

type Props = {
  tags: string[];
};

const Tags: React.VFC<Props> = ({ tags }) => {
  return (
    <div className={styles.container}>
      {tags.map((tag) => {
        return <Tag tag={tag} key={tag} />;
      })}
    </div>
  );
};

export default Tags;
