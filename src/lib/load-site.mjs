import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import yaml from "js-yaml";

const root = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));

export function loadTheme() {
  return yaml.load(fs.readFileSync(path.join(root, "src/config/theme.yml"), "utf8"));
}

export function loadSite() {
  return yaml.load(fs.readFileSync(path.join(root, "src/config/site.yml"), "utf8"));
}

export function loadI18n() {
  return yaml.load(fs.readFileSync(path.join(root, "src/i18n/zh-CN.yml"), "utf8"));
}

export function loadPlugins() {
  return yaml.load(fs.readFileSync(path.join(root, "src/config/plugins.yml"), "utf8"));
}

export { root };
