const base = import.meta.env.BASE_URL;

export const withBase = (path: string) => {
  if (!path.startsWith('/')) return path;
  return `${base}${path.slice(1)}`;
};

interface ImageTransformOptions {
  width?: number;
  height?: number;
  fit?: 'cover' | 'contain' | 'inside' | 'outside';
  quality?: number;
  format?: 'webp' | 'jpg' | 'png' | 'avif';
}

const isRemoteImage = (src: string) => /^https?:\/\//i.test(src);

const getScaledHeight = (width: number, options: ImageTransformOptions) => {
  if (!options.width || !options.height) return options.height;
  return Math.round(width * (options.height / options.width));
};

export const getProxiedImage = (src: string, options: ImageTransformOptions = {}) => {
  if (!isRemoteImage(src)) return withBase(src);

  try {
    const remoteUrl = new URL(src);
    const params = new URLSearchParams({ url: `${remoteUrl.host}${remoteUrl.pathname}${remoteUrl.search}` });

    if (options.width) params.set('w', String(options.width));
    if (options.height) params.set('h', String(options.height));
    if (options.fit) params.set('fit', options.fit);
    if (options.quality) params.set('q', String(options.quality));
    params.set('output', options.format ?? 'webp');

    return `https://images.weserv.nl/?${params.toString()}`;
  } catch {
    return src;
  }
};

export const getImageSrcset = (src: string, widths: number[], options: ImageTransformOptions = {}) => {
  if (!isRemoteImage(src)) return undefined;

  return widths
    .map((width) => `${getProxiedImage(src, { ...options, width, height: getScaledHeight(width, options) })} ${width}w`)
    .join(', ');
};
