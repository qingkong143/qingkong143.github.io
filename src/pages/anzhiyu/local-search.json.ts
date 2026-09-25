import type { APIRoute } from "astro";
import { getPosts, postPermalink, stripHtml } from "../../lib/posts";

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const data = posts.map((post) => ({
    title: post.data.title,
    content: stripHtml(post.body || ""),
    url: postPermalink(post),
    tags: post.data.tags,
    oneImage: post.data.cover || "",
  }));
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json; charset=utf-8" },
  });
};
