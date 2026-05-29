interface PostLike {
  slug: string;
  id?: string;
  collection?: string;
  data: {
    abbrlink?: string | number;
  };
}

export type PostPathMap = Map<string, string>;

const getPostKey = (post: PostLike) => `${post.collection ?? 'blog'}:${post.id ?? post.slug}`;
const getPreferredPostSegment = (post: PostLike) => String(post.data.abbrlink ?? post.slug);

export const createPostPathMap = (posts: PostLike[]) => {
  const segmentCounts = new Map<string, number>();

  posts.forEach((post) => {
    const segment = getPreferredPostSegment(post);
    segmentCounts.set(segment, (segmentCounts.get(segment) ?? 0) + 1);
  });

  return new Map(posts.map((post) => {
    const preferredSegment = getPreferredPostSegment(post);
    const segment = segmentCounts.get(preferredSegment) === 1 ? preferredSegment : post.slug;
    return [getPostKey(post), `/posts/${segment}/`];
  }));
};

export const getPostPath = (post: PostLike, postPathMap?: PostPathMap) => postPathMap?.get(getPostKey(post)) ?? `/posts/${getPreferredPostSegment(post)}/`;
