import Link from "next/link";

export default function ArticleCard({ title, createdAt, id }) {
  return (
    <div style={{ margin: "20px" }}>
      <Link href={`article/${id}`} passHref>
        <h1
          style={{
            fontSize: "1.5rem",
            textDecorationLine: "underline",
            cursor: "pointer",
            marginBottom: "10px",
          }}
        >
          {title}
        </h1>
      </Link>
      <div>{createdAt}公開</div>
    </div>
  );
}
