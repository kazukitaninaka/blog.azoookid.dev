export default function ArticleCard({ title, createdAt, id }) {
  return (
    <div style={{ margin: "20px" }}>
      <a href={`article/${id}`}>
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
      </a>
      <div>{createdAt}公開</div>
    </div>
  );
}
