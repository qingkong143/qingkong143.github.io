import { getCollection, type CollectionEntry } from "astro:content";
import { site, theme } from "./config";

export type Post = CollectionEntry<"posts">;

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection("posts", ({ data }) => !data.draft);
  return posts.sort((a, b) => {
    const sticky = (b.data.sticky ?? 0) - (a.data.sticky ?? 0);
    if (sticky !== 0) return sticky;
    return b.data.date.getTime() - a.data.date.getTime();
  });
}

export function postSlug(post: Post): string {
  const abbr = post.data.abbrlink;
  if (abbr != null && String(abbr).trim()) return String(abbr);
  return post.id.replace(/\/index$/, "");
}

export function postPermalink(post: Post): string {
  return `/posts/${postSlug(post)}/`;
}

export function isReprint(post: Post): boolean {
  return (post.data.categories || []).some((name) => String(name).includes("转载"));
}

export function getCover(post: Post): string {
  if (post.data.cover) return post.data.cover;
  const defaults = theme.cover?.default_cover;
  if (Array.isArray(defaults) && defaults.length) {
    return defaults[Math.abs(hashCode(post.id)) % defaults.length];
  }
  return (Array.isArray(theme.cover?.default_cover) && theme.cover.default_cover[0]) || "/img/default_cover.jpg";
}

export function excerptFromHtml(html: string, length = 500): string {
  const text = html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > length ? `${text.slice(0, length)} ...` : text;
}

export function formatDate(date: Date, fmt = site.date_format): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return fmt.replaceAll("YYYY", String(y)).replaceAll("MM", m).replaceAll("DD", d);
}

export function dateXml(date: Date): string {
  return date.toISOString();
}

export function fullDate(date: Date): string {
  return date.toLocaleString("zh-CN", { hour12: false });
}

export function tagPath(name: string): string {
  return `/tags/${encodeURIComponent(name)}/`;
}

export function categoryPath(name: string): string {
  return `/categories/${encodeURIComponent(name)}/`;
}

export function getAllTags(posts: Post[]): Array<[string, Post[]]> {
  const map = new Map<string, Post[]>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      const list = map.get(tag) ?? [];
      list.push(post);
      map.set(tag, list);
    }
  }
  return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
}

export function getAllCategories(posts: Post[]): Array<[string, Post[]]> {
  const map = new Map<string, Post[]>();
  for (const post of posts) {
    for (const cat of post.data.categories) {
      const list = map.get(cat) ?? [];
      list.push(post);
      map.set(cat, list);
    }
  }
  return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
}

export function archiveMonths(posts: Post[], limit = 8) {
  const map = new Map<string, { year: number; month: number; count: number }>();
  for (const post of posts) {
    const year = post.data.date.getFullYear();
    const month = post.data.date.getMonth() + 1;
    const key = `${year}-${month}`;
    const cur = map.get(key) ?? { year, month, count: 0 };
    cur.count += 1;
    map.set(key, cur);
  }
  const list = [...map.values()].sort((a, b) => b.year - a.year || b.month - a.month);
  return limit ? list.slice(0, limit) : list;
}

export function monthHref(year: number, month: number): string {
  return `/archives/${year}/${String(month).padStart(2, "0")}/`;
}

export function monthLabel(year: number, month: number): string {
  return `${year}年${String(month).padStart(2, "0")}月`;
}

export function paginate<T>(items: T[], page: number, perPage = site.per_page) {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * perPage;
  return {
    items: items.slice(start, start + perPage),
    page: current,
    totalPages,
    total: items.length,
    perPage,
  };
}

export function relatedPosts(current: Post, all: Post[], limit = 6): Post[] {
  const tags = new Set(current.data.tags);
  return all
    .filter((p) => p.id !== current.id)
    .map((p) => ({
      post: p,
      weight: p.data.tags.filter((t) => tags.has(t)).length,
    }))
    .filter((x) => x.weight > 0)
    .sort((a, b) => b.weight - a.weight || b.post.data.date.getTime() - a.post.data.date.getTime())
    .slice(0, limit)
    .map((x) => x.post);
}

export function topGroupPosts(posts: Post[], count = 6): Post[] {
  const marked = posts
    .filter((p) => p.data.top_group_index)
    .sort((a, b) => (b.data.top_group_index ?? 0) - (a.data.top_group_index ?? 0));
  const rest = posts.filter((p) => !marked.includes(p));
  return [...marked, ...rest].slice(0, count);
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

export function pageDescription(html?: string, fallback?: string): string {
  const raw = html || fallback || site.description;
  return stripHtml(raw).slice(0, 150);
}

function hashCode(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return h;
}

export type Heading = { depth: number; slug: string; text: string };
