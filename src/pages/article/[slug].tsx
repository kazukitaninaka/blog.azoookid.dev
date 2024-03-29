import ArticleComponent from "../../components/article/Article";
import Head from "next/head";
import {
  getAdjacentPosts,
  getAllArticles,
  getArticleBySlug,
} from "../../lib/api";
import { useRouter } from "next/router";
import usePageViews from "../../hooks/usePageViews";
import { Article as TArticle } from "../../types";

type Props = {
  article: {
    title: string;
    createdAt: string;
    tags: string[];
    thumbnail: string;
    content: string;
    slug: string;
    nextArticle: TArticle | null;
    prevArticle: TArticle | null;
  };
};

export default function Article({ article }: Props) {
  const router = useRouter();
  usePageViews();
  if (!router.isFallback && !article?.slug) {
    return <div>404</div>;
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const hostName = "https://blog.azoookid.dev";

  return (
    <>
      <Head>
        <title>{article.title} - blog.azoookid.dev</title>
        <meta property="og:title" content={article.title} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://blog.azoookid.dev/article/${article.slug}`}
        />
        <meta property="og:image" content={`${hostName}${article.thumbnail}`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <ArticleComponent article={article} />
    </>
  );
}

export async function getStaticPaths() {
  const posts = getAllArticles(["slug"]);
  const paths = posts.map((post) => {
    return {
      params: {
        slug: post.slug,
      },
    };
  });
  return { paths, fallback: false };
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const { slug } = params;
  const article = getArticleBySlug(slug, [
    "title",
    "createdAt",
    "tags",
    "slug",
    "thumbnail",
    "content",
  ]);

  const { next, prev } = getAdjacentPosts(slug);

  return {
    props: {
      article: {
        ...article,
        nextArticle: next,
        prevArticle: prev,
      },
    },
  };
}
