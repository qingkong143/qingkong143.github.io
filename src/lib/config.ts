import fs from "node:fs";
import path from "node:path";
import yaml from "js-yaml";

const root = process.cwd();

export const theme = yaml.load(
  fs.readFileSync(path.join(root, "src/config/theme.yml"), "utf8"),
) as Record<string, any>;

export const site = yaml.load(
  fs.readFileSync(path.join(root, "src/config/site.yml"), "utf8"),
) as {
  title: string;
  subtitle: string;
  description: string;
  author: string;
  url: string;
  language: string;
  timezone: string;
  per_page: number;
  date_format: string;
  keywords: string[];
  avatar: string;
};

export const i18n = yaml.load(
  fs.readFileSync(path.join(root, "src/i18n/zh-CN.yml"), "utf8"),
) as Record<string, any>;

export const plugins = yaml.load(
  fs.readFileSync(path.join(root, "src/config/plugins.yml"), "utf8"),
) as Record<string, { name: string; file: string; version: string; other_name?: string }>;

export const THEME_VERSION = "1.7.1";
