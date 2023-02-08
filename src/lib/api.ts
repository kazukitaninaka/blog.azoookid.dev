import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "src", "_articles");

export function getArticleSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getArticleBySlug(slug: string, fields: string[] = []) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  type Items = {
    [key: string]: string;
  };

  const items: Items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllArticles(fields: string[] = ["isPublished"]) {
  const slugs = getArticleSlugs();
  let allPosts = slugs.map((slug) =>
    getArticleBySlug(slug, ["isPublished", ...fields])
  );

  if (process.env.NODE_ENV === "production") {
    // filter out posts that are not published yet
    allPosts = allPosts.filter((post) => {
      return post.isPublished !== "false";
    });
    console.log({ allPosts });
  }
  // sort posts by date in descending order
  const posts = allPosts.sort((post1, post2) =>
    post1.createdAt > post2.createdAt ? -1 : 1
  );
  return posts;
}

export function getAdjacentPosts(slug: string) {
  const posts = getAllArticles(["slug", "title"]);
  const index = posts.findIndex((post) => post.slug === slug);
  const prev = posts[index - 1] || null;
  const next = posts[index + 1] || null;
  return { prev, next };
}
