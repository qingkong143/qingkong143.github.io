import { plugins } from "./config";

export function pluginUrl(key: string): string {
  const p = plugins[key];
  if (!p) return "";
  return `https://cdn.cbd.int/${p.name}@${p.version}/${p.file}`;
}

export const assets = {
  main_css: "/css/index.css",
  main: "/js/main.js",
  utils: "/js/utils.js",
  translate: "/js/tw_cn.js",
  local_search: "/js/search/local-search.js",
  fancybox: pluginUrl("fancybox"),
  fancybox_css: pluginUrl("fancybox_css"),
  snackbar: pluginUrl("snackbar"),
  snackbar_css: pluginUrl("snackbar_css"),
  lazyload: pluginUrl("lazyload"),
  instantpage: pluginUrl("instantpage"),
  waterfall: pluginUrl("waterfall"),
  ali_iconfont_css: pluginUrl("ali_iconfont_css"),
  pace_js: pluginUrl("pace_js"),
  pace_default_css: pluginUrl("pace_default_css"),
  aplayer_css: pluginUrl("aplayer_css"),
  aplayer_js: pluginUrl("aplayer_js"),
  meting_js: pluginUrl("meting_js"),
  qrcode: "https://cdn.cbd.int/qrcodejs@1.0.0/qrcode.min.js",
  universe: "https://npm.elemecdn.com/anzhiyu-theme-static@1.0.0/dark/dark.js",
};
