import { Client } from "@notionhq/client";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var client: Client | undefined;
}

export const client =
  global.client ||
  new Client({
    auth: process.env.NOTION_KEY,
  });

if (process.env.NODE_ENV !== "production") global.client = client;
