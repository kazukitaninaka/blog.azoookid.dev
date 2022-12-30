import ArticleComponent from "../../components/article/Article";
import Head from "next/head";
import { getAllArticles, getArticleBySlug } from "../../lib/api";
import markdownToHtml from "../../lib/markdownToHtml";
import { useRouter } from "next/router";

type Props = {
  article: {
    title: string;
    createdAt: string;
    tags: string[];
    thumbnail: string;
    content: string;
    slug: string;
  };
};

export default function Article({ article }: Props) {
  const router = useRouter();
  if (!router.isFallback && !article?.slug) {
    return <div>404</div>;
  }

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

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
        <meta property="og:image" content={article.thumbnail} />
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

  const content = await markdownToHtml(article.content || "");

  return {
    props: {
      article: {
        ...article,
        content,
      },
    },
  };
}
