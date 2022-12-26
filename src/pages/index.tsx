import { client } from "../notionClient";
import ArticleCard from "../components/top/ArticleCard";
import { convertDate } from "../utils";

const Home = ({ articles }) => {
  return (
    <>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          title={article.title}
          createdAt={article.createdAt}
          id={article.id}
        />
      ))}
    </>
  );
};

export async function getStaticProps() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const response = await client.databases.query({
    database_id: databaseId,
  });

  const articles = response.results
    // isCompletedがtrueの記事だけを取得
    .filter((article) => article.properties.isCompleted.checkbox)
    .map((article) => {
      return {
        title: article.properties.page.title[0].plain_text,
        createdAt: convertDate(article.created_time),
        id: article.id,
      };
    });
  return {
    props: {
      articles,
    },
    revalidate: 60 * 60 * 12, //12時間ごと
  };
}

export default Home;
