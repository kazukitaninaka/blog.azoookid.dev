import Tag from "./Tag";
import { Tag as TagType } from "../types";

type Props = {
  tags: TagType[];
};

const Tags = ({ tags }: Props) => {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "3px" }}>
      {tags.map((tag) => {
        return <Tag tag={tag} key={tag.id} />;
      })}
    </div>
  );
};

export default Tags;
