import { NextPage } from "next";
import Link from "next/link";

type Props = {
  title: string;
  createdAt: string;
  id: string;
};

export default function ArticleCard({ title, createdAt, id }): NextPage<Props> {
  return (
    <div style={{ margin: "20px" }}>
      <Link href={`article/${id}`}>
        <div
          style={{
            fontSize: "1.5rem",
            textDecorationLine: "underline",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          {title}
        </div>
      </Link>
      <div>{createdAt}公開</div>
    </div>
  );
}
