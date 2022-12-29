import { client } from "../notionClient";
import ArticleCard from "../components/top/ArticleCard";
import { convertDate } from "../utils";
import { Article } from "../types";
import { NextPage } from "next";
import Head from "next/head";

type Props = {
  articles: Article[];
};

const Home: NextPage<Props> = ({ articles }) => {
  const title = "blog.azoookid.dev";
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
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
      const { cover } = article;
      return {
        title: article.properties.page.title[0].plain_text,
        createdAt: convertDate(article.created_time),
        id: article.id,
        thumbnail:
          cover.type == "file"
            ? cover.file.url
            : (cover.type = "external" ? cover.external.url : ""),
      };
    });

  return {
    props: {
      articles,
    },
    revalidate: 60 * 60, //1時間ごと。notionのfileが1時間で期限切れするため。
  };
}

export default Home;
