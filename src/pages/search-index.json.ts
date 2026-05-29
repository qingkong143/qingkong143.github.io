import { getCollection } from 'astro:content';
import { withBase } from '../utils/paths';
import { createPostPathMap, getPostPath } from '../utils/posts';

export async function GET() {
  const allPosts = await getCollection('blog');
  const postPathMap = createPostPathMap(allPosts);
  const searchPosts = allPosts
    .sort((a, b) => (b.data.date?.valueOf() || 0) - (a.data.date?.valueOf() || 0))
    .map((post) => ({
      title: post.data.title,
      href: withBase(getPostPath(post, postPathMap)),
      date: post.data.date?.toLocaleDateString('zh-CN') || '',
      text: [
        post.data.title,
        post.data.description,
        post.data.brief,
        post.data.summary,
        ...(Array.isArray(post.data.categories) ? post.data.categories : [post.data.categories]),
        ...(Array.isArray(post.data.tags) ? post.data.tags : [post.data.tags])
      ].filter(Boolean).join(' ')
    }));

  return new Response(JSON.stringify(searchPosts), {
    headers: {
      'content-type': 'application/json; charset=utf-8'
    }
  });
}
