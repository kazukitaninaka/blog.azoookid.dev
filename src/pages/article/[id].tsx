import { client } from "../../notionClient";
import { convertDate } from "../../utils";
import Image from "next/image";
import { Tag } from "../../types";
import Tags from "../../components/Tags";

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
  return (
    <div>
      <h1 style={{ textAlign: "center" }}>{articleInfo.title}</h1>
      <p style={{ textAlign: "center" }}>{articleInfo.createdAt}公開</p>
      <Tags tags={articleInfo.tags} />
      {blocks.map((block) => {
        switch (block.type) {
          case "heading_2":
            return <h2 key={block.id}>## {block.text}</h2>;
          case "heading_3":
            return <h3 key={block.id}>### {block.text}</h3>;
          case "paragraph":
            return <p key={block.id}>{block.text}</p>;
          case "bulleted_list_item":
            return <p key={block.id}>・{block.text}</p>;
          case "image":
            return (
              <div
                style={{ width: "100%", height: "300px", position: "relative" }}
              >
                <Image
                  key={block.id}
                  src={block.text}
                  alt=""
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            );
          default:
            null;
        }
      })}
    </div>
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
