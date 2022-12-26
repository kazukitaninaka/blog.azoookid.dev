import { client } from "../../notionClient";
import { convertDate } from "../../utils";
import { Tag } from "../../types";
import Article from "../../components/article/Article";

type Props = {
  articleInfo: {
    title: string;
    createdAt: string;
    tags: Tag[];
  };
  blocks: {
    id: string;
    type: string;
    text: string;
  }[];
};

export default function index({ articleInfo, blocks }: Props) {
  return <Article articleInfo={articleInfo} blocks={blocks} />;
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

  const articleInfo = {
    title: responses[0].properties.page.title[0].plain_text,
    createdAt: convertDate(responses[0].properties.createdAt.created_time),
    tags: responses[0].properties.tag.multi_select.map((tag) => ({
      id: tag.id,
      name: tag.name,
    })),
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
