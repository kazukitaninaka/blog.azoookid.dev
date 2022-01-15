import { Client } from "@notionhq/client";
import { convertDate } from "../../utils";

export default function index({ articleTitle, articleCreatedAt, blocks }) {
  return (
    <div>
      <h2 style={{ textAlign: "center" }}>{articleTitle}</h2>
      <p style={{ textAlign: "center" }}>{articleCreatedAt}公開</p>
      {blocks.map((block) => {
        switch (block.type) {
          case "heading_2":
            return <h2 key={block.id}>{block.text}</h2>;
          case "heading_3":
            return <h2 key={block.id}>{block.text}</h2>;
          case "paragraph":
            return <p key={block.id}>{block.text}</p>;
          case "bulleted_list_item":
            return <p key={block.id}>・{block.text}</p>;
          default:
            null;
        }
      })}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const notion = new Client({
    auth: process.env.NOTION_KEY,
  });

  const articlePageResponse = await notion.pages.retrieve({
    page_id: params.id,
  });
  console.log(articlePageResponse);
  const articleTitle = articlePageResponse.properties.page.title[0].plain_text;
  const articleCreatedAt = convertDate(
    articlePageResponse.properties.createdAt.created_time
  );

  const blocksChildren = await notion.blocks.children.list({
    block_id: params.id,
  });

  const blocks = blocksChildren.results.map((block) => {
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
          text: block.bulleted_list_item.text[0]?.plain_text || null,
        };
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
      articleTitle,
      articleCreatedAt,
      blocks,
    },
  };
}
