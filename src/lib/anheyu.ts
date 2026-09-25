import { theme } from "./config";

const layout = theme.layout ?? {};
const home = theme.home_top ?? {};
const bg = theme.background ?? {};
const authorCard = theme.aside?.card_author ?? {};

function num(value: unknown, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function str(value: unknown, fallback: string): string {
  return value == null || value === "" ? fallback : String(value);
}

export function backgroundImages(): string[] {
  const raw = bg.image;
  const list = Array.isArray(raw) ? raw : raw == null || raw === false ? [] : [raw];
  return list.map((item) => String(item).trim()).filter(Boolean);
}

function cssUrl(src: string): string {
  return `url("${src.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}")`;
}

export const anheyu = {
  bgImages: backgroundImages(),
  bgImage: backgroundImages()[0] || "",
  authorCardBgImage: str(authorCard.background, backgroundImages()[0] || ""),
  cardOpacity: num(bg.card_opacity, 0.82),
  blur: str(bg.blur, "0px"),
  moreLink: str(home.more_link, "/archives/"),
  moreText: str(home.more_text, "更多推荐"),
  excerptLength: num(home.excerpt_length, 60),
  groupCount: num(home.group_count, 6),
  randomText: str(home.random_text, "随便逛逛"),
  recommendBadge: str(home.recommend_badge, "荐"),
  tagSizeMin: num(layout.tag_size_min, 0.78),
  tagSizeSpan: num(layout.tag_size_span, 0.12),
};

export function anheyuRootVars(): string | undefined {
  const vars: string[] = [];
  if (bg.enable && anheyu.bgImage) {
    vars.push(
      `--anheyu-bg-image: ${cssUrl(anheyu.bgImage)}`,
      `--anheyu-card-opacity: ${anheyu.cardOpacity}`,
      `--anheyu-bg-blur: ${anheyu.blur}`,
    );
  }
  if (anheyu.authorCardBgImage) {
    vars.push(`--anheyu-author-card-bg-image: ${cssUrl(anheyu.authorCardBgImage)}`);
  }
  return vars.length ? vars.join("; ") : undefined;
}
