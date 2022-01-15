import { Client } from "@notionhq/client";
import ArticleCard from "../components/ArticleCard";
import { convertDate } from "../utils";

const Home = ({ articles }) => {
  return (
    <div>
      {articles.map((article) => (
        <ArticleCard
          key={article.id}
          title={article.title}
          createdAt={article.createdAt}
          id={article.id}
        />
      ))}
    </div>
  );
};

export async function getStaticProps() {
  const notion = new Client({ auth: process.env.NOTION_KEY });

  const databaseId = process.env.NOTION_DATABASE_ID;
  const response = await notion.databases.query({
    database_id: databaseId,
  });
  console.log(response);
  const articles = response.results.map((article) => {
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
  };
}

export default Home;
