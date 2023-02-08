import { NextPage } from "next";
import Head from "next/head";
import ArticleCard from "../components/top/ArticleCard";
import usePageViews from "../hooks/usePageViews";
import { getAllArticles } from "../lib/api";
import { Article } from "../types";

type Props = {
  articles: Article[];
};

const Home: NextPage<Props> = ({ articles }) => {
  const title = "blog.azoookid.dev";
  usePageViews();
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      {articles.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </>
  );
};

export async function getStaticProps() {
  const articles = getAllArticles([
    "title",
    "createdAt",
    "thumbnail",
    "slug",
    "isPublished",
  ]);
  return {
    props: {
      articles,
    },
  };
}

export default Home;
