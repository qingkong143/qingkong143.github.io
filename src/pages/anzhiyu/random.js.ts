import type { APIRoute } from "astro";
import { getPosts, postPermalink } from "../../lib/posts";

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const paths = posts.map((p) => postPermalink(p).replace(/^\//, ""));
  const body = `var posts=${JSON.stringify(paths)};function toRandomPost(){window.location.href='/'+posts[Math.floor(Math.random()*posts.length)];}`;
  return new Response(body, {
    headers: { "Content-Type": "application/javascript; charset=utf-8" },
  });
};
