import { client } from "../../notionClient";
import { convertDate } from "../../utils";
import { Tag } from "../../types";
import Article from "../../components/article/Article";
import Head from "next/head";

type Props = {
  articleInfo: {
    id: string;
    title: string;
    createdAt: string;
    tags: Tag[];
    thumbnail: string;
  };
  blocks: {
    id: string;
    type: string;
    text: string;
  }[];
};

export default function index({ articleInfo, blocks }: Props) {
  return (
    <>
      <Head>
        <title>{articleInfo.title}</title>
        <meta property="og:title" content={articleInfo.title} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`https://blog.azoookid.dev/article/${articleInfo.id}`}
        />
        <meta property="og:image" content={articleInfo.thumbnail} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <Article articleInfo={articleInfo} blocks={blocks} />;
    </>
  );
}

export async function getStaticPaths() {
  const databaseId = process.env.NOTION_DATABASE_ID;
  const response = await client.databases.query({
    database_id: databaseId,
  });

  const paths = response.results.map((article) => {
    return {
      params: {
        id: article.id,
      },
    };
  });

  return { paths, fallback: "blocking" };
}

export async function getStaticProps({ params }) {
  const articlePageResponse = client.pages.retrieve({
    page_id: params.id,
  });

  const blocksResponse = client.blocks.children.list({
    block_id: params.id,
  });

  const responses = await Promise.all([articlePageResponse, blocksResponse]);

  const { properties, cover } = responses[0];

  const articleInfo = {
    id: properties.page.id,
    title: properties.page.title[0].plain_text,
    createdAt: convertDate(properties.createdAt.created_time),
    tags: properties.tag.multi_select.map((tag) => ({
      id: tag.id,
      name: tag.name,
    })),
    thumbnail:
      cover.type == "file"
        ? cover.file.url
        : (cover.type = "external" ? cover.external.url : ""),
  };

  const blocks = responses[1].results.map((block) => {
    switch (block.type) {
      case "heading_2":
        return {
          id: block.id,
          type: block.type,
          text: block.heading_2.text[0]?.plain_text || null,
        };
      case "heading_3":
        return {
          id: block.id,
          type: block.type,
          text: block.heading_3.text[0]?.plain_text || null,
        };
      case "paragraph":
        return {
          id: block.id,
          type: block.type,
          text: block.paragraph.text[0]?.plain_text || null,
        };
      case "bulleted_list_item":
        return {
          id: block.id,
          type: block.type,
          text: block.bulleted_list_item?.text[0]?.plain_text || null,
        };
      case "image": {
        return {
          id: block.id,
          type: block.type,
          text: block.image.file.url || null,
        };
      }
      default:
        return {
          id: block.id,
          type: "unsupported",
          text: "",
        };
    }
  });

  return {
    props: {
      articleInfo,
      blocks,
    },
    revalidate: 60 * 60 * 12, //12時間ごと
  };
}
