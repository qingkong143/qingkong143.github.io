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

export const getProxiedImage = (src: string, _options: ImageTransformOptions = {}) => {
  if (!isRemoteImage(src)) return withBase(src);
  return src;
};

export const getImageSrcset = (_src: string, _widths: number[], _options: ImageTransformOptions = {}) => {
  return undefined;
};
